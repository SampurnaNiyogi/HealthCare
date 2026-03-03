# app/db.py
from pymongo import MongoClient
from core.config import MONGO_URI, USER_DB, COMMUNITY_DB

# Initialize a single MongoDB client for the app
client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)

try:
    client.admin.command('ping')
    print("Pinged your deployment. Successfully connected to MongoDB!")
except Exception as e:
    print("MongoDB connection failed:", e)

# Databases
user_db = client[USER_DB]
community_db = client[COMMUNITY_DB]



# Collections
user_col = user_db["Users"]
report_col = community_db["Report"]
profiles_col = user_db["profiles"]
medical_records_col = user_db["medical_records"]

# Dependency function for FastAPI (if needed)
def get_user_db():
    try:
        yield user_db
    finally:
        pass  # Do not close client; reuse for the app lifetime

def get_user_collection():
    return user_col

def get_reports_collection():
    return report_col


def get_profiles_collection():
    return profiles_col

def get_medical_records_collection():
    return medical_records_col

def get_prescription_collection():
    return community_db["prescriptions"]