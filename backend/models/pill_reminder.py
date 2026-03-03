from pydantic import BaseModel
class PillReminder(BaseModel):
    pill_name: str
    time: str   
    phone: str