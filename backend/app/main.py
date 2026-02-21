import os

from services.resume_parser import ResumeParser


def main():
    print("=== Resume Parser CLI ===")
    file_path = input("Enter resume file path (PDF or DOCX): ").strip()

    if not os.path.exists(file_path):
        print("File does not exist. Please check the path and try again.")
        return
    
    try:
        #Extract text
        text = ResumeParser.extract_text(file_path)

        # Parse data
        parsed_data = ResumeParser.parse_resume(text)

        # Save output
        output_file = "data/processed/parsed_resume.json"
        ResumeParser.save_to_json(parsed_data, output_file)

        print("\n Resume Parsed successfully!")
        print(f"Saved to: {output_file}")

        print("\nExtracted Data:")
        for key, value in parsed_data.items():
            print(f"  {key}: {value}")

    except Exception as e:
        print(f"Error processing resume: {e}")

if __name__ == "__main__":
    main()
        