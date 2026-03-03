# backend/routers/auth.py
from fastapi import APIRouter, HTTPException, status, Depends
from models.authModels import SendOTPRequest, VerifyOTPRequest
from twilio.rest import Client
import os
from pymongo.collection import Collection
from db import get_user_collection, get_profiles_collection
from datetime import datetime
from fastapi.security import OAuth2PasswordBearer
from bson import ObjectId

auth_router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="verify-otp")

# Twilio client initialization
client = Client(os.getenv("TWILIO_ACCOUNT_SID"), os.getenv("TWILIO_AUTH_TOKEN"))
verify_sid = os.getenv("TWILIO_VERIFY_SID")


@auth_router.post("/send-otp")
def send_otp(req: SendOTPRequest):
    try:
        verification = client.verify.v2.services(verify_sid) \
            .verifications \
            .create(to=req.phone_number, channel='sms')
        return {"status": verification.status}
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@auth_router.post("/verify-otp")
def verify_otp(
    req: VerifyOTPRequest,
    users_col: Collection = Depends(get_user_collection),
    profiles_col: Collection = Depends(get_profiles_collection)
):
    try:
        verification_check = client.verify.v2.services(verify_sid) \
            .verification_checks \
            .create(to=req.phone_number, code=req.otp)

        if verification_check.status == "approved":
            user_doc = users_col.find_one({"phone": req.phone_number})

            if user_doc:
                return {"status": "success", "uid": str(user_doc["_id"]), "phone": req.phone_number}
            else:
                # Create a new user and profile
                new_user_data = {
                    "abha_no": "DEMO1234567890",
                    "phone": req.phone_number,
                    "profile_id": None, # Will be updated after profile creation
                    "created_at": datetime.utcnow()
                }
                user_result = users_col.insert_one(new_user_data)
                user_id = user_result.inserted_id

                new_profile = {
                    "user_id": str(user_id),
                    "full_name": "New User",
                    "chronic_conditions": [],
                    "medical_records": []
                }
                profile_result = profiles_col.insert_one(new_profile)

                users_col.update_one(
                    {"_id": user_id},
                    {"$set": {"profile_id": str(profile_result.inserted_id)}}
                )

                return {"status": "Newsuccess", "uid": str(user_id), "phone": req.phone_number}
        else:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid OTP")

    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

def get_current_user(token: str = Depends(oauth2_scheme), users_col: Collection = Depends(get_user_collection)):
    """
    Resolve the bearer token to a user document.
    The token is treated as either:
      - a string ObjectId of the user document (_id), or
      - the phone number stored in the user document.
    Returns a minimal dict with uid, user_id and phone for downstream use.
    Raises 401 if not found/invalid.
    """
    try:
        user_doc = None
        # try ObjectId match first
        if token and ObjectId.is_valid(token):
            user_doc = users_col.find_one({"_id": ObjectId(token)})

        # fallback: match by phone
        if not user_doc and token:
            user_doc = users_col.find_one({"phone": token})

        # final fallback: match by explicit uid field if present
        if not user_doc and token:
            user_doc = users_col.find_one({"uid": token})

        if not user_doc:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid authentication credentials")

        return {
            "uid": str(user_doc["_id"]),
            "user_id": str(user_doc["_id"]),
            "phone": user_doc.get("phone")
        }
    except HTTPException:
        raise
    except Exception:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid authentication credentials")