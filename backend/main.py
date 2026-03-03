# backend/main.py
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from routers import reports, users, medical_records, auth, prescription, pillReminders # Import the new routers
from utils.sms_service import start_scheduler
from vector_pipeline import load_documents, process_pdf, patient_pdf_list
import os
from langchain_community.chat_models import ChatOpenAI
from langchain.chains import RetrievalQA

from vector_pipeline import process_pdf, load_documents, patient_pdf_list
from dotenv import load_dotenv
load_dotenv()
api_key = os.getenv("OPEN_API_KEY")

app = FastAPI(title="Health Bridge API")
origins = [
    "http://localhost:5173", 
]


class QueryRequest(BaseModel):
    query: str

qa_chain = None

    
    
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], # Allows all methods (GET, POST, etc.)
    allow_headers=["*"], # Allows all headers
)


@app.on_event("startup")
async def startup_event():
    start_scheduler()
    """
    This function will run once when the server starts.
    It loads all the documents and prepares the QA chain.
    This is efficient because we don't reload the data for every request.
    """
    global qa_chain
    print("[INFO] Server starting up...")
    
    # 1. Load documents and build the vector store from your pipeline
    print("[INFO] Loading documents and creating vector store...")
    docs = load_documents(patient_pdf_list)
    vector_store = process_pdf(docs)
    
    # 2. Initialize the Language Model
    llm = ChatOpenAI(model_name="gpt-3.5-turbo", temperature=0, openai_api_key=api_key)
    
    # 3. Build the RetrievalQA chain
    qa_chain = RetrievalQA.from_chain_type(
        llm=llm,
        retriever=vector_store.as_retriever(),
        chain_type="stuff"
    )
    print("[INFO] QA Chain is ready to receive requests.")
    
    
    
@app.post("/summarize")
def get_summary(request: QueryRequest):
    """
    This is the main endpoint that the frontend will call.
    It takes a user's query, runs it through the QA chain, and returns the answer.
    """
    if not qa_chain:
        return {"error": "The QA Chain is not ready yet. Please try again in a moment."}
    
    try:
        # The user's input is in request.query
        answer = qa_chain.run(request.query)
        return {"summary": answer}
    except Exception as e:
        return {"error": f"An error occurred while processing the request: {str(e)}"}




# Include each router only once
app.include_router(auth.auth_router, tags=["Authentication"])
app.include_router(reports.router)
app.include_router(users.profile_router) 
app.include_router(medical_records.router) 
app.include_router(prescription.prescription_router)
app.include_router(pillReminders.pill_router)


@app.get("/")
def read_root():
    return {"message": "Welcome to the Health Bridge API"}