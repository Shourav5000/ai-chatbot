import { useState, useRef, useEffect } from 'react';
import './ChatWindow.css';

const SUGGESTIONS = [
  'Help me find a gala outfit',
  'What is your return policy?',
  'I need help with sizing',
  'Tell me about new arrivals',
];

export default function ChatWindow() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Bonjour, and welcome. I'm Élise, your personal style assistant. Whether you're searching for the perfect piece, need sizing guidance, or have questions about your order — I'm here to help. How may I assist you today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async (text) => {
    const userText = text || input.trim();
    if (!userText || loading) return;

    setInput('');
    setShowSuggestions(false);
    const newMessages = [...messages, { role: 'user', content: userText }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await fetch('https://ai-chatbot-agb2.onrender.com/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'My apologies — there seems to be a connection issue. Please ensure the server is running.',
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-shell">
      <div className="chat-header">
        <div className="header-avatar">É</div>
        <div className="header-info">
          <h1>Élise</h1>
          <span>Personal Style Assistant</span>
        </div>
        <div className="status-dot" />
      </div>

      <div className="messages-area">
        <div className="date-label">Today</div>
        {messages.map((msg, i) => (
          <div key={i} className={`msg ${msg.role === 'assistant' ? 'bot' : 'user'}`}>
            {msg.role === 'assistant' && <div className="msg-avatar">É</div>}
            <div className={`bubble ${msg.role === 'assistant' ? 'bot-bubble' : 'user-bubble'}`}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="msg bot">
            <div className="msg-avatar">É</div>
            <div className="bubble bot-bubble typing">
              <span /><span /><span />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {showSuggestions && (
        <div className="suggestions">
          {SUGGESTIONS.map(s => (
            <button key={s} className="pill-btn" onClick={() => sendMessage(s)}>{s}</button>
          ))}
        </div>
      )}

      <div className="input-row">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          placeholder="Message Élise..."
          disabled={loading}
        />
        <button className="send-btn" onClick={() => sendMessage()} disabled={loading}>
          <svg viewBox="0 0 24 24" fill="white" width="16" height="16">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
          </svg>
        </button>
      </div>
    </div>
  );
}