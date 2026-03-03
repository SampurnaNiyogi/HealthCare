from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_qdrant import QdrantVectorStore
from qdrant_client import QdrantClient
from langchain.schema import Document
from dotenv import load_dotenv
from pdf2image import convert_from_path
import pytesseract
import os

# ---------------------------
# Load environment variables
# ---------------------------
# backend/vector_pipeline.py

# ... (keep all your imports at the top)

# ---------------------------
# Load environment variables
# ---------------------------
load_dotenv()
OPENAI_API_KEY = os.getenv("OPEN_API_KEY")
if not OPENAI_API_KEY:
    raise ValueError("OPENAI_API_KEY environment variable is not set.")
print(f"[INFO] Loaded OpenAI API Key")

# ---------------------------
# DYNAMICALLY FIND PATIENT PDF FILES (THIS IS THE FIX)
# ---------------------------
# Get the absolute path of the directory where this script is located
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# Construct the path to the 'records' folder
RECORDS_FOLDER = os.path.join(BASE_DIR, "records")

# Find all files in the records folder that end with .pdf
patient_pdf_list = [
    "D:\Sampurna\HackHeritage2k25\\backend\\records\TestReport1.pdf",
    "D:\Sampurna\HackHeritage2k25\\backend\\records\TestReport2.pdf",
    "D:\Sampurna\HackHeritage2k25\\backend\\records\TestReport3.pdf"
]
if os.path.exists(RECORDS_FOLDER):
    patient_pdf_list = [
        os.path.join(RECORDS_FOLDER, f) 
        for f in os.listdir(RECORDS_FOLDER) if f.lower().endswith(".pdf")
    ]
else:
    print(f"[ERROR] The directory was not found: {RECORDS_FOLDER}")

print(f"[INFO] Found PDF files to process: {patient_pdf_list}")

# ---------------------------
# Initialize Qdrant client
# ... (the rest of your file remains the same)
# ---------------------------
# ---------------------------
# Initialize Qdrant client
# ---------------------------
client = QdrantClient(url="http://localhost:6333")

# ---------------------------
# Function to extract text using OCR
# ---------------------------
def extract_text_with_ocr(pdf_file):
    try:
        images = convert_from_path(pdf_file)
        text = ""
        for image in images:
            text += pytesseract.image_to_string(image)
        return text.strip()
    except Exception as e:
        print(f"[ERROR] OCR failed for {pdf_file}: {e}")
        return ""

# ---------------------------
# Load all documents
# OCR first, then PyPDFLoader
# ---------------------------
def load_documents(pdf_files):
    all_docs = []
    for pdf_file in pdf_files:
        try:
            print(f"[INFO] Processing file: {pdf_file}")
            # Try OCR first
            ocr_text = extract_text_with_ocr(pdf_file)
            if ocr_text:
                all_docs.append(Document(page_content=ocr_text, metadata={"source": pdf_file, "method": "ocr"}))
                print(f"[INFO] OCR succeeded for {pdf_file}")
                continue  # Skip PDFLoader if OCR worked

            # Fallback to PyPDFLoader
            loader = PyPDFLoader(pdf_file)
            docs = loader.load()
            all_docs.extend(docs)
            print(f"[INFO] PyPDFLoader extracted {len(docs)} document(s) from {pdf_file}")

        except Exception as e:
            print(f"[ERROR] Failed to load {pdf_file}: {e}")

    if not all_docs:
        raise ValueError("[ERROR] No documents were loaded. Check PDF paths or content.")

    print(f"[INFO] Total documents loaded: {len(all_docs)}")
    return all_docs

# ---------------------------
# Process PDFs: split -> embeddings -> vector store
# ---------------------------
def process_pdf(docs):
    try:
        # Split documents into chunks
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
        split_docs = text_splitter.split_documents(docs)
        if not split_docs:
            raise ValueError("No text chunks were created.")
        print(f"[INFO] Total chunks created: {len(split_docs)}")
    except Exception as e:
        raise RuntimeError(f"[ERROR] Failed to split documents: {e}")

    try:
        # Initialize embedding model
        embedding_model = OpenAIEmbeddings(model="text-embedding-ada-002", openai_api_key=OPENAI_API_KEY)
    except Exception as e:
        raise RuntimeError(f"[ERROR] Failed to initialize embeddings: {e}")

    try:
        # Store chunks in Qdrant
        vector_store = QdrantVectorStore.from_documents(
            documents=split_docs,
            embedding=embedding_model,
            url="http://localhost:6333",
            collection_name="patient_medical_records"
        )
        print("[INFO] Vector store created successfully")
        return vector_store
    except Exception as e:
        raise RuntimeError(f"[ERROR] Failed to store documents in Qdrant: {e}")

# ---------------------------
# Run the pipeline
# ---------------------------
