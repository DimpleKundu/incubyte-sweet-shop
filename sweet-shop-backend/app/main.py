from fastapi import FastAPI
from app.routers import auth, sweets, inventory
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Sweet Shop API")

app.include_router(auth.router, prefix="/api/auth", tags=["Auth"])
app.include_router(sweets.router, prefix="/api/sweets", tags=["Sweets"])
app.include_router(inventory.router, prefix="/api/inventory", tags=["Inventory"])
app.include_router(auth.router, prefix="/api/users", tags=["Users"])


origins = [
    "http://localhost:5173",  # dev vite
    "https://incubyte-sweet-shop-1.onrender.com",  # frontend on Render
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
def root():
    return{"message": "Sweet Shop API is running"}
