from fastapi import APIRouter
from app.schemas.job import JobRequest
from app.services.job_service import scrape_jobs_service

router = APIRouter()


@router.post("/scrape")
def scrape_jobs_api(payload: JobRequest):
    return scrape_jobs_service(payload)