import pytest
from httpx import AsyncClient
from httpx._transports.asgi import ASGITransport
from asgi_lifespan import LifespanManager
from bson import ObjectId

from app.main import app
from app.routers import inventory
from app.db.mongo import db

# ----------------------------
# Mock authentication
# ----------------------------
def get_current_user_mock():
    return {"username": "testuser", "email": "test@example.com", "is_admin": False}

def get_current_admin_mock():
    return {"username": "adminuser", "email": "admin@example.com", "is_admin": True}

# ----------------------------
# Test app setup & teardown
# ----------------------------
@pytest.fixture(scope="module", autouse=True)
async def setup_test_app():
    # Override dependencies
    app.dependency_overrides[inventory.get_current_user] = get_current_user_mock
    app.dependency_overrides[inventory.get_current_admin] = get_current_admin_mock

    # Clean DB before tests
    await db.sweets.delete_many({})

    yield

    # Restore dependencies and clean DB after tests
    app.dependency_overrides = {}
    await db.sweets.delete_many({})

# ----------------------------
# Async client fixture
# ----------------------------
@pytest.fixture
async def client():
    transport = ASGITransport(app=app)
    async with LifespanManager(app):
        async with AsyncClient(transport=transport, base_url="http://test") as client:
            yield client

# ----------------------------
# Tests
# ----------------------------

@pytest.mark.asyncio
async def test_purchase_sweet_success(client):
    sweet_data = {"name": "TestSweet", "category": "Candy", "price": 10, "quantity": 5}
    sweet_id = (await db.sweets.insert_one(sweet_data)).inserted_id

    response = await client.post(f"/api/inventory/{sweet_id}/purchase")
    assert response.status_code == 200
    assert response.json() == {"detail": "Purchase successful"}

    updated_sweet = await db.sweets.find_one({"_id": sweet_id})
    assert updated_sweet["quantity"] == 4

@pytest.mark.asyncio
async def test_purchase_sweet_fail_out_of_stock(client):
    sweet_data = {"name": "FailSweet", "category": "Candy", "price": 10, "quantity": 0}
    sweet_id = (await db.sweets.insert_one(sweet_data)).inserted_id

    response = await client.post(f"/api/inventory/{sweet_id}/purchase")
    assert response.status_code == 400
    assert response.json()["detail"] == "Sweet out of stock"

@pytest.mark.asyncio
async def test_purchase_sweet_fail_not_found(client):
    non_existent_id = str(ObjectId())
    response = await client.post(f"/api/inventory/{non_existent_id}/purchase")
    assert response.status_code == 404
    assert response.json()["detail"] == "Sweet not found"

@pytest.mark.asyncio
async def test_restock_sweet_success(client):
    sweet_data = {"name": "RestockSweet", "category": "Candy", "price": 10, "quantity": 5}
    sweet_id = (await db.sweets.insert_one(sweet_data)).inserted_id

    response = await client.post(f"/api/inventory/{sweet_id}/restock?amount=10")
    assert response.status_code == 200
    assert response.json()["detail"] == "Restocked 10 units successfully"

    updated_sweet = await db.sweets.find_one({"_id": sweet_id})
    assert updated_sweet["quantity"] == 15

@pytest.mark.asyncio
async def test_restock_sweet_fail_non_admin(client):
    # Override admin dependency temporarily to non-admin
    app.dependency_overrides[inventory.get_current_admin] = get_current_user_mock

    sweet_data = {"name": "FailRestockSweet", "category": "Candy", "price": 10, "quantity": 5}
    sweet_id = (await db.sweets.insert_one(sweet_data)).inserted_id

    response = await client.post(f"/api/inventory/{sweet_id}/restock?amount=10")
    assert response.status_code == 403
    assert response.json()["detail"] == "Not authenticated as admin"

    # Restore admin dependency
    app.dependency_overrides[inventory.get_current_admin] = get_current_admin_mock

@pytest.mark.asyncio
async def test_restock_sweet_fail_negative_amount(client):
    sweet_data = {"name": "NegativeRestockSweet", "category": "Candy", "price": 10, "quantity": 5}
    sweet_id = (await db.sweets.insert_one(sweet_data)).inserted_id

    response = await client.post(f"/api/inventory/{sweet_id}/restock?amount=-5")
    assert response.status_code == 400
    assert response.json()["detail"] == "Amount must be positive"
