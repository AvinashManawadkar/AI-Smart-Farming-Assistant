import os
from dotenv import load_dotenv
from google import genai

# Load environment variables
load_dotenv()

# Create Gemini client
client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

# System prompt
SYSTEM_PROMPT = """
You are Smart Farming AI.

Your job is to help farmers.

Rules:

1. Always ask important questions before giving recommendations.
2. Ask about:
   - Crop
   - Location
   - Land size
   - Soil type
   - Irrigation
   - Farming season
3. Give practical advice.
4. Use simple language.
5. Never guess missing information.
6. Explain step by step.
7. If the farmer asks a general question, first collect the required details.
"""

def ask_ai(user_message):
    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=f"""
{SYSTEM_PROMPT}

Farmer:
{user_message}
"""
        )

        return response.text

    except Exception as e:
        return f"Error: {str(e)}"