import React from "react";

function ChatBox({ messages, isTyping }) {
  return (
    <div className="chat-box">
      {messages.length === 0 && (
        <div className="empty-state">
          <div className="empty-title">Start a conversation</div>
          <div className="empty-text">Describe your symptoms to get possible conditions.</div>
        </div>
      )}
      {messages.map((msg, index) => (
        <div key={index} className={`message ${msg.type === "user" ? "user-message" : "bot-message"}`}>
          <div className="display-linebreak">
            {msg.text}
          </div>
          {msg.type === "user" && msg.detectedLanguage && (
            <div className="detected-language">
              <small>Language: {msg.detectedLanguage.toUpperCase()}</small>
            </div>
          )}
          {msg.type === "bot" && msg.targetLanguage && (
            <div className="detected-language">
              <small>Language: {msg.targetLanguage.toUpperCase()}</small>
            </div>
          )}
        </div>
      ))}
      {isTyping && (
        <div className="message bot-message typing-indicator" aria-live="polite">
          <span className="typing-dot" />
          <span className="typing-dot" />
          <span className="typing-dot" />
        </div>
      )}
    </div>
  );
}

export default ChatBox;