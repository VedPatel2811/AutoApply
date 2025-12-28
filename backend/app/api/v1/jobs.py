from fastapi import APIRouter, Query
from typing import List
from app.services.job_scraper_service import fetch_jobs

router = APIRouter(prefix="/api/v1/jobs", tags=["Jobs"])


@router.get("/search")
def search_jobs(
    query: str = Query(..., description="Job title"),
    location: str = Query(..., description="Job location"),
    sites: List[str] = Query(default=["linkedin"]),
    results: int = Query(default=20),
):
    jobs = fetch_jobs(
        search_term=query,
        location=location,
        sites=sites,
        results_wanted=results,
    )

    return {
        "count": len(jobs),
        "results": jobs,
    }
