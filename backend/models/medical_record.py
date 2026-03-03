# backend/models/medical_record.py
from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class MedicalRecordIn(BaseModel):
    """Model for prescription/medical record upload request."""
    profile_id: str        # Link record to user’s profile
    file_name: str         # Original file name

class MedicalRecordDB(BaseModel):
    """Model for a stored medical record in MongoDB."""
    id: str = Field(..., alias="_id")
    profile_id: str
    file_name: str
    gridfs_id: str         # GridFS file reference
    content_type: str
    uploaded_at: datetime

    class Config:
        populate_by_name = True

class MedicalRecordOut(BaseModel):
    """Model for listing prescriptions back to frontend."""
    file_id: str
    file_name: str
    uploaded_at: datetime
