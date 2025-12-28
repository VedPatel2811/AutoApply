# Auto-Apply Job SAAS - Repository Architecture

## 📁 Root Directory Structure

```
job-auto-apply/
├── frontend/                    # React frontend application
├── backend/                     # Python FastAPI backend
├── scripts/                     # Utility scripts
├── docker/                      # Docker configurations (for future)
├── docs/                        # Documentation
├── .github/                     # GitHub workflows (CI/CD)
├── .gitignore
├── README.md
├── docker-compose.yml          # For future containerization
└── .env.example                # Environment variables template
```

---

## 📂 Frontend Structure (`/frontend`)

```
frontend/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── common/            # Reusable components
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Card.jsx
│   │   │   └── Loader.jsx
│   │   ├── auth/              # Authentication components
│   │   │   ├── Login.jsx
│   │   │   └── OAuthCallback.jsx
│   │   ├── resume/            # Resume upload & management
│   │   │   ├── ResumeUpload.jsx
│   │   │   ├── ResumePreview.jsx
│   │   │   └── ResumeVersions.jsx
│   │   ├── job-search/        # Job search configuration
│   │   │   ├── SearchForm.jsx
│   │   │   ├── JobFilters.jsx
│   │   │   └── RegionSelector.jsx
│   │   ├── job-results/       # Job listing & results
│   │   │   ├── JobCard.jsx
│   │   │   ├── JobList.jsx
│   │   │   └── JobDetails.jsx
│   │   ├── application/       # Application management
│   │   │   ├── ApplicationQueue.jsx
│   │   │   ├── ApplicationStatus.jsx
│   │   │   └── ApplicationHistory.jsx
│   │   └── dashboard/         # Main dashboard
│   │       ├── Dashboard.jsx
│   │       └── Statistics.jsx
│   ├── services/              # API service calls
│   │   ├── api.js            # Axios configuration
│   │   ├── authService.js
│   │   ├── jobService.js
│   │   ├── resumeService.js
│   │   └── applicationService.js
│   ├── hooks/                # Custom React hooks
│   │   ├── useAuth.js
│   │   ├── useJobs.js
│   │   └── useApplications.js
│   ├── context/              # React Context
│   │   ├── AuthContext.jsx
│   │   └── AppContext.jsx
│   ├── utils/                # Utility functions
│   │   ├── validation.js
│   │   └── formatter.js
│   ├── styles/               # CSS/SCSS files
│   │   ├── globals.css
│   │   └── components/
│   ├── App.jsx
│   ├── index.js
│   └── routes.js             # Route definitions
├── package.json
├── package-lock.json
├── .env.example
└── README.md
```

---

## 📂 Backend Structure (`/backend`)

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py                    # FastAPI application entry
│   ├── config/
│   │   ├── __init__.py
│   │   ├── settings.py           # Environment & app settings
│   │   └── database.py           # Database configuration
│   ├── models/                   # Database models
│   │   ├── __init__.py
│   │   ├── user.py
│   │   ├── resume.py
│   │   ├── job.py
│   │   └── application.py
│   ├── schemas/                  # Pydantic schemas
│   │   ├── __init__.py
│   │   ├── user.py
│   │   ├── resume.py
│   │   ├── job.py
│   │   └── application.py
│   ├── api/                      # API routes
│   │   ├── __init__.py
│   │   ├── v1/
│   │   │   ├── __init__.py
│   │   │   ├── auth.py          # OAuth endpoints
│   │   │   ├── resume.py        # Resume upload/management
│   │   │   ├── jobs.py          # Job search/listing
│   │   │   └── applications.py  # Application management
│   ├── services/                 # Business logic
│   │   ├── __init__.py
│   │   ├── auth_service.py      # Authentication logic
│   │   ├── job_scraper_service.py  # JobSpy integration
│   │   ├── resume_service.py    # Resume processing
│   │   ├── llm_service.py       # OpenAI/Gemini integration
│   │   ├── application_service.py  # Application orchestration
│   │   └── rate_limiter.py      # Rate limiting logic
│   ├── automation/               # Selenium automation
│   │   ├── __init__.py
│   │   ├── base_driver.py       # Selenium WebDriver setup
│   │   ├── linkedin_bot.py      # LinkedIn automation
│   │   ├── indeed_bot.py        # Indeed automation
│   │   ├── generic_bot.py       # Generic job board automation
│   │   └── utils.py             # Automation utilities
│   ├── core/                     # Core utilities
│   │   ├── __init__.py
│   │   ├── security.py          # Security utilities
│   │   ├── dependencies.py      # FastAPI dependencies
│   │   └── exceptions.py        # Custom exceptions
│   ├── utils/                    # Helper functions
│   │   ├── __init__.py
│   │   ├── pdf_handler.py       # PDF processing
│   │   ├── file_handler.py      # File operations
│   │   └── validators.py        # Input validation
│   └── tasks/                    # Background tasks (Celery)
│       ├── __init__.py
│       ├── celery_app.py        # Celery configuration
│       ├── job_tasks.py         # Job scraping tasks
│       └── application_tasks.py  # Application tasks
├── tests/
│   ├── __init__.py
│   ├── test_api/
│   ├── test_services/
│   └── test_automation/
├── alembic/                      # Database migrations
│   ├── versions/
│   └── env.py
├── storage/                      # Local file storage
│   ├── uploads/                 # Uploaded resumes
│   ├── generated/               # Generated resume versions
│   └── logs/                    # Application logs
├── requirements.txt
├── requirements-dev.txt
├── .env.example
├── alembic.ini
└── README.md
```

---

## 🔧 Key Configuration Files

### Root `.env.example`
```env
# Application
APP_NAME=JobAutoApply
ENVIRONMENT=development

# Backend
BACKEND_PORT=8000
BACKEND_HOST=localhost
SECRET_KEY=your-secret-key-here
ALLOWED_ORIGINS=http://localhost:3000

# Frontend
REACT_APP_API_URL=http://localhost:8000

# Database
DATABASE_URL=mongodb://localhost:27017/job_auto_apply
# Or for PostgreSQL: postgresql://user:password@localhost:5432/job_auto_apply

# AI Services
OPENAI_API_KEY=your-openai-key
GEMINI_API_KEY=your-gemini-key
AI_PROVIDER=openai  # or gemini

# OAuth (Google/GitHub/LinkedIn)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

# Rate Limiting
RATE_LIMIT_APPLICATIONS_PER_HOUR=50
RATE_LIMIT_APPLICATIONS_PER_DAY=200

# Selenium
HEADLESS_BROWSER=false
SELENIUM_TIMEOUT=30

# Redis (for Celery & Rate Limiting)
REDIS_URL=redis://localhost:6379/0

# Job Platform Credentials (Encrypted)
LINKEDIN_EMAIL=
LINKEDIN_PASSWORD=
INDEED_EMAIL=
INDEED_PASSWORD=
```

### `backend/requirements.txt`
```txt
fastapi==0.104.1
uvicorn[standard]==0.24.0
python-multipart==0.0.6
pydantic==2.5.0
pydantic-settings==2.1.0

# Database
pymongo==4.6.0
motor==3.3.2  # Async MongoDB
# or for PostgreSQL:
# psycopg2-binary==2.9.9
# sqlalchemy==2.0.23

# Authentication
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
python-oauth2==1.1.1
authlib==1.2.1

# Job Scraping
git+https://github.com/speedyapply/JobSpy.git

# Selenium
selenium==4.15.2
webdriver-manager==4.0.1
undetected-chromedriver==3.5.4

# AI/LLM
openai==1.3.7
google-generativeai==0.3.1

# PDF Processing
PyPDF2==3.0.1
pypdf==3.17.1
reportlab==4.0.7
python-docx==1.1.0

# Background Tasks
celery==5.3.4
redis==5.0.1

# Utilities
python-dotenv==1.0.0
httpx==0.25.2
aiofiles==23.2.1
tenacity==8.2.3  # Retry logic
```

### `frontend/package.json` (key dependencies)
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "axios": "^1.6.2",
    "react-query": "^3.39.3",
    "@tanstack/react-query": "^5.12.2",
    "zustand": "^4.4.7",
    "react-hook-form": "^7.48.2",
    "tailwindcss": "^3.3.6",
    "react-dropzone": "^14.2.3",
    "react-pdf": "^7.5.1",
    "chart.js": "^4.4.0",
    "react-chartjs-2": "^5.2.0",
    "react-toastify": "^9.1.3",
    "date-fns": "^2.30.0"
  }
}
```

---

## 🔄 Application Flow

```
1. User Authentication (OAuth)
   └─> frontend/src/components/auth/Login.jsx
   └─> backend/app/api/v1/auth.py

2. Resume Upload
   └─> frontend/src/components/resume/ResumeUpload.jsx
   └─> backend/app/api/v1/resume.py
   └─> backend/app/utils/pdf_handler.py
   └─> Storage: backend/storage/uploads/

3. Job Search Configuration
   └─> frontend/src/components/job-search/SearchForm.jsx
   └─> backend/app/api/v1/jobs.py
   └─> backend/app/services/job_scraper_service.py (JobSpy)

4. Resume Customization (AI)
   └─> backend/app/services/llm_service.py
   └─> OpenAI/Gemini API
   └─> Generate multiple resume versions
   └─> Storage: backend/storage/generated/

5. Automated Application
   └─> backend/app/services/application_service.py
   └─> backend/app/automation/linkedin_bot.py
   └─> backend/app/automation/indeed_bot.py
   └─> Rate Limiter: backend/app/services/rate_limiter.py

6. Application Tracking
   └─> frontend/src/components/application/ApplicationStatus.jsx
   └─> backend/app/models/application.py
   └─> Database: MongoDB/PostgreSQL
```

---

## 🚀 Setup Instructions

### Prerequisites
```bash
# Python 3.10+
# Node.js 18+
# MongoDB or PostgreSQL
# Redis (for background tasks)
# Chrome/Chromium (for Selenium)
```

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your configuration
uvicorn app.main:app --reload --port 8000
```

### Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with your configuration
npm start
```

### Database Setup (MongoDB)
```bash
# Install MongoDB locally or use Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### Redis Setup (for Celery)
```bash
docker run -d -p 6379:6379 --name redis redis:latest
```

### Celery Worker
```bash
cd backend
celery -A app.tasks.celery_app worker --loglevel=info
```

---

## 📝 API Endpoints Structure

```
/api/v1/
├── /auth
│   ├── POST   /login
│   ├── POST   /logout
│   ├── GET    /callback/{provider}
│   └── GET    /me
├── /resume
│   ├── POST   /upload
│   ├── GET    /{resume_id}
│   ├── GET    /versions/{job_id}
│   └── DELETE /{resume_id}
├── /jobs
│   ├── POST   /search
│   ├── GET    /
│   ├── GET    /{job_id}
│   └── POST   /scrape
└── /applications
    ├── POST   /start
    ├── GET    /
    ├── GET    /{application_id}
    ├── POST   /{application_id}/retry
    └── GET    /stats
```

---

## 🔐 Security Considerations

1. **Encrypted Credentials Storage**: Use `cryptography.fernet` for encrypting job platform credentials
2. **OAuth Flow**: Implement proper OAuth 2.0 flow with state verification
3. **Rate Limiting**: Implement at both API and automation levels
4. **File Validation**: Validate uploaded PDFs for security
5. **Environment Variables**: Never commit `.env` files
6. **API Key Protection**: Store AI API keys securely

---

## 📊 Database Schema (MongoDB)

```javascript
// users collection
{
  _id: ObjectId,
  email: String,
  oauth_provider: String,
  oauth_id: String,
  created_at: Date,
  updated_at: Date
}

// resumes collection
{
  _id: ObjectId,
  user_id: ObjectId,
  original_file: String,  // File path
  parsed_content: Object,
  uploaded_at: Date
}

// jobs collection
{
  _id: ObjectId,
  user_id: ObjectId,
  job_id: String,
  title: String,
  company: String,
  location: String,
  url: String,
  description: String,
  requirements: Array,
  platform: String,  // linkedin, indeed, etc.
  scraped_at: Date
}

// applications collection
{
  _id: ObjectId,
  user_id: ObjectId,
  job_id: ObjectId,
  resume_version: String,  // File path
  status: String,  // pending, applied, failed
  applied_at: Date,
  error_message: String
}

// rate_limits collection
{
  _id: ObjectId,
  user_id: ObjectId,
  platform: String,
  count: Number,
  window_start: Date
}
```

---

## 🧪 Testing Strategy

```
backend/tests/
├── test_api/
│   ├── test_auth.py
│   ├── test_resume.py
│   ├── test_jobs.py
│   └── test_applications.py
├── test_services/
│   ├── test_job_scraper.py
│   ├── test_llm_service.py
│   └── test_rate_limiter.py
└── test_automation/
    ├── test_linkedin_bot.py
    └── test_indeed_bot.py
```

---

## 📦 Future Enhancements

- [ ] Docker containerization
- [ ] Cloud deployment (AWS/GCP)
- [ ] Multi-user support
- [ ] Advanced analytics dashboard
- [ ] Email notifications
- [ ] Resume approval workflow
- [ ] Custom cover letter generation
- [ ] Interview scheduling integration

---

## 🤝 Contributing

This is a single-user application but can be extended for multi-tenant use.