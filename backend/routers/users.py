from fastapi import APIRouter, Depends, HTTPException, status
from pymongo.collection import Collection
from db import get_profiles_collection
from routers.auth import get_current_user
from models.profile import ProfileDB
from bson import ObjectId
profile_router = APIRouter(prefix="/users", tags=["Users"])

# Helper function to convert ObjectId to str
def convert_objectid_to_str(v):
    if isinstance(v, ObjectId):
        return str(v)
    return v

@profile_router.get("/me", response_model=ProfileDB)
def get_my_profile(
    current_user: dict = Depends(get_current_user),
    profiles_col: Collection = Depends(get_profiles_collection)
):
    """
    Fetches the profile of the currently logged-in user.
    """
    print("Current user:", current_user)

    queries = []

    # Try matching profile.user_id against user_id/uid
    if current_user.get("user_id"):
        queries.append({"user_id": current_user["user_id"]})
    if current_user.get("uid"):
        queries.append({"user_id": current_user["uid"]})
        queries.append({"uid": current_user["uid"]})  # also check uid field inside profile

    # Also try phone match if available
    if current_user.get("phone"):
        queries.append({"phone": current_user["phone"]})

    final_query = {"$or": queries} if len(queries) > 1 else (queries[0] if queries else {})

    profile_doc = profiles_col.find_one(final_query)

    if not profile_doc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Profile not found for query: {final_query}"
        )

    profile_doc = dict(profile_doc)
    profile_doc['id'] = convert_objectid_to_str(profile_doc.pop('_id', None))

    # Ensure all required fields for ProfileDB are present
    for field in ProfileDB.__fields__:
        if field not in profile_doc:
            profile_doc[field] = None

    return ProfileDB(**profile_doc)
