from pydantic import BaseModel, Field
from typing import Optional, List, Literal
from datetime import date, time, datetime
from pydantic_extra_types.phone_numbers import PhoneNumber 
from typing import Annotated
from bson import ObjectId
PyObjectId = Annotated[ObjectId, Field(description="MongoDB ObjectId")]
# Helper function to convert ObjectId to str
def convert_objectid_to_str(v):
    if isinstance(v, ObjectId):
        return str(v)
    return v

class ProfileDB(BaseModel):
    """Pydantic model representing a profile document in MongoDB."""
    id: str = Field(..., alias="_id")
    user_id: str
    full_name: str
    age: Optional[int] = None
    sex: Optional[str] = None
    marital_status: Optional[str]
    chronic_conditions: List[str] = Field(default_factory=list)
    medical_records: Annotated[List[str], Field(default_factory=list)] =  Field(default_factory=list)

    class Config:
        populate_by_name = True
        extra = "allow"
        json_encoders = {ObjectId: str}