# backend/routers/prescription.py
from fastapi import APIRouter, UploadFile, File, HTTPException, Depends, Path, Form
from fastapi.responses import StreamingResponse
from pymongo.collection import Collection
from db import get_prescription_collection, get_profiles_collection
from datetime import datetime
from bson import ObjectId
import gridfs
import re

from models.medical_record import MedicalRecordOut

prescription_router = APIRouter()

# ✅ Upload Prescription
@prescription_router.post("/upload-prescription", response_model=MedicalRecordOut)
async def upload_prescription(
    profile_id: str | None = Form(None),
    phone: str | None = Form(None),
    file: UploadFile = File(...),
    prescriptions_col: Collection = Depends(get_prescription_collection),
    profiles_col: Collection = Depends(get_profiles_collection)
):
    try:
        # Resolve profile_id via phone if profile_id not provided
        if not profile_id:
            if not phone:
                raise HTTPException(status_code=400, detail="Either profile_id or phone is required")
            phone_norm = re.sub(r"\D", "", phone)
            profile_doc = profiles_col.find_one({"phone": phone})
            if not profile_doc and phone_norm:
                profile_doc = profiles_col.find_one({"phone": {"$regex": f"{phone_norm}$"}})
            if not profile_doc:
                raise HTTPException(status_code=404, detail="Profile not found for provided phone")
            profile_id = str(profile_doc.get("_id"))

        db = prescriptions_col.database
        fs = gridfs.GridFS(db)

        # Save file in GridFS
        file_id = fs.put(file.file, filename=file.filename, content_type=file.content_type)

        # Save metadata in prescriptions collection
        prescription_doc = {
            "profile_id": profile_id,
            "file_name": file.filename,
            "content_type": file.content_type,
            "gridfs_id": str(file_id),
            "uploaded_at": datetime.utcnow()
        }
        prescriptions_col.insert_one(prescription_doc)

        return MedicalRecordOut(
            file_id=str(file_id),
            file_name=file.filename,
            uploaded_at=prescription_doc["uploaded_at"]
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ✅ Get Prescription (download/view)
@prescription_router.get("/get-prescription/{file_id}")
async def get_prescription(
    file_id: str = Path(...),
    prescriptions_col: Collection = Depends(get_prescription_collection)
):
    try:
        db = prescriptions_col.database
        fs = gridfs.GridFS(db)

        file_obj = fs.get(ObjectId(file_id))
        return StreamingResponse(
            file_obj,
            media_type=file_obj.content_type,
            headers={"Content-Disposition": f"inline; filename={file_obj.filename}"}
        )
    except Exception:
        raise HTTPException(status_code=404, detail="Prescription not found")


# ✅ List Prescriptions for a Profile
@prescription_router.get("/list-prescriptions/{profile_id}", response_model=list[MedicalRecordOut])
async def list_prescriptions(
    profile_id: str,
    prescriptions_col: Collection = Depends(get_prescription_collection)
):
    records = prescriptions_col.find({"profile_id": profile_id})
    return [
        MedicalRecordOut(
            file_id=rec["gridfs_id"],
            file_name=rec["file_name"],
            uploaded_at=rec["uploaded_at"]
        )
        for rec in records
    ]
