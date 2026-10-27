import os
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from database import chat_collection
from pydantic import BaseModel
from ai import generate_ai_response
from dotenv import load_dotenv

from ai_service import ask_ai

load_dotenv()

app = FastAPI(
    title="AI Smart Farming Assistant",
    version="1.0.0"
)

default_origins = "http://localhost:5173,http://127.0.0.1:5173"
frontend_urls = os.getenv("FRONTEND_URL", default_origins)
allow_origins = [origin.strip() for origin in frontend_urls.split(",") if origin.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allow_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request model
class ChatRequest(BaseModel):
    message: str

# Home route
@app.get("/")
def home():
    return {
        "message": "AI Smart Farming Assistant Backend Running"
    }

# Chat route
@app.post("/chat")
async def chat(request: ChatRequest):

    user_message = request.message

    ai_response = generate_ai_response(user_message)

    # Save chat in MongoDB
    chat_collection.insert_one(
        {
            "question": user_message,
            "answer": ai_response
        }
    )

    return {
        "reply": ai_response
    }

@app.get("/history")
async def get_chat_history():

    chats = chat_collection.find()

    history = []

    for chat in chats:
        history.append({
            "question": chat["question"],
            "answer": chat["answer"]
        })

    return history