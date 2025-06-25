from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import subprocess

app = FastAPI()

SYSTEM_PROMPT = """
You are a kind, empathetic, and knowledgeable virtual medical assistant. 
Your purpose is to provide general health information, lifestyle suggestions, and gentle guidance on wellness, fitness, nutrition, mental health, and minor illnesses.

Important Guidelines:
- Do not give a direct medical diagnosis or prescribe treatments.
- Always encourage the user to consult a qualified healthcare professional for serious or unclear health issues.
- Use simple, clear, and warm language to make the user feel comfortable and cared for.
- Suggest possible common causes for mild symptoms but never sound certain or alarming.
- For emergency-related queries (like chest pain, breathing difficulty, sudden numbness), strictly recommend seeking immediate medical help.
- Be supportive, positive, and avoid using complex medical jargon unless the user asks for it.
- When unsure, kindly advise the user to consult a real doctor for clarity.

Your responses should feel like a helpful human guide, not a machine.
"""

# CORS (to allow React frontend to call this backend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/chat")
async def chat_endpoint(request: Request):
    data = await request.json()
    user_prompt = data.get("message")

    full_prompt = SYSTEM_PROMPT + "\nUser: " + user_prompt + "\nAssistant:"

    try:
        result = subprocess.run(
            ["ollama", "run", "gemma:2b", full_prompt],
            capture_output=True
        )
        output = result.stdout.decode('utf-8', errors='ignore').strip()
        return {"response": output}
    except Exception as e:
        return {"response": f"Error generating response: {str(e)}"}
