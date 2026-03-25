from fastapi import FastAPI
from app.api.v1.endpoints.jobs import router as jobs_router

app = FastAPI(title="AutoApply API")

app.include_router(jobs_router, prefix="/api/v1/jobs")