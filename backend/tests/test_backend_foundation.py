from fastapi.testclient import TestClient
from pydantic import ValidationError

from app.main import app
from app.core.config import Settings
from app.core.supabase import get_supabase_client


client = TestClient(app)


def test_app_imports():
    assert app is not None


def test_health_endpoint_returns_ok(monkeypatch):
    class FakeQuery:
        def select(self, *_args, **_kwargs):
            return self

        def limit(self, *_args, **_kwargs):
            return self

        def execute(self):
            return type("Result", (), {"data": [{"id": 1}]})()

    class FakeSchemaClient:
        def table(self, *_args, **_kwargs):
            return FakeQuery()

    class FakeSupabaseClient:
        def schema(self, *_args, **_kwargs):
            return FakeSchemaClient()

    monkeypatch.setattr("app.api.health.get_supabase_client", lambda: FakeSupabaseClient())

    response = client.get("/health")

    assert response.status_code == 200
    assert response.json()["status"] == "ok"
    assert response.json()["database"] == "connected"


def test_health_endpoint_uses_auth_users_schema(monkeypatch):
    captured = {}

    class FakeQuery:
        def select(self, *_args, **_kwargs):
            return self

        def limit(self, *_args, **_kwargs):
            return self

        def execute(self):
            return type("Result", (), {"data": [{"id": 1}]})()

    class FakeSchemaClient:
        def table(self, table_name, *_args, **_kwargs):
            captured["table"] = table_name
            return FakeQuery()

    class FakeSupabaseClient:
        def schema(self, schema_name, *_args, **_kwargs):
            captured["schema"] = schema_name
            return FakeSchemaClient()

    monkeypatch.setattr("app.api.health.get_supabase_client", lambda: FakeSupabaseClient())

    response = client.get("/health")

    assert response.status_code == 200
    assert captured == {"schema": "auth", "table": "users"}


def test_health_endpoint_returns_unhealthy_when_supabase_fails(monkeypatch):
    class FakeSupabaseClient:
        def table(self, *_args, **_kwargs):
            raise RuntimeError("Supabase unavailable")

    monkeypatch.setattr("app.api.health.get_supabase_client", lambda: FakeSupabaseClient())

    response = client.get("/health")

    assert response.status_code == 503
    assert response.json()["status"] == "degraded"
    assert response.json()["database"] == "disconnected"


def test_settings_require_supabase_variables(monkeypatch):
    monkeypatch.delenv("SUPABASE_URL", raising=False)
    monkeypatch.delenv("SUPABASE_SERVICE_ROLE_KEY", raising=False)

    try:
        Settings(_env_file=None)
        raise AssertionError("Expected ValidationError when required environment variables are missing")
    except ValidationError:
        pass


def test_supabase_client_is_reused(monkeypatch):
    monkeypatch.setenv("SUPABASE_URL", "https://example.supabase.co")
    monkeypatch.setenv("SUPABASE_SERVICE_ROLE_KEY", "service-role-key")

    import importlib
    import app.core.supabase as supabase_module

    created_clients = []

    def fake_create_client(url, key):
        client = object()
        created_clients.append((url, key, client))
        return client

    monkeypatch.setattr(supabase_module, "create_client", fake_create_client)
    supabase_module.get_supabase_client.cache_clear()

    first_client = supabase_module.get_supabase_client()
    second_client = supabase_module.get_supabase_client()

    assert first_client is second_client
    assert len(created_clients) == 1
