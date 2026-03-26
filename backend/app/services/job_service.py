import json
from app.scrapers import scrape_jobs
from app.schemas.job import JobRequest


def scrape_jobs_service(payload: JobRequest):
    jobs = scrape_jobs(
        site_name=payload.site_name,
        search_term=payload.search_term,
        google_search_term=payload.google_search_term,
        location=payload.location,
        results_wanted=payload.results_wanted,
        hours_old=payload.hours_old,
        country_indeed=payload.country_indeed,
        linkedin_fetch_description=True,
    )

    # Convert DataFrame → JSON
    jobs_dict = jobs.to_dict(orient="records")

    # Clean NaN values
    for job in jobs_dict:
        for key, value in job.items():
            if str(value) == "nan":
                job[key] = None

    return {
        "total_jobs": len(jobs_dict),
        "jobs": jobs_dict
    }