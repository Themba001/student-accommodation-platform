from fastapi import FastAPI

from app.api.health import router as health_router

app = FastAPI(
    title="Student Accommodation API",
    version="0.1.0",
    description="Backend foundation for the student accommodation platform.",
)

app.include_router(health_router)
