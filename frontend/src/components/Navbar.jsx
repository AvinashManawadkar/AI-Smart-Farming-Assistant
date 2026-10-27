import React from "react";
import "../styles/Navbar.css";

function Navbar({ onClearChat, messageCount }) {
  return (
    <header className="navbar-header">
      <div className="navbar-container">
        
        {/* Brand Logo & Name */}
        <div className="navbar-brand">
          <div className="navbar-logo-icon animate-leaf-float">
            🌱
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="navbar-title">
                AgriSmart AI
              </h1>
              <span className="navbar-version-badge hidden sm:inline-block">
                v2.0 Pro
              </span>
            </div>
            <p className="navbar-subtitle">
              Intelligent Farming Companion & Advisory
            </p>
          </div>
        </div>

        {/* Status Indicators & Actions */}
        <div className="navbar-actions">
          {/* Live Status Badge */}
          <div className="navbar-status-badge">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
            </span>
            <span className="hidden md:inline font-medium">AI Assistant Active</span>
          </div>

          {/* Clear Chat Button */}
          {messageCount > 0 && (
            <button
              onClick={onClearChat}
              className="navbar-clear-btn"
              title="Clear Chat History"
            >
              <span>🗑️</span>
              <span className="hidden sm:inline">Clear Chat</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
