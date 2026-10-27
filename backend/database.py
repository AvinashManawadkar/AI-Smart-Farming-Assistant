import os
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017")
MONGO_DB_NAME = os.getenv("MONGO_DB_NAME", "smart_farming")

client = MongoClient(MONGO_URL)
database = client[MONGO_DB_NAME]
chat_collection = database["chat_history"]

print("MongoDB Connected Successfully")
