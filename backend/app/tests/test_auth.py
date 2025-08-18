import uuid

import pytest
from app.main import app
from httpx import ASGITransport, AsyncClient


@pytest.mark.asyncio
async def test_register_and_login():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        email = f"test_{uuid.uuid4().hex[:6]}@example.com"

        # Register
        r = await ac.post(
            "/api/auth/register", json={"email": email, "password": "secret"}
        )
        assert r.status_code in [200, 201]

        # Login
        r = await ac.post(
            "/api/auth/login", json={"email": email, "password": "secret"}
        )
        assert r.status_code == 200
        token = r.cookies.get("access_token")
        assert token is not None

        ac.cookies.set("access_token", token)

        # Authenticated /me
        r = await ac.get("/api/auth/me")
        assert r.status_code == 200
        account = r.json()
        assert account["email"] == email


@pytest.mark.asyncio
async def test_register_duplicate_email():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        email = f"dup_{uuid.uuid4().hex[:6]}@example.com"

        # First register → OK
        r1 = await ac.post(
            "/api/auth/register", json={"email": email, "password": "secret"}
        )
        assert r1.status_code in [200, 201]

        # Second register with same email → should fail
        r2 = await ac.post(
            "/api/auth/register", json={"email": email, "password": "secret"}
        )
        assert r2.status_code == 400
        assert "Email already registered" in r2.text


@pytest.mark.asyncio
async def test_login_wrong_password():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        email = f"wrongpass_{uuid.uuid4().hex[:6]}@example.com"

        # Register
        r = await ac.post(
            "/api/auth/register", json={"email": email, "password": "secret"}
        )
        assert r.status_code in [200, 201]

        # Try login with wrong password
        r = await ac.post(
            "/api/auth/login", json={"email": email, "password": "notsecret"}
        )
        assert r.status_code == 400
        assert "Invalid credentials" in r.text
