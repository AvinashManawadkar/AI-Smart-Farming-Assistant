import React, { useState } from "react";
import "../styles/Message.css";

function Message({ userMessage, aiMessage, timestamp, onFollowUpClick }) {
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formattedTime = timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Quick follow-up actionable buttons for AI answers
  const followUpButtons = [
    { label: "🌱 Recommended Fertilizers", prompt: "What are the exact fertilizer ratios and dosage for this?" },
    { label: "💧 Watering & Irrigation Schedule", prompt: "What is the best irrigation schedule for this crop?" },
    { label: "🐛 Disease Prevention Tips", prompt: "How can I prevent common pests and diseases for this?" }
  ];

  return (
    <div className="message-wrapper animate-fade-in">
      {/* User Message Bubble Section */}
      {userMessage && (
        <div className="message-user-row">
          <div className="message-user-container">
            <div className="message-user-header">
              <span className="message-user-label">Farmer</span>
              <span className="message-timestamp">{formattedTime}</span>
            </div>
            <div className="message-user-bubble">
              {userMessage}
            </div>
          </div>
          <div className="message-user-avatar">
            👨‍🌾
          </div>
        </div>
      )}

      {/* AI Assistant Message Bubble & Styled Answer Section */}
      {aiMessage && (
        <div className="message-ai-row">
          <div className="message-ai-avatar animate-pulse-glow">
            🌿
          </div>
          <div className="message-ai-container">
            <div className="flex items-center gap-2 mb-1 px-1">
              <span className="message-ai-label">
                AgriSmart AI
                <span className="message-ai-badge">OFFICIAL</span>
              </span>
              <span className="message-timestamp">{formattedTime}</span>
            </div>
            
            <div className="message-ai-card">
              {/* Formatted Answer Body with CSS */}
              <div className="ai-answer-content">
                {aiMessage.split('\n').map((paragraph, index) => {
                  if (!paragraph.trim()) return null;
                  
                  // Highlight bullet points or key lines
                  if (paragraph.trim().startsWith('-') || paragraph.trim().startsWith('•') || paragraph.trim().startsWith('*')) {
                    return (
                      <div key={index} className="ai-answer-bullet">
                        <span className="ai-answer-bullet-icon">🌱</span>
                        <span>{paragraph.replace(/^[-•*]\s*/, '')}</span>
                      </div>
                    );
                  }

                  // Render normal text paragraph
                  return (
                    <p key={index} className="ai-answer-paragraph">
                      {paragraph}
                    </p>
                  );
                })}
              </div>

              {/* Clickable Action Buttons for AI Answer */}
              <div className="ai-answer-actions-container">
                <span className="ai-answer-actions-title">
                  ⚡ Clickable Follow-up Questions:
                </span>
                <div className="ai-answer-buttons-row">
                  {followUpButtons.map((btn, idx) => (
                    <button
                      key={idx}
                      onClick={() => onFollowUpClick && onFollowUpClick(btn.prompt)}
                      className="ai-action-btn"
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Bar (Copy Button & Helpful Feedback) */}
              <div className="message-ai-actionbar">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-emerald-800 font-semibold flex items-center gap-1">
                    <span>💡</span> Verified Agronomy Advisory
                  </span>
                  <button
                    onClick={() => setLiked(!liked)}
                    className={`ai-like-btn ${liked ? 'liked' : ''}`}
                    title="Mark answer helpful"
                  >
                    {liked ? '👍 Helpful' : '👍'}
                  </button>
                </div>
                
                <button
                  onClick={() => copyToClipboard(aiMessage)}
                  className="message-copy-btn"
                >
                  {copied ? (
                    <>
                      <span>✓</span> Copied!
                    </>
                  ) : (
                    <>
                      <span>📋</span> Copy Answer
                    </>
                  )}
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Message;
