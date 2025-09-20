from fastapi import FastAPI
from app.routers import auth, sweets, inventory
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Sweet Shop API")

app.include_router(auth.router, prefix="/api/auth", tags=["Auth"])
app.include_router(sweets.router, prefix="/api/sweets", tags=["Sweets"])
app.include_router(inventory.router, prefix="/api/inventory", tags=["Inventory"])
app.include_router(auth.router, prefix="/api/users", tags=["Users"])


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],  # Allow GET, POST, PUT, DELETE, OPTIONS
    allow_headers=["*"],  # Allow Authorization, Content-Type, etc.
)
@app.get("/")
def root():
    return{"message": "Sweet Shop API is running"}
