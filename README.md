# AI Chatbot — Personal Style Assistant

A full-stack AI chatbot built with Python + React for a luxury fashion boutique.

## Tech Stack
- **Frontend:** React, CSS
- **Backend:** Python, Flask
- **AI Model:** Anthropic Claude (claude-sonnet-4-6)

## Architecture
```
Browser (React :3000) → POST /chat → Flask (:5000) → Anthropic API
```

## Setup & Run

### Backend
```bash
pip install flask flask-cors anthropic python-dotenv
```
Create a `.env` file:
```
ANTHROPIC_API_KEY=your-key-here
```
```bash
py chatbot.py
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## Features
- Real-time AI chat with conversation memory
- Outfit and sizing recommendations
- FAQ handling for shipping and returns
- Order tracking support
- API key secured server-side — never exposed to the browser