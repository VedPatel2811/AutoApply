import math
from typing import List, Dict, Optional
from jobspy import scrape_jobs


def fetch_jobs(
    search_term: str,
    location: str,
    sites: Optional[List[str]] = None,
    google_search_term: Optional[str] = None,
    results_wanted: int = 20,
    hours_old: int = 72,
    country_indeed: Optional[str] = "Canada",
) -> List[Dict]:
    """
    Fetch jobs using JobSpy and return JSON-safe data.
    """

    sites = sites or ["indeed", "linkedin", "zip_recruiter", "google"]

    jobs_df = scrape_jobs(
        site_name=sites,
        search_term=search_term,
        google_search_term=google_search_term,
        location=location,
        results_wanted=results_wanted,
        hours_old=hours_old,
        country_indeed=country_indeed,
    )

    jobs = jobs_df.to_dict(orient="records")

    # Replace NaN → None (JSON-safe)
    for job in jobs:
        for key, value in job.items():
            if isinstance(value, float) and math.isnan(value):
                job[key] = None

    return jobs
