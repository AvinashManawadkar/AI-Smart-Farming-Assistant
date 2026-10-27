import React from "react";
import Message from "./Message";
import "../styles/ChatBox.css";

function ChatBox({ messages, isLoading, onSelectQuickPrompt }) {
  const quickTopics = [
    {
      icon: "🌾",
      title: "Crop Selection & Yield",
      description: "Best crops for current season, soil condition, and expected yields.",
      prompt: "What are the best high-yield crops to plant this season?"
    },
    {
      icon: "🐛",
      title: "Pest & Disease Control",
      description: "Identify symptoms, organic remedies, and chemical preventions.",
      prompt: "How can I prevent pest infestation in wheat and tomato crops?"
    },
    {
      icon: "🧪",
      title: "Soil & Fertilizer Guide",
      description: "NPK ratio calculations, soil pH correction, and organic compost.",
      prompt: "How do I optimize NPK fertilizer ratio for yellowing leaves?"
    },
    {
      icon: "🌧️",
      title: "Irrigation & Weather",
      description: "Smart watering schedules based on humidity and soil moisture.",
      prompt: "What is the optimal drip irrigation schedule for sandy loam soil?"
    }
  ];

  return (
    <div className="chatbox-viewport">
      {/* Empty State Welcome Screen Section */}
      {messages.length === 0 ? (
        <div className="chatbox-welcome-container animate-fade-in">
          <div className="chatbox-welcome-icon animate-leaf-float">
            🌱
          </div>
          <h2 className="chatbox-welcome-title">
            Welcome to AgriSmart Assistant
          </h2>
          <p className="chatbox-welcome-subtitle">
            Your AI advisor for precision agriculture. Ask anything about crops, soil health, pest control, weather impact, or farming techniques.
          </p>

          {/* Feature Suggestion Cards Grid Section */}
          <div className="chatbox-cards-grid">
            {quickTopics.map((topic, index) => (
              <button
                key={index}
                onClick={() => onSelectQuickPrompt && onSelectQuickPrompt(topic.prompt)}
                className="chatbox-topic-card"
              >
                <div className="flex items-start gap-3">
                  <div className="chatbox-topic-icon">
                    {topic.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="chatbox-topic-title">
                      {topic.title}
                    </h3>
                    <p className="chatbox-topic-desc">
                      {topic.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Conversation Messages History Section */
        <div className="space-y-2 py-4">
          {messages.map((msg, index) => (
            <Message
              key={index}
              userMessage={msg.user}
              aiMessage={msg.ai}
              timestamp={msg.timestamp}
              onFollowUpClick={onSelectQuickPrompt}
            />
          ))}
        </div>
      )}

      {/* Animated Loading Indicator Section */}
      {isLoading && (
        <div className="chatbox-typing-container animate-fade-in">
          <div className="chatbox-typing-avatar animate-pulse">
            🌿
          </div>
          <div className="chatbox-typing-card">
            <span className="text-xs text-emerald-900 font-semibold">AgriSmart AI is thinking</span>
            <div className="flex items-center gap-1 ml-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-[dotBounce_1.4s_infinite_0s]"></span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-[dotBounce_1.4s_infinite_0.2s]"></span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-[dotBounce_1.4s_infinite_0.4s]"></span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatBox;