import { useEffect, useRef, useState } from 'react';
import { Bot, Send, Sparkles, Trash2 } from 'lucide-react';
import Card from '../components/Card/Card';
import SectionTitle from '../components/SectionTitle/SectionTitle';
import ChatMessage from '../components/ChatMessage/ChatMessage';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { aiService } from '../services/aiService';
import './AI.css';

const AI = () => {
  useDocumentTitle('AI 科普助手');
  const nextIdRef = useRef(1);
  const messagesRef = useRef(null);
  const [messages, setMessages] = useState(() => [
    { id: 0, text: aiService.getWelcomeMessage(), isUser: false },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const suggestedQuestions = aiService.getSuggestedQuestions();
  const createMessage = (text, isUser) => ({
    id: nextIdRef.current++,
    text,
    isUser,
  });

  useEffect(() => {
    const container = messagesRef.current;
    if (!container) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    container.scrollTo({
      top: container.scrollHeight,
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  }, [messages, isLoading]);

  const handleSend = async (rawText) => {
    const text = (rawText ?? input).trim();
    if (!text || isLoading) return;

    setInput('');
    setMessages((prev) => [...prev, createMessage(text, true)]);
    setIsLoading(true);

    try {
      const result = await aiService.sendMessage(text);
      setMessages((prev) => [...prev, createMessage(result.response, false)]);
    } catch (error) {
      console.error('[OceanLens] AI mock failed:', error);
      setMessages((prev) => [
        ...prev,
        createMessage('抱歉，目前無法取得回覆。請稍後再試一次。', false),
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key !== 'Enter' || event.shiftKey) return;
    if (event.nativeEvent?.isComposing || event.keyCode === 229) return;
    event.preventDefault();
    handleSend();
  };

  const handleClear = () => {
    setMessages([
      { id: nextIdRef.current++, text: aiService.getWelcomeMessage(), isUser: false },
    ]);
    setInput('');
  };

  return (
    <div className="ai">
      <div className="container">
        <SectionTitle
          eyebrow="AI OCEAN GUIDE"
          title="AI 海洋科普助手"
          subtitle="你的 AI 海洋研究助手"
          align="center"
        />

        <div className="ai__layout">
          <aside className="ai__sidebar">
            <Card variant="glass" className="ai__sidebar-card">
              <div className="ai__sidebar-header">
                <Bot className="ai__sidebar-icon" size={56} aria-hidden="true" />
                <h3 className="ai__sidebar-title">OceanLens AI</h3>
                <p className="ai__sidebar-subtitle">你的海洋研究助手</p>
              </div>

              <div className="ai__suggested">
                <h4 className="ai__suggested-title">建議問題</h4>
                <div className="ai__suggested-list">
                  {suggestedQuestions.map((question) => (
                    <button
                      key={question}
                      type="button"
                      className="ai__suggested-btn"
                      onClick={() => handleSend(question)}
                      disabled={isLoading}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>

              <p className="ai__mock-note">
                <Sparkles size={14} aria-hidden="true" />
                目前為展示用模擬回覆，尚未連接 AI API。
              </p>

              <button type="button" className="ai__clear-btn" onClick={handleClear}>
                <Trash2 size={15} aria-hidden="true" />
                清除對話
              </button>
            </Card>
          </aside>

          <section className="ai__chat" aria-label="AI 對話">
            <Card variant="glass" className="ai__chat-card">
              <div
                className="ai__messages"
                ref={messagesRef}
                role="log"
                aria-live="polite"
                aria-relevant="additions"
              >
                {messages.map((message) => (
                  <ChatMessage
                    key={message.id}
                    message={message.text}
                    isUser={message.isUser}
                  />
                ))}
                {isLoading && (
                  <div className="ai__loading" role="status">
                    <Bot className="ai__loading-icon" size={18} aria-hidden="true" />
                    <span>思考中</span>
                    <span className="ai__loading-dots" aria-hidden="true">
                      <span />
                      <span />
                      <span />
                    </span>
                  </div>
                )}
              </div>

              <div className="ai__input-area">
                <textarea
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="輸入你的海洋問題…（Enter 送出，Shift + Enter 換行）"
                  className="ai__input"
                  rows={2}
                  maxLength={300}
                  disabled={isLoading}
                  aria-label="輸入你的海洋問題"
                />
                <button
                  type="button"
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isLoading}
                  className="ai__send-btn"
                  aria-label="送出訊息"
                  title="送出訊息"
                >
                  <Send size={20} aria-hidden="true" />
                </button>
              </div>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AI;
