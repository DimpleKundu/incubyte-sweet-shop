import pytest
from httpx import AsyncClient
from app.main import app
from app.db.mongo import db
from app.utils.security import hash_password, create_access_token
from bson import ObjectId

pytestmark = pytest.mark.asyncio

@pytest.mark.asyncio
async def test_register_and_login():
    # --- CLEANUP: remove test user if exists ---
    await db.users.delete_many({"email": "testuser@example.com"})

    # --- REGISTER USER ---
    user_data = {"email": "testuser@example.com", "password": "secret123"}
    async with AsyncClient(base_url="http://localhost:8000") as client:
        response = await client.post("/api/auth/register", json=user_data)
    
    # Registration should succeed
    assert response.status_code == 201 or response.status_code == 200

    # --- LOGIN USER ---
    login_data = {"username": "testuser@example.com", "password": "secret123"}
    async with AsyncClient(base_url="http://localhost:8000") as client:
        response = await client.post("/api/auth/login", data=login_data)
    
    assert response.status_code == 200
    json_resp = response.json()
    assert "access_token" in json_resp
    assert json_resp["token_type"] == "bearer"

    # --- VERIFY TOKEN WORKS ---
    token = json_resp["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    async with AsyncClient(base_url="http://localhost:8000") as client:
        me_resp = await client.get("/api/auth/me", headers=headers)  # assuming you have a /me endpoint
    assert me_resp.status_code == 200
    assert me_resp.json()["email"] == "testuser@example.com"

    # --- CLEANUP ---
    await db.users.delete_many({"email": "testuser@example.com"})
