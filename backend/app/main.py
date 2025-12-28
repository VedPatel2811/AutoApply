import sys
from pathlib import Path

# -------------------------------
# Add vendor path (JobSpy support)
# -------------------------------
BASE_DIR = Path(__file__).resolve().parent.parent
VENDOR_DIR = BASE_DIR / "vendor" / "JobSpy"
sys.path.append(str(VENDOR_DIR))

# -------------------------------
# Standard imports
# -------------------------------
from typing import Union
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pypdf import PdfReader
import io

# -------------------------------
# FastAPI app
# -------------------------------
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5173",
        "http://localhost:5174",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/api/v1/resume/upload")
async def convert_pdf_to_text(file: UploadFile = File(...)):
    text_content = await file.read()
    reader = PdfReader(io.BytesIO(text_content))

    if reader.pages:
        text = reader.pages[0].extract_text()
    else:
        text = "No pages found in PDF."

    return {"text": text}

# Import jobs router after vendor path is set
from app.api.v1 import jobs
app.include_router(jobs.router)
