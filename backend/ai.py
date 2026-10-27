import os
from dotenv import load_dotenv
from google import genai


# Load environment variables
load_dotenv()


# Gemini API Key
API_KEY = os.getenv("GEMINI_API_KEY")


# Gemini client
client = genai.Client(api_key=API_KEY)


def generate_ai_response(user_message):

    try:
        prompt = f"""
You are an expert agricultural AI assistant.

You help Indian farmers with:
- Crop cultivation
- Fertilizers
- Irrigation
- Plant diseases
- Pest control
- Organic farming
- Farming techniques

Give practical and simple answers.

Farmer Question:
{user_message}

Answer:
"""

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )

        return response.text


    except Exception as e:
        print("Gemini Error:", e)
        return "Sorry, I am unable to generate a response right now."