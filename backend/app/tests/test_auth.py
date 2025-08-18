import uuid

import pytest
from app.main import app
from httpx import ASGITransport, AsyncClient


@pytest.mark.asyncio
async def test_register_and_login():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        # unique email per test run
        email = f"test_{uuid.uuid4().hex[:6]}@example.com"

        # Register
        r = await ac.post(
            "/api/auth/register",
            json={"email": email, "password": "secret"},
        )
        assert r.status_code in [200, 201]

        # Login
        r = await ac.post(
            "/api/auth/login",
            json={"email": email, "password": "secret"},
        )
        assert r.status_code == 200

        # set cookie on client instead of per-request (avoids deprecation warning)
        token = r.cookies.get("access_token")
        assert token is not None
        ac.cookies.set("access_token", token)

        # Authenticated /me
        r = await ac.get("/api/auth/me")
        assert r.status_code == 200
        account = r.json()
        assert account["email"] == email
