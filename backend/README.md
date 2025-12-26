# AutoApply Backend

A FastAPI-based backend service for the AutoApply job application automation platform. This service handles PDF resume processing, job scraping, AI-powered application generation, and automated job application submission.

## 🚀 Tech Stack

- **Framework**: FastAPI (Python async web framework)
- **PDF Processing**: PyPDF2/pypdf for text extraction
- **Database**: MongoDB (planned) / PostgreSQL (alternative)
- **Authentication**: OAuth2 with JWT tokens
- **Job Scraping**: JobSpy library
- **AI Integration**: OpenAI/Gemini APIs
- **Automation**: Selenium WebDriver
- **Background Tasks**: Celery + Redis
- **ASGI Server**: Uvicorn

## 📁 Project Structure

```
backend/
├── app/
│   ├── main.py                    # FastAPI application entry point
│   ├── config/                    # Configuration settings
│   │   ├── settings.py           # Environment & app settings
│   │   └── database.py           # Database configuration
│   ├── models/                   # Database models (Pydantic/MongoEngine)
│   ├── schemas/                  # API request/response schemas
│   ├── api/v1/                   # API route handlers
│   │   ├── auth.py              # Authentication endpoints
│   │   ├── resume.py            # Resume upload/management
│   │   ├── jobs.py              # Job search/listing
│   │   └── applications.py      # Application management
│   ├── services/                 # Business logic layer
│   │   ├── auth_service.py      # Authentication logic
│   │   ├── job_scraper_service.py # JobSpy integration
│   │   ├── resume_service.py    # Resume processing
│   │   ├── llm_service.py       # AI/LLM integration
│   │   ├── application_service.py # Application orchestration
│   │   └── rate_limiter.py      # Rate limiting
│   ├── automation/               # Selenium automation bots
│   │   ├── linkedin_bot.py      # LinkedIn automation
│   │   ├── indeed_bot.py        # Indeed automation
│   │   └── base_driver.py       # WebDriver setup
│   ├── core/                     # Core utilities
│   │   ├── security.py          # Security utilities
│   │   ├── dependencies.py      # FastAPI dependencies
│   │   └── exceptions.py        # Custom exceptions
│   ├── utils/                    # Helper functions
│   │   ├── pdf_handler.py       # PDF processing utilities
│   │   ├── file_handler.py      # File operations
│   │   └── validators.py        # Input validation
│   └── tasks/                    # Background tasks (Celery)
│       ├── celery_app.py        # Celery configuration
│       ├── job_tasks.py         # Job scraping tasks
│       └── application_tasks.py # Application tasks
├── tests/                        # Unit and integration tests
├── .venv/                        # Python virtual environment
└── requirements.txt              # Python dependencies
```

## 🛠️ Setup & Installation

### Prerequisites

- Python 3.9+
- pip (Python package manager)
- Virtual environment (recommended)

### Installation

1. **Navigate to backend directory:**

   ```bash
   cd backend
   ```

2. **Create and activate virtual environment:**

   ```bash
   python -m venv .venv
   # On Windows:
   .venv\Scripts\activate
   # On macOS/Linux:
   source .venv/bin/activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

### Environment Variables

Create a `.env` file in the backend root directory:

```env
# Application Settings
BACKEND_PORT=8000
BACKEND_HOST=localhost
SECRET_KEY=your-secret-key-here
DEBUG=True

# Database
DATABASE_URL=mongodb://localhost:27017/autoapply
# or for PostgreSQL:
# DATABASE_URL=postgresql://user:password@localhost/autoapply

# Authentication
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
JWT_SECRET_KEY=your-jwt-secret

# AI Services
OPENAI_API_KEY=your-openai-api-key
GEMINI_API_KEY=your-gemini-api-key

# Selenium
CHROME_DRIVER_PATH=/path/to/chromedriver

# Redis (for Celery)
REDIS_URL=redis://localhost:6379
```

## 🚀 Running the Application

### Development Server

```bash
# From backend directory with virtual environment activated
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at: http://localhost:8000

### API Documentation

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc
- **OpenAPI Schema**: http://localhost:8000/openapi.json

### Background Tasks (Celery)

```bash
# Terminal 1: Start Redis server
redis-server

# Terminal 2: Start Celery worker
celery -A app.tasks.celery_app worker --loglevel=info
```

## 📡 API Endpoints

### Current Endpoints

- `GET /` - Health check
- `POST /api/v1/resume` - Upload and extract text from PDF resume

### Planned Endpoints

- `POST /api/v1/auth/login` - User authentication
- `GET /api/v1/jobs` - Search and list jobs
- `POST /api/v1/applications` - Submit job applications
- `GET /api/v1/applications/{id}` - Get application status

## 🔧 Development

### Code Style

This project follows PEP 8 Python style guidelines. Use `black` for code formatting and `flake8` for linting.

### Testing

```bash
# Run tests
pytest

# Run with coverage
pytest --cov=app --cov-report=html
```

### Database Migrations

For database schema changes, update the models in `app/models/` and run migrations according to your database choice.

## 📦 Dependencies

Key dependencies include:

- **fastapi**: Web framework
- **uvicorn**: ASGI server
- **pydantic**: Data validation
- **pypdf**: PDF text extraction
- **python-multipart**: File upload handling
- **python-jose**: JWT token handling
- **passlib**: Password hashing
- **httpx**: Async HTTP client
- **aiofiles**: Async file operations

See `requirements.txt` for complete dependency list.

## 🔒 Security

- JWT-based authentication
- Rate limiting on API endpoints
- Input validation using Pydantic
- CORS configuration for frontend integration
- Secure file upload handling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file in the root directory for details.
