from typing import Union
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pypdf import PdfReader
import io

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173", "http://localhost:5174", "http://127.0.0.1:3000", "http://127.0.0.1:5173", "http://127.0.0.1:5174"],  # Add your frontend URLs
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
    if len(reader.pages) > 0:
        page = reader.pages[0]
        text = page.extract_text()
    else:
        text = "No pages found in PDF."

    return {"text": text}