from twilio.rest import Client

import os
from  dotenv import load_dotenv
load_dotenv()
# backend/utils/scheduler.py
from apscheduler.schedulers.background import BackgroundScheduler
from pymongo import MongoClient
from core.config import MONGO_URI, COMMUNITY_DB
from datetime import datetime
TWILIO_ACCOUNT_SID = os.getenv('TWILIO_ACCOUNT_SID')
TWILIO_AUTH_TOKEN = os.getenv('TWILIO_AUTH_TOKEN')

TWILIO_PHONE_NUMBER = os.getenv('TWILIO_PHONE_NUMBER')
MESSAGE_SERVICE_SID = os.getenv('MESSAGE_SERVICE_SID')

client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)


def sms_sender(to_phone: str, message: str):
    try:
        message = client.messages.create(
            body = message,
            from_=TWILIO_PHONE_NUMBER,
            to=to_phone
        )
        return {"status": "success", "message_sid": message.sid}
    except Exception as e:
        return {"status": "error", "error": str(e)}
    
# def notification_sender(to_phone: str, message_to_share: str):
    
#     account_sid = TWILIO_ACCOUNT_SID
#     auth_token = TWILIO_AUTH_TOKEN
#     client = Client(account_sid, auth_token)
#     message = client.messages.create(
#     messaging_service_sid=MESSAGE_SERVICE_SID,
#     body=message_to_share,
#     send_at=datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
#     schedule_type='fixed',
#     to=to_phone
#     )
#     print(message.sid)

def send_due_reminders():
    """Checks for reminders scheduled for the current minute and sends them."""
    client = MongoClient(MONGO_URI)
    db = client[COMMUNITY_DB]
    reminders_col = db["pill_reminders"]
    
    # Check for reminders matching the current time (HH:MM)
    now = datetime.now().strftime("%H:%M")
    reminders_to_send = reminders_col.find({"time": now})

    for reminder in reminders_to_send:
        message = f"💊 Reminder: It's time to take your {reminder['pill_name']}."
        sms_sender(to_phone=reminder['phone'], message=message)
        print(f"Sent reminder for {reminder['pill_name']} to {reminder['phone']}")

def start_scheduler():
    """Initializes and starts the background scheduler."""
    scheduler = BackgroundScheduler()
    # This job will run every minute to check for due reminders
    scheduler.add_job(send_due_reminders, 'interval', minutes=1)
    scheduler.start()