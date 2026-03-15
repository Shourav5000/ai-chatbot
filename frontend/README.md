# AI Chatbot — LLM Integration

A full-stack AI chatbot built with Python (Flask) and React, powered by Anthropic's Claude API.

## Live Demo
- **Frontend:** https://Shourav5000.github.io/ai-chatbot
- **Backend:** https://ai-chatbot-agb2.onrender.com

## Architecture
```
Browser (React) → POST /chat → Flask (Python) → Anthropic Claude API
```

## Tech Stack
- **Frontend:** React, CSS, GitHub Pages
- **Backend:** Python, Flask, Render
- **AI Model:** Anthropic Claude (claude-sonnet-4-6)
- **Security:** API key stored server-side via environment variables

## Features
- Real-time AI chat with conversation memory
- Outfit and sizing recommendations
- FAQ handling for shipping and returns
- Order tracking support
- Secure architecture — API key never exposed to browser
- Fully deployed frontend + backend

## Local Setup

### Backend
```bash
pip install flask flask-cors anthropic python-dotenv
```
Create `.env`:
```
ANTHROPIC_API_KEY=your-key-here
```
```bash
python chatbot.py
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## Deployment
- **Frontend** deployed on GitHub Pages via `gh-pages`
- **Backend** deployed on Render (auto-deploys on push to main)