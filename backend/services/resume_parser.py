import json
import os
from pathlib import Path
import re
from typing import Any, Dict

from PyPDF2 import PdfReader
from docx import Document


class ResumeParser:

    @staticmethod
    def extract_text(file_path: str) -> str:
        """
        Extract text from a resume file (PDF or DOCX).
        """

        if file_path.endswith('.pdf'):
            reader = PdfReader(file_path)
            text = ''
            for page in reader.pages:
                text += page.extract_text() + '\n'
            return text
        elif file_path.endswith('.docx'):
            doc = Document(file_path)
            return "\n".join([para.text for para in doc.paragraphs])
        else:
            raise ValueError("Unsupported file format. Only PDF and DOCX are supported.")
        

    @staticmethod
    def parse_resume(text: str) -> Dict[str, Any]:
        """
        Extract structured information using regex patterns.
        """

        data = {}

        #Email
        email_match = re.search(r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}", text)
        data["email"] = email_match.group(0) if email_match else None

        # Phone
        phone_match = re.search(r"\+?\d[\d\s\-]{8,15}\d", text)
        data["contact_number"] = phone_match.group(0) if phone_match else None

        # LinkedIn
        linkedin_match = re.search(r"(https?://)?(www\.)?linkedin\.com/in/[A-Za-z0-9_-]+", text)
        data["linkedin"] = linkedin_match.group(0) if linkedin_match else None

        # GitHub
        github_match = re.search(r"(https?://)?(www\.)?github\.com/[A-Za-z0-9_-]+", text)
        data["github"] = github_match.group(0) if github_match else None

        # Portfolio (basic URL detection excluding LinkedIn/GitHub)
        url_matches = re.findall(r"https?://[^\s]+", text)
        portfolio = None
        for url in url_matches:
            if "linkedin" not in url and "github" not in url:
                portfolio = url
                break
        data["portfolio"] = portfolio

        # Name (assume first non-empty line)
        lines = [line.strip() for line in text.split("\n") if line.strip()]
        data["name"] = lines[0] if lines else None

        # Location (very basic heuristic)
        location_match = re.search(r"(Toronto|Canada|USA|India|Ontario|New York)", text, re.IGNORECASE)
        data["location"] = location_match.group(0) if location_match else None
        
        # Education section
        education_match = re.search(r"(Education[\s\S]*?)(Experience|Projects|Skills)", text, re.IGNORECASE)
        data["education"] = education_match.group(1).strip() if education_match else None

        # Experience section
        experience_match = re.search(r"(Experience[\s\S]*?)(Education|Projects|Skills)", text, re.IGNORECASE)
        data["experience"] = experience_match.group(1).strip() if experience_match else None

        return data
    
    @staticmethod
    def save_to_json(data: Dict[str, Any], output_path: str):
        """
        Save parsed data to JSON file.
        """
        Path(os.path.dirname(output_path)).mkdir(parents=True, exist_ok=True)

        with open(output_path, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=4)