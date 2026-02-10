import React, { useState } from "react";

function InputBox({ onSendMessage }) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    onSendMessage(input);
    setInput(""); // Clear input after sending
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="input-box">
      <input
        className="message-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Describe your symptoms..."
        aria-label="Describe your symptoms"
      />
      <button className="send-button" onClick={handleSend}>Send</button>
    </div>
  );
}

export default InputBox;
