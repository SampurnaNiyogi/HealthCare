# utils/id_generator.py
from datetime import datetime
import uuid

def generate_report_id() -> str:
    """Generate a readable unique report ID like REP-2025-ABC123"""
    year = datetime.utcnow().year
    unique = str(uuid.uuid4())[:6].upper()
    return f"REP-{year}-{unique}"
