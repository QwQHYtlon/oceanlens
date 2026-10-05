import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot } from 'lucide-react';
import Card from '../components/Card/Card';
import SectionTitle from '../components/SectionTitle/SectionTitle';
import ChatMessage from '../components/ChatMessage/ChatMessage';
import { aiService } from '../services/aiService';
import './AI.css';

const AI = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  
  useEffect(() => {
    // Add welcome message on mount
    const welcomeMessage = aiService.getWelcomeMessage();
    setMessages([{ id: 1, text: welcomeMessage, isUser: false }]);
  }, []);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage = input.trim();
    setInput('');
    
    // Add user message
    setMessages(prev => [...prev, { id: Date.now(), text: userMessage, isUser: true }]);
    setIsLoading(true);
    
    try {
      // Get AI response (mock for now)
      const response = await aiService.sendMessage(userMessage);
      
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        text: response.response, 
        isUser: false 
      }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        text: '抱歉，發生錯誤。請稍後再試。', 
        isUser: false 
      }]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  const handleSuggestedQuestion = (question) => {
    setInput(question);
  };
  
  const suggestedQuestions = aiService.getSuggestedQuestions();
  
  return (
    <div className="ai">
      <div className="container">
        <SectionTitle 
          title="AI 海洋科普助手" 
          subtitle="你的 AI 海洋研究助手"
          align="center"
        />
        
        <div className="ai__layout">
          {/* Sidebar */}
          <div className="ai__sidebar">
            <Card variant="glass" className="ai__sidebar-card">
              <div className="ai__sidebar-header">
                <Bot className="ai__sidebar-icon" />
                <h3 className="ai__sidebar-title">OceanLens AI</h3>
                <p className="ai__sidebar-subtitle">你的海洋研究助手</p>
              </div>
              
              <div className="ai__suggested">
                <h4 className="ai__suggested-title">建議問題</h4>
                <div className="ai__suggested-list">
                  {suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      className="ai__suggested-btn"
                      onClick={() => handleSuggestedQuestion(question)}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          </div>
          
          {/* Chat Window */}
          <div className="ai__chat">
            <Card variant="glass" className="ai__chat-card">
              <div className="ai__messages">
                {messages.map((message) => (
                  <ChatMessage 
                    key={message.id} 
                    message={message.text} 
                    isUser={message.isUser} 
                  />
                ))}
                {isLoading && (
                  <div className="ai__loading">
                    <Bot className="ai__loading-icon" />
                    <span>思考中...</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              
              <div className="ai__input-area">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="輸入你的海洋問題..."
                  className="ai__input"
                  rows={3}
                  disabled={isLoading}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="ai__send-btn"
                >
                  <Send size={20} />
                </button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AI;
