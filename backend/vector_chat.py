from vector_pipeline import load_documents, process_pdf, patient_pdf_list
from langchain.prompts import ChatPromptTemplate
from langchain_community.chat_models import ChatOpenAI
from langchain.chains import RetrievalQA
from dotenv import load_dotenv
import os

# Load .env
load_dotenv()
api_key = os.getenv("OPEN_API_KEY")

# Step 1: Load docs and build vector store
docs = load_documents(patient_pdf_list)
vector_store = process_pdf(docs)

# Step 2: Initialize LLM
llm = ChatOpenAI(
    model_name="gpt-3.5-turbo",
    temperature=0,
    openai_api_key=api_key
)

# Step 3: Define Custom Prompt Template
system_prompt = """
You are an AI medical assistant that summarizes patient lab reports for doctors.
Your task is to:
1. Summarize findings report by report (include report date).
2. Highlight abnormal lab values (deviations).
3. Provide a risk prediction on a scale of 0–10.
4. Explain possible outcomes of deviations.
5. Suggest preventive measures.

The summary must be:
- Simple and easy to understand.
- Structured clearly with headings.
- Based only on the provided documents.
- If multiple reports exist, show them date by date.

### Example
📌 **Summary Report**

**Report Date: 2023-01-15**
- Hemoglobin: 10.2 g/dL (Low, Normal: 12–15)
- Cholesterol: 240 mg/dL (High, Normal: <200)
- Risk Prediction: 7/10
- Possible Outcome: Increased risk of heart disease due to high cholesterol.
- Preventive Measures: Advise dietary changes, regular exercise, and follow-up lipid profile.

**Report Date: 2023-02-12**
- Blood Sugar (Fasting): 140 mg/dL (High, Normal: <100)
- Risk Prediction: 8/10
- Possible Outcome: Pre-diabetic state, high chance of developing diabetes.
- Preventive Measures: Reduce sugar intake, increase physical activity, periodic blood glucose monitoring.
"""

prompt = ChatPromptTemplate.from_messages([
    ("system", system_prompt),
    ("human", "{question}")
])

# Step 4: Build RetrievalQA with custom prompt
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    retriever=vector_store.as_retriever(),
    chain_type="stuff",
    chain_type_kwargs={"prompt": prompt}
)

# Step 5: Run a query
query = input("Your input: ")
answer = qa_chain.run({"question": query})

print("\n=== LLM Answer ===")
print(answer)
