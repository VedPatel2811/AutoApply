from fastapi import APIRouter, UploadFile, File, HTTPException
import io

router = APIRouter()


@router.post("/extract")
async def extract_resume(file: UploadFile = File(...)):
    content = await file.read()
    filename = file.filename or ""
    text = ""

    if filename.endswith(".pdf"):
        try:
            import pypdf
            reader = pypdf.PdfReader(io.BytesIO(content))
            text = "\n".join(page.extract_text() or "" for page in reader.pages)
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

    return {"text": text.strip(), "filename": filename}
