import logging
from typing import Any

from fastapi import APIRouter
from fastapi.responses import JSONResponse

from app.core.supabase import get_supabase_client

logger = logging.getLogger(__name__)
router = APIRouter()


@router.get("/health")
def health_check() -> dict[str, Any]:
    try:
        supabase = get_supabase_client()
        supabase.schema("auth").table("users").select("id").limit(1).execute()
        return {
            "status": "ok",
            "service": "student-accommodation-api",
            "database": "connected",
        }
    except Exception:
        logger.exception("Supabase health check failed")
        return JSONResponse(
            status_code=503,
            content={
                "status": "degraded",
                "service": "student-accommodation-api",
                "database": "disconnected",
            },
        )
