from fastapi import APIRouter, HTTPException, Depends
from bson import ObjectId
from app.db.mongo import db
from app.utils.security import get_current_user, get_current_admin

router = APIRouter()

# Purchase a sweet (decrease quantity)
@router.post("/{sweet_id}/purchase")
async def purchase_sweet(sweet_id: str, current_user=Depends(get_current_user)):
    sweet = await db.sweets.find_one({"_id": ObjectId(sweet_id)})
    if not sweet:
        raise HTTPException(status_code=404, detail="Sweet not found")
    if sweet["quantity"] <= 0:
        raise HTTPException(status_code=400, detail="Sweet out of stock")
    
    await db.sweets.update_one({"_id": ObjectId(sweet_id)}, {"$inc": {"quantity": -1}})
    return {"detail": "Purchase successful"}

# Restock a sweet (Admin only)
@router.post("/{sweet_id}/restock")
async def restock_sweet(sweet_id: str, amount: int, current_user=Depends(get_current_admin)):
    if amount <= 0:
        raise HTTPException(status_code=400, detail="Amount must be positive")
    sweet = await db.sweets.find_one({"_id": ObjectId(sweet_id)})
    if not sweet:
        raise HTTPException(status_code=404, detail="Sweet not found")
    
    await db.sweets.update_one({"_id": ObjectId(sweet_id)}, {"$inc": {"quantity": amount}})
    return {"detail": f"Restocked {amount} units successfully"}
