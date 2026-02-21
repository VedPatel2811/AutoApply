auto_apply_backend/
├── app/                  # Core application logic (e.g., API routes and entry points)
│   ├── __init__.py       # Initializes the app (e.g., FastAPI instance)
│   ├── main.py           # Entry point to run the server (e.g., uvicorn app.main:app)
│   ├── routes.py         # API endpoints (e.g., /upload_resume, /generate_resume, /scrape_jobs, /generate_excel)
│   └── schemas.py        # Pydantic models for request/response validation (e.g., ResumeUpload schema)
├── services/             # Business logic modules (core processing steps)
│   ├── resume_parser.py  # Handles PDF/DOC to text conversion (using PyPDF2, docx, etc.)
│   ├── text_generation.py # Integrates with the text generation model (e.g., API calls to OpenAI/GPT)
│   ├── job_scraper.py    # Wraps JobSpy for scraping jobs based on resume data
│   └── excel_generator.py # Combines model output + scraped jobs into Excel (using pandas)
├── utils/                # Helper functions and reusable code
│   ├── file_utils.py     # File handling (upload, temp storage, conversion helpers)
│   ├── config_utils.py   # Loads env vars (e.g., API keys for models/JobSpy)
│   └── logging_utils.py  # Custom logging setup
├── config/               # Configuration files
│   ├── settings.py       # App settings (e.g., dev/prod envs, paths)
│   └── .env.example      # Template for environment variables (e.g., MODEL_API_KEY)
├── data/                 # Temporary or persistent data storage (git-ignored)
│   ├── uploads/          # For uploaded resumes (PDF/DOC)
│   ├── processed/        # For generated resumes/text outputs
│   └── outputs/          # For final Excel files
├── tests/                # Unit/integration tests
│   ├── test_resume_parser.py
│   ├── test_text_generation.py
│   └── test_job_scraper.py
├── requirements.txt      # Python dependencies (e.g., jobspy, fastapi, uvicorn, pypdf2, python-docx, openai, pandas)
├── README.md             # Project docs, setup instructions, flow diagram
└── .gitignore            # Ignore data/, __pycache__, .env, etc.