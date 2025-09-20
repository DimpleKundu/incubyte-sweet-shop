from fastapi import APIRouter, HTTPException, Depends, logger
from fastapi.security import OAuth2PasswordRequestForm
from app.models.user import UserCreate, Token, UserInDB
from app.utils.security import get_current_user, hash_password, verify_password, create_access_token
from app.db.mongo import db
from bson import ObjectId
from pydantic import BaseModel

router = APIRouter()

@router.post("/register", status_code=201)
async def register(user: UserCreate):
    existing = await db.users.find_one({"email": user.email})
    if existing:
        raise HTTPException(status_code=400, detail="email already registered")
    hashed = hash_password(user.password)
    user_doc = {"email": user.email, "hashed_password": hashed, "is_admin": False}
    result = await db.users.insert_one(user_doc)
    return {"id": str(result.inserted_id), "email": user.email}

class LoginRequest(BaseModel):
    email: str
    password: str

@router.post("/login", response_model=Token)
async def login(user: LoginRequest):
    db_user = await db.users.find_one({"email": user.email})
    if not db_user or not verify_password(user.password, db_user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Invalid Credentials")
    token = create_access_token({
        "sub": str(db_user["_id"]),
        "email": db_user["email"],
        "is_admin": db_user["is_admin"]
    })
    return {"access_token": token, "token_type": "bearer"}

@router.get("/me", response_model=UserInDB)
async def read_current_user(current_user=Depends(get_current_user)):
    user_data = {
        "id": str(current_user["_id"]),
        "email": current_user["email"],
        "hashed_password": current_user["hashed_password"],
        "is_admin": current_user.get("is_admin", False),
    }
    print(f"Returning current user data: {user_data}")
    return user_data