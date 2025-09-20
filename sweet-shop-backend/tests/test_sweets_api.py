# sweet-shop-backend/tests/test_sweets_api.py
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_get_sweets_unauthorized():
    response = client.get("/api/sweets")
    assert response.status_code == 401  # Red: endpoint not yet protected

def test_create_sweet_requires_admin():
    response = client.post("/api/sweets", json={
        "name": "Test Sweet",
        "category": "Candy",
        "price": 10,
        "quantity": 5
    })
    assert response.status_code == 401  # Red: not authorized yet
