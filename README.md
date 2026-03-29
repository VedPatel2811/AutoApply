# AutoApply

Automate your job search. Set your parameters once, let the Invisible Concierge handle the rest.

AutoApply is a full-stack web application that scrapes real-time job listings from multiple job boards based on your search parameters and presents them in a clean, paginated table.

---

## Tech Stack

**Frontend**
- React 19 + TypeScript
- Vite
- Tailwind CSS
- Redux Toolkit
- React Router v7
- Lucide React

**Backend**
- Python
- FastAPI
- Uvicorn
- Pydantic
- BeautifulSoup4 + requests + tls_client (scraping)

---

## Project Structure

```
AutoApply/
├── backend/
│   ├── app/
│   │   ├── api/v1/         # API route handlers
│   │   ├── scrapers/       # Job board scrapers (LinkedIn, etc.)
│   │   ├── schemas/        # Pydantic models
│   │   ├── services/       # Business logic
│   │   ├── config.py       # App settings
│   │   └── main.py         # FastAPI entry point
│   ├── .env
│   ├── .env.example
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── components/ui/  # Reusable UI components
    │   ├── layouts/        # Page layouts
    │   ├── pages/          # Route pages
    │   └── store/          # Redux slices & store
    ├── .env
    ├── .env.example
    └── package.json
```

---

## Getting Started

### Prerequisites

- Node.js >= 18
- Python >= 3.10

---

### Backend Setup

```bash
cd backend

# Create and activate virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env as needed

# Start the server
uvicorn app.main:app --reload
```

Backend runs at `http://localhost:8000`  
API docs available at `http://localhost:8000/docs`

---

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env as needed

# Start the dev server
npm run dev
```

Frontend runs at `http://localhost:5173`

---

## Environment Variables

**backend/.env**

| Variable | Description | Example |
|---|---|---|
| `CORS_ORIGINS` | Allowed frontend origins | `["http://localhost:5173"]` |

**frontend/.env**

| Variable | Description | Example |
|---|---|---|
| `VITE_API_URL` | Backend API base URL | `http://localhost:8000` |

---

## Features

- Search jobs by title, location, country, and date range
- Real-time scraping from LinkedIn (more sources coming soon)
- Paginated results table — 7 jobs per page
- Skeleton loading state while fetching
- Resuls section only appears after a search is triggered
- Coming Soon badges on unavailable job sources

## Supported Job Sources

| Source | Status |
|---|---|
| LinkedIn | ✅ Available |
| Indeed | 🔜 Coming Soon |
| Glassdoor | 🔜 Coming Soon |
| Google Jobs | 🔜 Coming Soon |
| ZipRecruiter | 🔜 Coming Soon |
| Bayt | 🔜 Coming Soon |
| Naukri | 🔜 Coming Soon |
| BDJobs | 🔜 Coming Soon |

---

## API Reference

### `POST /api/v1/jobs/scrape`

Scrape jobs from selected sources.

**Request body**
```json
{
  "site_name": ["linkedin"],
  "search_term": "Senior UX Designer",
  "location": "Remote",
  "results_wanted": 20,
  "hours_old": 72,
  "country_indeed": "United States"
}
```

**Response**
```json
{
  "total_jobs": 20,
  "jobs": [
    {
      "id": "...",
      "site": "linkedin",
      "job_url": "...",
      "title": "Senior UX Designer",
      "company": "Acme Corp",
      "location": "Remote",
      "date_posted": "2025-01-01",
      "job_type": "Full-time",
      "is_remote": true
    }
  ]
}
```
