import React, { useState } from "react";
import { askAI } from "../api";
import "../styles/ChatInput.css";

function ChatInput({ setMessages, isLoading, setIsLoading, externalMessage, setExternalMessage }) {
  const [inputMessage, setInputMessage] = useState("");

  // Quick chip shortcuts below input
  const quickChips = [
    "🌱 Best fertilizer for rice?",
    "🌧️ Rainfall advisory",
    "🐛 Cotton pest solution",
    "🧪 Organic compost recipe"
  ];

  const handleSend = async (messageToSend) => {
    const text = messageToSend || inputMessage;
    if (!text.trim() || isLoading) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Optimistically add User message
    setMessages((prev) => [
      ...prev,
      {
        user: text,
        ai: null,
        timestamp: timeStr
      }
    ]);

    setInputMessage("");
    if (setExternalMessage) setExternalMessage("");
    setIsLoading(true);

    try {
      const response = await askAI(text);
      const aiReply = response?.reply || "I am here to assist with your farming query. Please check back shortly.";

      setMessages((prev) => {
        const updated = [...prev];
        if (updated.length > 0) {
          updated[updated.length - 1].ai = aiReply;
        }
        return updated;
      });
    } catch (err) {
      console.error("Error communicating with AI server:", err);
      setMessages((prev) => {
        const updated = [...prev];
        if (updated.length > 0) {
          updated[updated.length - 1].ai = "⚠️ Unable to connect to the backend server. Please make sure the API is running and VITE_API_URL is set.";
        }
        return updated;
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chatinput-container">
      {/* Quick Chips Section */}
      <div className="chatinput-chips-row no-scrollbar">
        <span className="text-xs text-emerald-800 font-semibold flex-shrink-0 flex items-center gap-1">
          <span>⚡</span> Quick:
        </span>
        {quickChips.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(chip.replace(/^[^\s]+\s/, ""))}
            disabled={isLoading}
            className="chatinput-chip-btn"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Main Input Form Bar Section */}
      <div className="chatinput-box-wrapper">
        <div className="flex items-center gap-2">
          {/* Input Text Area */}
          <input
            type="text"
            className="chatinput-field"
            placeholder="Ask your agricultural question (e.g. crop health, soil pH, weather tips)..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />

          {/* Send Button */}
          <button
            onClick={() => handleSend()}
            disabled={!inputMessage.trim() || isLoading}
            className="chatinput-send-btn"
          >
            <span>Ask AI</span>
            <span>🚀</span>
          </button>
        </div>
      </div>
      <p className="chatinput-disclaimer">
        🌱 AgriSmart AI provides instant evidence-based agricultural recommendations.
      </p>
    </div>
  );
}

export default ChatInput;