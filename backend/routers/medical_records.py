from fastapi import APIRouter, Depends, HTTPException, status
from pymongo.collection import Collection
from bson import ObjectId
import base64
from datetime import datetime
from typing import List

# Import your models and dependencies
from models.medical_record import MedicalRecordIn, MedicalRecordDB, MedicalRecordOut
# from models.profile import ProfileDB
from db import get_profiles_collection, get_medical_records_collection
from routers.auth import get_current_user 

router = APIRouter(prefix="/profiles", tags=["Medical Records"])

@router.post("/{profile_id}/records", status_code=status.HTTP_201_CREATED)
def upload_medical_record(
    profile_id: str,
    record_data: MedicalRecordIn,
    current_user: dict = Depends(get_current_user),
    profiles_col: Collection = Depends(get_profiles_collection),
    medical_records_col: Collection = Depends(get_medical_records_collection)
):
    user_id = current_user.get("user_id")
    if not user_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized.")

    try:
        binary_data = base64.b64decode(record_data.file_data)
    except:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid Base64 data.")

    new_record = {
        "user_id": user_id,
        "file_name": record_data.file_name,
        "file_data": binary_data,
        "uploaded_at": datetime.utcnow()
    }

    record_result = medical_records_col.insert_one(new_record)
    return {"message": "Record uploaded successfully.", "record_id": str(record_result.inserted_id)}

@router.get("/{profile_id}/records", response_model=List[MedicalRecordDB])
def get_medical_records(
    profile_id: str,
    current_user: dict = Depends(get_current_user),
    profiles_col: Collection = Depends(get_profiles_collection),
    medical_records_col: Collection = Depends(get_medical_records_collection)
):
    """
    Retrieves a list of all medical records for the currently logged-in user.
    """
    user_id = current_user.get("user_id")
    if not user_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized.")

    records_cursor = medical_records_col.find(
        {"user_id": user_id},
        {"file_data": 0}  # Exclude the large binary data from the list response
    )
    
    # Prepare the list of records for the response model
    records = []
    for record in records_cursor:
        records.append(
            MedicalRecordOut(
                id=str(record["_id"]),
                file_name=record["file_name"],
                uploaded_at=record["uploaded_at"]
            )
        )
        
    return records