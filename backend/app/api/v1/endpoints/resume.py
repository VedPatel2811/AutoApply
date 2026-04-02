import io
import json
import re
from pathlib import Path

from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

router = APIRouter()

TEMPLATE_PATH = Path(__file__).resolve().parents[4] / "templates" / "resume_template.html"
MAX_FILE_SIZE = 4 * 1024 * 1024  # 4 MB


# ── /extract ──────────────────────────────────────────────────────────────────

@router.post("/extract")
async def extract_resume(file: UploadFile = File(...)):
    content = await file.read()
    if len(content) > MAX_FILE_SIZE:
        raise HTTPException(status_code=413, detail="File exceeds 4 MB limit.")

    filename = file.filename or ""
    text = ""

    if filename.endswith(".pdf"):
        try:
            import pdfplumber
            with pdfplumber.open(io.BytesIO(content)) as pdf:
                text = "\n".join(
                    (page.extract_text() or "") for page in pdf.pages
                )
        except Exception as e:
            raise HTTPException(status_code=422, detail=f"PDF extraction failed: {e}")

    elif filename.endswith(".docx"):
        try:
            import docx
            doc = docx.Document(io.BytesIO(content))
            text = "\n".join(p.text for p in doc.paragraphs)
        except Exception as e:
            raise HTTPException(status_code=422, detail=f"DOCX extraction failed: {e}")

    else:
        raise HTTPException(status_code=400, detail="Only .pdf and .docx files are supported.")

    cleaned = re.sub(r"\n{3,}", "\n\n", text).strip()
    return {"text": cleaned, "filename": filename}


# ── /generate-resume ──────────────────────────────────────────────────────────

class GenerateResumeRequest(BaseModel):
    api_key: str
    resume_text: str
    job_title: str
    job_description: str
    company_name: str


def _safe_json(raw: str, fallback):
    """Extract first JSON object/array from a Groq response string."""
    try:
        match = re.search(r"(\[.*\]|\{.*\})", raw, re.DOTALL)
        if match:
            return json.loads(match.group(1))
    except Exception:
        pass
    return fallback


def _groq_chat(client, prompt: str) -> str:
    response = client.chat.completions.create(
        model="meta-llama/llama-4-scout-17b-16e-instruct",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.3,
    )
    return response.choices[0].message.content or ""


def _render_experience(experience: list, suggested_bullets: list) -> str:
    if not experience:
        return "<p>No experience data found.</p>"
    html = ""
    for i, job in enumerate(experience):
        company = job.get("company", "")
        role = job.get("role", "")
        duration = job.get("duration", "")
        bullets = job.get("bullets", [])
        html += '<div class="exp-item">'
        html += f'<div class="exp-header"><span class="exp-role">{role}</span><span class="exp-duration">{duration}</span></div>'
        html += f'<div class="exp-company">{company}</div>'
        if bullets or (i == 0 and suggested_bullets):
            html += '<ul class="exp-bullets">'
            for b in bullets:
                html += f"<li>{b}</li>"
            if i == 0:
                for sb in suggested_bullets:
                    html += f'<li class="suggested">&#9733; {sb}</li>'
            html += "</ul>"
        html += "</div>"
    return html


def _render_education(education: list) -> str:
    if not education:
        return "<p>No education data found.</p>"
    html = ""
    for edu in education:
        degree = edu.get("degree", "")
        institution = edu.get("institution", "")
        year = edu.get("year", "")
        html += f'<div class="edu-item"><div class="edu-degree">{degree}</div>'
        html += f'<div class="edu-meta">{institution}{" · " + year if year else ""}</div></div>'
    return html


@router.post("/generate-resume")
async def generate_resume(payload: GenerateResumeRequest):
    if not payload.api_key.startswith("gsk_"):
        raise HTTPException(status_code=401, detail="Invalid Groq API key.")

    try:
        from groq import Groq
        client = Groq(api_key=payload.api_key)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Groq client init failed: {e}")

    # CALL 1 — Extract required skills from JD
    try:
        skills_raw = _groq_chat(
            client,
            f"Extract a list of the top 10 most important technical and soft skills from this job description. "
            f"Return ONLY a JSON array of strings. No explanation.\nJob Description: {payload.job_description}"
        )
        required_skills: list = _safe_json(skills_raw, [])
    except Exception as e:
        status = getattr(getattr(e, "response", None), "status_code", 500)
        if status == 429:
            raise HTTPException(status_code=429, detail="Groq API quota exceeded. Try again later.")
        raise HTTPException(status_code=500, detail="Resume generation failed. Please try again.")

    # CALL 2 — Missing skills + suggested bullets
    try:
        gap_raw = _groq_chat(
            client,
            f"Compare this resume text with the required skills list. "
            f"Return ONLY a JSON object with two keys: "
            f"'missing_skills': array of skills from required list not in resume, "
            f"'suggested_bullets': array of 2-3 achievement bullet points the candidate can add based on the missing skills and their experience. "
            f"Keep each bullet under 20 words.\n"
            f"Required Skills: {json.dumps(required_skills)}\nResume Text: {payload.resume_text}"
        )
        gap_data: dict = _safe_json(gap_raw, {"missing_skills": [], "suggested_bullets": []})
        missing_skills: list = gap_data.get("missing_skills", [])
        suggested_bullets: list = gap_data.get("suggested_bullets", [])
    except Exception as e:
        status = getattr(getattr(e, "response", None), "status_code", 500)
        if status == 429:
            raise HTTPException(status_code=429, detail="Groq API quota exceeded. Try again later.")
        raise HTTPException(status_code=500, detail="Resume generation failed. Please try again.")

    # CALL 3 — Extract candidate info
    try:
        info_raw = _groq_chat(
            client,
            f"Extract the following fields from this resume text and return ONLY a JSON object with these exact keys: "
            f"'name', 'email', 'phone', 'linkedin', 'summary', "
            f"'experience' (array of objects with company, role, duration, bullets), "
            f"'education' (array of objects with degree, institution, year), "
            f"'existing_skills' (array of strings). "
            f"No explanation. No markdown. Return raw JSON only.\nResume Text: {payload.resume_text}"
        )
        candidate: dict = _safe_json(info_raw, {})
    except Exception as e:
        status = getattr(getattr(e, "response", None), "status_code", 500)
        if status == 429:
            raise HTTPException(status_code=429, detail="Groq API quota exceeded. Try again later.")
        raise HTTPException(status_code=500, detail="Resume generation failed. Please try again.")

    # Build HTML sections
    experience_html = _render_experience(
        candidate.get("experience", []), suggested_bullets
    )
    education_html = _render_education(candidate.get("education", []))
    existing_skills_html = "".join(
        f'<span class="skill-tag">{s}</span>' for s in candidate.get("existing_skills", [])
    )
    missing_skills_html = "".join(
        f'<span class="skill-tag missing">&#9679; {s}</span>' for s in missing_skills
    )

    # Load and populate template
    try:
        template = TEMPLATE_PATH.read_text(encoding="utf-8")
    except Exception:
        raise HTTPException(status_code=500, detail="Resume template not found.")

    populated = (
        template
        .replace("{{CANDIDATE_NAME}}", candidate.get("name", ""))
        .replace("{{CANDIDATE_EMAIL}}", candidate.get("email", ""))
        .replace("{{CANDIDATE_PHONE}}", candidate.get("phone", ""))
        .replace("{{CANDIDATE_LINKEDIN}}", candidate.get("linkedin", ""))
        .replace("{{CANDIDATE_SUMMARY}}", candidate.get("summary", ""))
        .replace("{{TARGET_ROLE}}", payload.job_title)
        .replace("{{EXPERIENCE_SECTION}}", experience_html)
        .replace("{{EDUCATION_SECTION}}", education_html)
        .replace("{{EXISTING_SKILLS}}", existing_skills_html)
        .replace("{{MISSING_SKILLS}}", missing_skills_html)
        .replace("{{SUGGESTED_BULLETS}}", "")  # already injected into experience
    )

    # Generate PDF
    try:
        from xhtml2pdf import pisa
        pdf_buffer = io.BytesIO()
        pisa.CreatePDF(io.StringIO(populated), dest=pdf_buffer)
        pdf_bytes = pdf_buffer.getvalue()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"PDF generation failed: {e}")

    safe_company = re.sub(r"[^\w\-]", "_", payload.company_name)
    safe_title = re.sub(r"[^\w\-]", "_", payload.job_title)
    filename = f"{safe_company}_{safe_title}_resume.pdf"

    return StreamingResponse(
        io.BytesIO(pdf_bytes),
        media_type="application/pdf",
        headers={"Content-Disposition": f"attachment; filename={filename}"},
    )
