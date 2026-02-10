import React, { useState } from "react";
import "./App.css";
import ChatBox from "./components/ChatBox";
import InputBox from "./components/InputBox";
import LanguageSelector from "./components/LanguageSelector";

function App() {
  const [messages, setMessages] = useState([]);
  const [language, setLanguage] = useState("auto");
  const [isTyping, setIsTyping] = useState(false);
  const apiBase = process.env.REACT_APP_API_BASE || "";

  const handleSendMessage = (message) => {
    if (!message.trim()) return;

    // Add the user's message
    const userMessage = { text: message, type: "user", detectedLanguage: null };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsTyping(true);

    // Send the message to the backend
    fetch(`${apiBase}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, language }),
    })
      .then((res) => res.json())
      .then((data) => {
        // Update the detected language for the last user message
        setMessages((prevMessages) =>
          prevMessages.map((msg, index) =>
            index === prevMessages.length - 1
              ? { ...msg, detectedLanguage: data.detectedLanguage.language }
              : msg
          )
        );

        // Add the bot's message
        const botMessage = { text: data.translatedResponse, type: "bot", targetLanguage: data.targetLanguage.language };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      })
      .catch((err) => {
        console.error("Error:", err);
      })
      .finally(() => {
        setIsTyping(false);
      });
  };

  return (
    <div className="App">
      <div className="app-shell">
        <header className="app-header">
          <div className="app-header-text">
            <h1 className="app-title">HealthLens</h1>
            <p className="app-subtitle">Multilingual symptom checker and health assistant</p>
          </div>
          <LanguageSelector setLanguage={setLanguage} />
        </header>

        <main className="app-content">
          <ChatBox messages={messages} isTyping={isTyping} />
          <InputBox onSendMessage={handleSendMessage} />
        </main>

        <footer className="app-footer">
          This tool provides informational suggestions and is not medical advice.
        </footer>
      </div>
    </div>
  );
}

export default App;