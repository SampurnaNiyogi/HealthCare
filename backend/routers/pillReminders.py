# backend/routers/pill_reminder.py
from fastapi import APIRouter, Depends, status
from pymongo.collection import Collection
from models.pill_reminder import PillReminder
from db import community_db
from datetime import datetime

pill_router = APIRouter(prefix="/reminders", tags=["Pill Reminders"])

def get_reminders_collection():
    """Dependency to get the pill_reminders collection."""
    return community_db["pill_reminders"]

@pill_router.post("/create", status_code=status.HTTP_201_CREATED)
def create_pill_reminder(
    reminder: PillReminder,
    reminders_col: Collection = Depends(get_reminders_collection)
):
    """Saves a new pill reminder to the database."""
    reminder_dict = reminder.dict()
    reminder_dict["created_at"] = datetime.utcnow()
    reminders_col.insert_one(reminder_dict)
    return {"message": "Pill reminder created successfully."}

@pill_router.get("/list/{phone_number}")
def list_pill_reminders(
    phone_number: str,
    reminders_col: Collection = Depends(get_reminders_collection)
):
    """Lists all pill reminders for a given phone number."""
    # Ensure phone number has the '+' prefix for consistency
    if not phone_number.startswith('+'):
        phone_number = f"+{phone_number}"
        
    reminders = reminders_col.find({"phone": phone_number})
    # Convert documents to a list of PillReminder models
    return [PillReminder(**r) for r in reminders]