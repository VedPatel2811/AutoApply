import json
from app.scrapers import scrape_jobs

jobs = scrape_jobs(
    #site_name=["indeed", "linkedin", "zip_recruiter", "google", "glassdoor"], # "glassdoor", "bayt", "naukri", "bdjobs"
    site_name=["linkedin"],
    search_term="software engineer",
    google_search_term="software engineer jobs near Ottawa, ON since yesterday",
    location="Ottawa, ON",
    results_wanted=50,
    hours_old=72,
    country_indeed='Canada',
    
    linkedin_fetch_description=True, # gets more info such as description, direct job url (slower)
    #proxies=["208.195.175.46:65095", "208.195.175.45:65095", "localhost"],
)
print(f"Found {len(jobs)} jobs")
print(jobs.head())
#jobs.to_csv("jobs.csv", quoting=csv.QUOTE_NONNUMERIC, escapechar="\\", index=False) # to_excel
jobs_dict = jobs.to_dict(orient="records")
for job in jobs_dict:
    for key, value in job.items():
        if str(value) == 'nan':
            job[key] = None

with open("jobs.json", "w", encoding="utf-8") as f:
    json.dump(
        jobs_dict,
        f,
        indent=4,
        ensure_ascii=False,
        default=str
    )