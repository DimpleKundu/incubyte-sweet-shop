from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    email: EmailStr
    password: str

class UserInDB(BaseModel):
    id: str
    email: EmailStr
    hashed_password: str
    is_admin: bool = False

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

    