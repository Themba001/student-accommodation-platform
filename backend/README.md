# Backend

This folder contains the FastAPI backend foundation for the student accommodation platform.

## Environment configuration

Create a local environment file at `backend/.env` with the following values:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

Do not commit the `.env` file. Keep real secrets local only.

## Start the API

From the repository root:

```bash
cd backend
python -m uvicorn app.main:app --reload
```

## Health check

The backend exposes a health endpoint:

```http
GET /health
```

This checks that FastAPI is running and that the shared Supabase client can perform a lightweight read query.

If Supabase is unavailable, the endpoint returns an unhealthy response with an HTTP 503 status.
