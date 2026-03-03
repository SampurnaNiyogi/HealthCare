from pydantic import BaseModel
class VerifyOTPRequest(BaseModel):
    id_token: str