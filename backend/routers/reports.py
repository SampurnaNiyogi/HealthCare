# backend/routers/reports.py

from typing import Literal, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from datetime import date, datetime, timezone
from pymongo.collection import Collection
from models.report import ReportCreate, ReportResponse, ReportUpdate, PaginatedReportResponse
from db import get_reports_collection
from utils.id_generator import generate_report_id
from utils.sms_service import sms_sender
from bson import ObjectId

# CHANGE: Import the get_current_user dependency
from routers.auth import get_current_user

router = APIRouter(prefix="/reports", tags=["Reports"])


# Create a report
@router.post("/create", response_model=ReportResponse, status_code=status.HTTP_201_CREATED)
def create_report(
    report: ReportCreate, 
    reports: Collection = Depends(get_reports_collection),
    # CHANGE: Add dependency to get the currently authenticated user
    current_user: dict = Depends(get_current_user)
):
    # Generate unique report ID
    report_id = generate_report_id()
    
    # Prepare report dictionary for MongoDB
    report_dict = report.dict()
    report_dict["report_id"] = report_id
    
    # CHANGE: Automatically set the user_id from the authenticated user's token
    report_dict["user_id"] = current_user.get("user_id")
    
    report_dict["created_at"] = datetime.now(timezone.utc)
    report_dict["status"] = "Pending"
    
    # Insert into MongoDB
    try:
        reports.insert_one(report_dict)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to insert report: {str(e)}")
    
    # Send SMS notification to reporter
    reporter_phone = str(report_dict["phone_number"])
    reporter_name = report_dict["reporter_name"]
    message = f"Hello {reporter_name}, your report {report_id} has been submitted successfully. Status: Pending."
    sms_result = sms_sender(reporter_phone, message)
    
    # Include SMS result in the response
    response = report_dict.copy()
    response["sms_status"] = sms_result
    
    return response

@router.patch("/update/{report_id}/status", status_code=status.HTTP_200_OK)
def update_report_status(
    report_id: str,
    status_update: ReportUpdate,
    reports: Collection = Depends(get_reports_collection)
):
    # Fetch the report
    stored = reports.find_one({"report_id": report_id})
    if not stored:
        raise HTTPException(status_code=404, detail="Report not found")
    
    # Prepare update data
    update_data = {
        "status": status_update.status,
        "updated_at": datetime.utcnow()
    }
    
    if status_update.status == "Resolved":
        update_data["resolved_at"] = datetime.utcnow()
    
    if status_update.resolved_by:
        update_data["resolved_by"] = status_update.resolved_by
    
    # Update MongoDB
    reports.update_one({"report_id": report_id}, {"$set": update_data})
    
    # Prepare SMS message based on status
    reporter_phone = str(stored.get("phone_number"))
    reporter_name = stored.get("reporter_name")
    message = f"Hello {reporter_name}, your report {report_id} status has been updated to '{status_update.status}'."
    
    if status_update.status == "In Progress" and status_update.resolved_by:
        message = f"Hello {reporter_name}, your report {report_id} is being handled by {status_update.resolved_by}."
    
    if status_update.status == "Resolved" and status_update.resolved_by:
        resolved_time = datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")
        message = f"Hello {reporter_name}, your report {report_id} has been resolved by {status_update.resolved_by} at {resolved_time}."
    
    # Send SMS
    sms_result = sms_sender(reporter_phone, message)
    
    return {
        "message": f"Report {report_id} status updated successfully to '{status_update.status}'.",
        "sms_status": sms_result
    }




def serialize_report(report):
    report["_id"] = str(report["_id"])
    return report

@router.get("/", response_model=PaginatedReportResponse, status_code=status.HTTP_200_OK)
def get_all_reports(
    # CHANGE: Add user_id as a filter option
    user_id: Optional[str] = Query(None, description="Filter reports by user ID"),
    status: Optional[Literal["Pending", "In Progress", "Resolved"]] = Query(None, description="Filter by report status"),
    category: Optional[str] = Query(None, description="Filter by report category"),
    reporter_phone: Optional[str] = Query(None, description="Filter by reporter phone"),
    start_date: Optional[date] = Query(None, description="Start date (YYYY-MM-DD)"),
    end_date: Optional[date] = Query(None, description="End date (YYYY-MM-DD)"),
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    reports: Collection = Depends(get_reports_collection)
):
    # Build filters
    filter_query = {}
    if user_id:
        filter_query["user_id"] = user_id
    if status:
        filter_query["status"] = status
    if category:
        filter_query["category"] = category
    if reporter_phone:
        filter_query["phone_number"] = reporter_phone
    if start_date or end_date:
        date_query = {}
        if start_date:
            date_query["$gte"] = datetime.combine(start_date, datetime.min.time())
        if end_date:
            date_query["$lte"] = datetime.combine(end_date, datetime.max.time())
        filter_query["report_date"] = date_query

    # Count
    total_count = reports.count_documents(filter_query)

    # Fetch
    cursor = reports.find(filter_query).sort("created_at", -1).skip((page - 1) * limit).limit(limit)
    results = [serialize_report(r) for r in cursor]

    return {
        "total_count": total_count,
        "page": page,
        "limit": limit,
        "data": results
    }