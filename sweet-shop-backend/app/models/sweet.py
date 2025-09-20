from pydantic import BaseModel, Field
from typing import Optional

class SweetBase(BaseModel):
    name: str = Field(..., example="Ladoo")
    category: str = Field(..., example="Indian")
    price: float = Field(..., example=10.0)
    quantity: int = Field(..., example=50)

class SweetCreate(SweetBase):
    pass  # for adding new sweets

class SweetUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    price: Optional[float] = None
    quantity: Optional[int] = None

class SweetInDB(SweetBase):
    id: str  # MongoDB ObjectId as string
