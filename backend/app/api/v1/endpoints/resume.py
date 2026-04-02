import io
import json
import re

from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

router = APIRouter()

MAX_FILE_SIZE = 4 * 1024 * 1024  # 4 MB

ACCENT = (37, 99, 235)       # #2563eb
DARK   = (26, 26, 26)        # #1a1a1a
GREY   = (80, 80, 80)        # mid-grey
LIGHT  = (239, 246, 255)     # #eff6ff skill bg
GREEN_BG = (240, 253, 244)   # #f0fdf4 missing skill bg
GREEN_FG = (22, 101, 52)     # #166534


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
                text = "\n".join((page.extract_text() or "") for page in pdf.pages)
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


def _build_pdf(candidate: dict, payload: GenerateResumeRequest,
               missing_skills: list, suggested_bullets: list) -> bytes:
    from reportlab.lib.pagesizes import A4
    from reportlab.lib.units import mm
    from reportlab.lib.styles import ParagraphStyle
    from reportlab.lib.colors import HexColor, Color
    from reportlab.platypus import (
        SimpleDocTemplate, Paragraph, Spacer, HRFlowable, ListFlowable, ListItem
    )
    from reportlab.lib.enums import TA_LEFT

    accent = HexColor("#2563eb")
    dark   = HexColor("#1a1a1a")
    grey   = HexColor("#505050")
    blue_light = HexColor("#166534")

    buf = io.BytesIO()
    doc = SimpleDocTemplate(
        buf, pagesize=A4,
        leftMargin=15*mm, rightMargin=15*mm,
        topMargin=15*mm, bottomMargin=15*mm,
    )

    def style(name, **kw):
        defaults = dict(fontName="Helvetica", fontSize=11, textColor=dark,
                        leading=16, spaceAfter=0, spaceBefore=0, alignment=TA_LEFT)
        defaults.update(kw)
        return ParagraphStyle(name, **defaults)

    s_name    = style("name",    fontSize=20, fontName="Helvetica-Bold")
    s_role    = style("role",    fontSize=12, fontName="Helvetica-Bold", textColor=accent)
    s_contact = style("contact", fontSize=10, textColor=grey)
    s_sec     = style("sec",     fontSize=13, fontName="Helvetica-Bold", textColor=accent,
                      spaceBefore=8, spaceAfter=2)
    s_body    = style("body",    fontSize=11, textColor=dark, leading=15)
    s_bold    = style("bold",    fontSize=11, fontName="Helvetica-Bold", textColor=dark)
    s_grey    = style("grey",    fontSize=10, textColor=grey)
    s_bullet  = style("bullet",  fontSize=11, textColor=dark, leading=14,
                      leftIndent=12, spaceAfter=1)
    s_suggest = style("suggest", fontSize=11, textColor=accent, leading=14,
                      leftIndent=12, spaceAfter=1)
    s_skill   = style("skill",   fontSize=10, textColor=HexColor("#1e40af"))
    s_missing = style("missing", fontSize=10, textColor=blue_light)

    story = []

    def hr():
        story.append(HRFlowable(width="100%", thickness=1, color=accent, spaceAfter=6))

    def section(title):
        story.append(Spacer(1, 4))
        story.append(Paragraph(title, s_sec))
        story.append(HRFlowable(width="100%", thickness=0.5,
                                color=HexColor("#dbeafe"), spaceAfter=5))

    # ── Header ──
    story.append(Paragraph(candidate.get("name", ""), s_name))
    story.append(Paragraph(payload.job_title, s_role))
    contact_parts = [x for x in [
        candidate.get("email", ""),
        candidate.get("phone", ""),
        candidate.get("linkedin", ""),
    ] if x]
    story.append(Paragraph("  |  ".join(contact_parts), s_contact))
    hr()

    # ── Summary ──
    summary = candidate.get("summary", "")
    if summary:
        section("PROFESSIONAL SUMMARY")
        story.append(Paragraph(summary, s_body))

    # ── Experience ──
    experience = candidate.get("experience", [])
    if experience:
        section("EXPERIENCE")
        for i, job in enumerate(experience):
            story.append(Paragraph(job.get("role", ""), s_bold))
            story.append(Paragraph(
                f"{job.get('company', '')}  ·  {job.get('duration', '')}", s_grey))
            bullets = job.get("bullets", [])
            for b in bullets:
                story.append(Paragraph(f"• {b}", s_bullet))
            if i == 0:
                for sb in suggested_bullets:
                    story.append(Paragraph(f"★ {sb}", s_suggest))
            story.append(Spacer(1, 5))

    # ── Skills ──
    existing = candidate.get("existing_skills", [])
    if existing or missing_skills:
        section("SKILLS")
        if existing:
            story.append(Paragraph(
                "<b>Skills:</b>  " + "  ·  ".join(existing), s_body))
        if missing_skills:
            story.append(Spacer(1, 3))
            story.append(Paragraph(
                "<b>Additional:</b>  " + "  ·  ".join(f"● {s}" for s in missing_skills),
                style("ms", fontSize=10, textColor=blue_light, leading=14)))

    # ── Education ──
    education = candidate.get("education", [])
    if education:
        section("EDUCATION")
        for edu in education:
            year = edu.get("year", "")
            story.append(Paragraph(edu.get("degree", ""), s_bold))
            story.append(Paragraph(
                f"{edu.get('institution', '')}{('  ·  ' + year) if year else ''}", s_grey))
            story.append(Spacer(1, 4))

    doc.build(story)
    return buf.getvalue()


@router.post("/generate-resume")
async def generate_resume(payload: GenerateResumeRequest):
    if not payload.api_key.startswith("gsk_"):
        raise HTTPException(status_code=401, detail="Invalid Groq API key.")

    try:
        from groq import Groq
        client = Groq(api_key=payload.api_key)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Groq client init failed: {e}")

    def _handle_groq_error(e):
        status = getattr(getattr(e, "response", None), "status_code", 500)
        if status == 429:
            raise HTTPException(status_code=429, detail="Groq API quota exceeded. Try again later.")
        raise HTTPException(status_code=500, detail="Resume generation failed. Please try again.")

    # CALL 1 — Required skills from JD
    try:
        skills_raw = _groq_chat(client,
            f"Extract a list of the top 10 most important technical and soft skills from this job description. "
            f"Return ONLY a JSON array of strings. No explanation.\nJob Description: {payload.job_description}")
        required_skills: list = _safe_json(skills_raw, [])
    except HTTPException:
        raise
    except Exception as e:
        _handle_groq_error(e)

    # CALL 2 — Missing skills + suggested bullets
    try:
        gap_raw = _groq_chat(client,
            f"Compare this resume text with the required skills list. "
            f"Return ONLY a JSON object with two keys: "
            f"'missing_skills': array of skills from required list not in resume, "
            f"'suggested_bullets': array of 2-3 achievement bullet points under 20 words each. "
            f"Required Skills: {json.dumps(required_skills)}\nResume Text: {payload.resume_text}")
        gap_data: dict = _safe_json(gap_raw, {"missing_skills": [], "suggested_bullets": []})
        missing_skills: list = gap_data.get("missing_skills", [])
        suggested_bullets: list = gap_data.get("suggested_bullets", [])
    except HTTPException:
        raise
    except Exception as e:
        _handle_groq_error(e)

    # CALL 3 — Candidate info extraction
    try:
        info_raw = _groq_chat(client,
            f"Extract the following fields from this resume text and return ONLY a JSON object with these exact keys: "
            f"'name', 'email', 'phone', 'linkedin', 'summary', "
            f"'experience' (array of objects with company, role, duration, bullets), "
            f"'education' (array of objects with degree, institution, year), "
            f"'existing_skills' (array of strings). "
            f"No explanation. No markdown. Return raw JSON only.\nResume Text: {payload.resume_text}")
        candidate: dict = _safe_json(info_raw, {})
    except HTTPException:
        raise
    except Exception as e:
        _handle_groq_error(e)

    # Build PDF
    try:
        pdf_bytes = _build_pdf(candidate, payload, missing_skills, suggested_bullets)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"PDF generation failed: {e}")

    safe_company = re.sub(r"[^\w\-]", "_", payload.company_name)
    safe_title   = re.sub(r"[^\w\-]", "_", payload.job_title)
    filename = f"{safe_company}_{safe_title}_resume.pdf"

    return StreamingResponse(
        io.BytesIO(pdf_bytes),
        media_type="application/pdf",
        headers={"Content-Disposition": f"attachment; filename={filename}"},
    )
