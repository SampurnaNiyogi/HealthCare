from dotenv import load_dotenv
import os

# Load environment variables from .env
load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
USER_DB = os.getenv("USER_DB")
COMMUNITY_DB = os.getenv("COMMUNITY_DB")



if not MONGO_URI or not USER_DB:
    raise ValueError("MongoDB environment variables are missing!")
