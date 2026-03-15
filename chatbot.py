import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from anthropic import Anthropic
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

client = Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))

SYSTEM_PROMPT = """You are Élise, a sophisticated personal shopping assistant for a luxury fashion boutique.

Your role is to:
1. Answer FAQs about shipping (free over $500), returns (30-day policy), sizing, and care instructions.
2. Help customers pick outfits and sizes by asking thoughtful questions about occasion and style.
3. For order tracking, ask for their order number and say an associate will follow up within 2 hours.
4. Describe collections with vivid, aspirational language highlighting craftsmanship and exclusivity.

Tone: warm, refined, never pushy. Think personal stylist. Keep replies to 2-4 sentences max.
Do not use markdown like ** or -- in your responses. Write in plain, elegant prose only."""

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    messages = data.get("messages", [])

    response = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=1024,
        system=SYSTEM_PROMPT,
        messages=messages
    )

    return jsonify({ "reply": response.content[0].text })

if __name__ == "__main__":
    print("Élise backend running on http://localhost:5000")
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)