from pydantic import BaseModel
from typing import List, Optional


class JobRequest(BaseModel):
    site_name: List[str]
    search_term: str
    google_search_term: Optional[str] = None
    location: str
    results_wanted: int = 50
    hours_old: int = 72
    country_indeed: str = "Canada"