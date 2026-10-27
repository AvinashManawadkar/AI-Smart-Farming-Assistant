import React, { useState } from "react";
import Navbar from "./components/Navbar";
import ChatBox from "./components/ChatBox";
import ChatInput from "./components/ChatInput";
import { askAI } from "./api";
import "./styles/App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState("");

  const handleClearChat = () => {
    if (window.confirm("Are you sure you want to clear the conversation history?")) {
      setMessages([]);
    }
  };

  // Instant direct submission for clickable Smart Advisory buttons & quick topics
  const handleDirectSubmit = async (promptText) => {
    if (!promptText || !promptText.trim() || isLoading) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Optimistically add user prompt to chat
    setMessages((prev) => [
      ...prev,
      {
        user: promptText,
        ai: null,
        timestamp: timeStr
      }
    ]);

    setSelectedPrompt("");
    setIsLoading(true);

    try {
      const response = await askAI(promptText);
      const aiReply = response?.reply || "I am here to assist with your farming query. Please check back shortly.";

      setMessages((prev) => {
        const updated = [...prev];
        if (updated.length > 0) {
          updated[updated.length - 1].ai = aiReply;
        }
        return updated;
      });
    } catch (err) {
      console.error("Error asking AI:", err);
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

  // Smart Advisory Topics List
  const advisoryTopics = [
    { title: "Crop Health Diagnostic", icon: "🔍", prompt: "How do I diagnose yellowing leaves and common crop diseases?" },
    { title: "Fertilizer Calculator", icon: "⚖️", prompt: "What is the optimal NPK fertilizer dosage calculation for crops?" },
    { title: "Pest Prevention Guide", icon: "🐛", prompt: "What are the best organic and chemical solutions for farm pest control?" },
    { title: "Seasonal Irrigation", icon: "💦", prompt: "How do I schedule drip irrigation based on soil moisture and weather?" },
  ];

  return (
    <div className="app-shell selection:bg-emerald-500 selection:text-white">
      
      {/* 1. Header Navbar Section */}
      <Navbar onClearChat={handleClearChat} messageCount={messages.length} />

      {/* 2. Main Dashboard & Assistant Section Layout */}
      <main className="app-main-layout">
        
        {/* Left Sidebar Section Stack */}
        <aside className="app-sidebar-section">
          
          {/* Sidebar Section 1: Live Farm Weather & Conditions Widget */}
          <section className="app-widget-card">
            <div className="app-widget-header">
              <span className="app-widget-title">
                <span>🌦️</span> Live Farm Dashboard
              </span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-medium">
                Sync Active
              </span>
            </div>

            <div className="space-y-2.5">
              <div className="app-stat-item">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">☀️</span>
                  <div>
                    <p className="app-stat-label">Temperature</p>
                    <p className="app-stat-val">28°C Optimal</p>
                  </div>
                </div>
                <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2 py-1 rounded-lg">Sunny</span>
              </div>

              <div className="app-stat-item">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">💧</span>
                  <div>
                    <p className="app-stat-label">Soil Moisture</p>
                    <p className="app-stat-val">64% Adequate</p>
                  </div>
                </div>
                <span className="text-xs text-teal-700 font-semibold bg-teal-50 px-2 py-1 rounded-lg">Good</span>
              </div>

              <div className="app-stat-item">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">🧪</span>
                  <div>
                    <p className="app-stat-label">Target Soil pH</p>
                    <p className="app-stat-val">6.5 (Loam)</p>
                  </div>
                </div>
                <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2 py-1 rounded-lg">Balanced</span>
              </div>
            </div>
          </section>

          {/* Sidebar Section 2: Smart Advisory Topics (Clickable Buttons with Instant AI Response) */}
          <section className="app-widget-card">
            <div className="flex items-center justify-between mb-3">
              <h3 className="app-widget-title">
                <span>🌾</span> Smart Advisory Topics
              </h3>
              <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-100/70 px-2 py-0.5 rounded-full">
                Instant Ask ⚡
              </span>
            </div>

            <div className="space-y-2">
              {advisoryTopics.map((item, idx) => (
                <button
                  key={idx}
                  disabled={isLoading}
                  onClick={() => handleDirectSubmit(item.prompt)}
                  className="app-nav-item"
                  title={`Click to instantly ask AI about ${item.title}`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">{item.icon}</span>
                    <span>{item.title}</span>
                  </div>
                  <span className="app-nav-arrow">→</span>
                </button>
              ))}
            </div>
          </section>

          {/* Sidebar Section 3: Pro Tip Card */}
          <section className="app-protip-card">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-lg">💡</span>
              <h4 className="font-semibold text-xs text-emerald-200 uppercase tracking-wide">Agronomist Pro-Tip</h4>
            </div>
            <p className="text-xs text-emerald-100/90 leading-relaxed">
              Always monitor leaf color changes early in the morning. Yellowing usually signals Nitrogen deficiency or over-watering!
            </p>
          </section>

        </aside>

        {/* Right Main Chat Section Container */}
        <section className="app-chat-section">
          
          {/* Scrollable Chat Area */}
          <div className="flex-1 overflow-y-auto pr-1">
            <ChatBox
              messages={messages}
              isLoading={isLoading}
              onSelectQuickPrompt={handleDirectSubmit}
            />
          </div>

          {/* Chat Input Section */}
          <ChatInput
            setMessages={setMessages}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            externalMessage={selectedPrompt}
            setExternalMessage={setSelectedPrompt}
          />
        </section>

      </main>

      {/* 3. Footer Section */}
      <footer className="app-footer">
        <p>🌱 AgriSmart AI Farming Assistant • Powered by Deep Agricultural Analytics</p>
      </footer>
    </div>
  );
}

export default App;