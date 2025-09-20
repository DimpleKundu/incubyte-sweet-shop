from fastapi import APIRouter, HTTPException, Depends
from typing import List, Optional
from bson import ObjectId

from app.models.sweet import SweetCreate, SweetUpdate, SweetInDB
from app.db.mongo import db
from app.utils.security import get_current_user, get_current_admin

router = APIRouter()

# Add a new sweet (Admin only)
@router.post("/", response_model=SweetInDB)
async def add_sweet(sweet: SweetCreate, current_user=Depends(get_current_admin)):
    sweet_doc = sweet.dict()
    result = await db.sweets.insert_one(sweet_doc)
    return SweetInDB(id=str(result.inserted_id), **sweet_doc)

# List all sweets
@router.get("/", response_model=List[SweetInDB])
async def list_sweets(current_user=Depends(get_current_user)):
    sweets = []
    cursor = db.sweets.find()
    async for doc in cursor:
        sweets.append(SweetInDB(id=str(doc["_id"]), **doc))
    return sweets

# Search sweets
@router.get("/search", response_model=List[SweetInDB])
async def search_sweets(
    name: Optional[str] = None,
    category: Optional[str] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    current_user=Depends(get_current_user)
):
    query = {}
    if name:
        query["name"] = {"$regex": name, "$options": "i"}
    if category:
        query["category"] = {"$regex": category, "$options": "i"}
    if min_price is not None or max_price is not None:
        query["price"] = {}
        if min_price is not None:
            query["price"]["$gte"] = min_price
        if max_price is not None:
            query["price"]["$lte"] = max_price

    sweets = []
    cursor = db.sweets.find(query)
    async for doc in cursor:
        sweets.append(SweetInDB(id=str(doc["_id"]), **doc))
    return sweets

# Update a sweet (Admin only)
@router.put("/{sweet_id}", response_model=SweetInDB)
async def update_sweet(sweet_id: str, sweet: SweetUpdate, current_user=Depends(get_current_admin)):
    update_data = {k: v for k, v in sweet.dict().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="No fields to update")
    result = await db.sweets.update_one({"_id": ObjectId(sweet_id)}, {"$set": update_data})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Sweet not found")
    doc = await db.sweets.find_one({"_id": ObjectId(sweet_id)})
    return SweetInDB(id=str(doc["_id"]), **doc)

# Delete a sweet (Admin only)
@router.delete("/{sweet_id}")
async def delete_sweet(sweet_id: str, current_user=Depends(get_current_admin)):
    result = await db.sweets.delete_one({"_id": ObjectId(sweet_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Sweet not found")
    return {"detail": "Sweet deleted successfully"}

# to add sweets in bulk
@router.post("/bulk", response_model=List[SweetInDB])
async def add_sweets_bulk(
    sweets: List[SweetCreate],
    current_user=Depends(get_current_admin)
):
    sweet_docs = [sweet.dict() for sweet in sweets]
    result = await db.sweets.insert_many(sweet_docs)
    
    inserted = []
    for _id, doc in zip(result.inserted_ids, sweet_docs):
        inserted.append(SweetInDB(id=str(_id), **doc))
    return inserted
