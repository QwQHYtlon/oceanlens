import React from 'react';
import { Bot, User } from 'lucide-react';
import './ChatMessage.css';

const ChatMessage = ({ message, isUser }) => {
  return (
    <div className={`chat-message chat-message--${isUser ? 'user' : 'ai'}`}>
      <div className="chat-message__avatar">
        {isUser ? <User /> : <Bot />}
      </div>
      <div className="chat-message__content">
        <div className="chat-message__bubble">
          {message}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
