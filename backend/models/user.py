from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class UserDB(BaseModel):
    id: str = Field(..., alias="_id")
    abha_no: str
    phone: str
    email: Optional[str] = None
    profile_id: str
    created_at: datetime

    class Config:
        populate_by_name = True