import { useEffect, useRef, useState } from 'react';
import {
  ArrowUpRight,
  CheckCircle2,
  CircleAlert,
  Info,
  RotateCcw,
  Send,
  ShieldCheck,
} from 'lucide-react';
import Card from '../components/Card/Card';
import SectionTitle from '../components/SectionTitle/SectionTitle';
import ChatMessage from '../components/ChatMessage/ChatMessage';
import OceanAiMark from '../components/OceanAiMark/OceanAiMark';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { aiService } from '../services/aiService';
import './AI.css';

const STATUS_COPY = {
  checking: {
    label: '檢查連線中',
    tone: 'checking',
    title: '正在檢查 AI 連線',
    body: '正在確認 DeepSeek 與海洋限定規則是否就緒。',
  },
  configured: {
    label: 'DeepSeek 已連線',
    tone: 'online',
    title: 'DeepSeek 已連線',
    body: '即時 AI 已啟用，回覆範圍仍限定在海洋與水域科學。',
  },
  demo: {
    label: '示範模式',
    tone: 'demo',
    title: '目前為示範模式',
    body: '尚未設定 DEEPSEEK_API_KEY，先提供策劃好的海洋問答。',
  },
  offline: {
    label: '離線 · 示範回覆',
    tone: 'offline',
    title: 'AI 服務暫時離線',
    body: '目前使用示範回覆；請稍後重新整理再試。',
  },
};

const AI = () => {
  useDocumentTitle('AI 科普助手');
  const nextIdRef = useRef(1);
  const messagesRef = useRef(null);
  const [messages, setMessages] = useState(() => [
    { id: 0, text: aiService.getWelcomeMessage(), isUser: false },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState({
    state: 'checking',
    configured: false,
    model: 'deepseek-chat',
  });

  const suggestedQuestions = aiService.getSuggestedQuestions();
  const statusCopy = STATUS_COPY[apiStatus.state] ?? STATUS_COPY.demo;
  const statusTone = statusCopy.tone;
  const createMessage = (text, isUser, extra = {}) => ({
    id: nextIdRef.current++,
    text,
    isUser,
    ...extra,
  });

  useEffect(() => {
    let active = true;
    aiService.getStatus().then((status) => {
      if (active) setApiStatus(status);
    });
    return () => {
      active = false;
    };
  }, []);

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

    const history = messages
      .filter(
        (message) =>
          message.id !== 0 &&
          !message.isGuardrail &&
          !message.isError &&
          !message.isDemo,
      )
      .slice(-8)
      .map((message) => ({
        role: message.isUser ? 'user' : 'assistant',
        content: message.text,
      }));

    const userMessage = createMessage(text, true);
    setInput('');
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const result = await aiService.sendMessage(text, history);
      setMessages((prev) => [
        ...prev,
        createMessage(result.response, false, {
          isDemo: result.isDemo,
          isGuardrail: result.blocked,
        }),
      ]);

      if (result.isDemo) {
        setApiStatus({
          state: 'demo',
          configured: false,
          model: 'demo',
        });
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        createMessage(
          error.message || '抱歉，目前無法取得回覆。請稍後再試一次。',
          false,
          { isError: true },
        ),
      ]);
      if (error.code === 'NETWORK_ERROR') {
        setApiStatus((prev) => ({ ...prev, state: 'offline' }));
      }
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

  const NoteIcon =
    apiStatus.state === 'configured'
      ? CheckCircle2
      : apiStatus.state === 'offline'
        ? CircleAlert
        : Info;

  return (
    <div className="ai">
      <div className="container">
        <div className="ai__heading">
          <div className="ai__hero-mark">
            <OceanAiMark size={74} />
          </div>
          <SectionTitle
            eyebrow="AI OCEAN GUIDE"
            title="AI 海洋科普助手"
            subtitle="以 DeepSeek 驅動的海洋研究助手，只回答海洋與水域科學"
            align="center"
          />
        </div>

        <div className="ai__layout">
          <aside className="ai__sidebar">
            <Card variant="glass" className="ai__sidebar-card">
              <div className="ai__sidebar-header">
                <div className="ai__sidebar-identity">
                  <OceanAiMark size={58} />
                  <div>
                    <h3 className="ai__sidebar-title">OceanLens AI</h3>
                    <p className="ai__sidebar-subtitle">海洋科普 · DeepSeek</p>
                  </div>
                </div>
                <span className={`ai__status-pill ai__status-pill--${statusTone}`}>
                  <span className="ai__status-dot" aria-hidden="true" />
                  {statusCopy.label}
                </span>
              </div>

              <div className="ai__scope-card">
                <ShieldCheck size={18} aria-hidden="true" />
                <div>
                  <strong>海洋知識限定</strong>
                  <p>只回答海洋生物、生態、深度、污染與海洋環境相關問題。</p>
                </div>
              </div>

              <div className="ai__suggested">
                <div className="ai__suggested-head">
                  <h4 className="ai__suggested-title">可以這樣問</h4>
                  <span className="ai__suggested-count">{suggestedQuestions.length} 個靈感</span>
                </div>
                <div className="ai__suggested-list">
                  {suggestedQuestions.map((question, index) => (
                    <button
                      key={question}
                      type="button"
                      className="ai__suggested-btn"
                      onClick={() => handleSend(question)}
                      disabled={isLoading}
                    >
                      <span className="ai__suggested-index">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="ai__suggested-text">{question}</span>
                      <ArrowUpRight
                        className="ai__suggested-arrow"
                        size={15}
                        aria-hidden="true"
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className={`ai__api-note ai__api-note--${statusTone}`}>
                <NoteIcon size={15} aria-hidden="true" />
                <div>
                  <strong>{statusCopy.title}</strong>
                  <p>{statusCopy.body}</p>
                </div>
              </div>

              <button type="button" className="ai__clear-btn" onClick={handleClear}>
                <RotateCcw size={15} aria-hidden="true" />
                清除對話
              </button>
            </Card>
          </aside>

          <section className="ai__chat" aria-label="AI 對話">
            <Card variant="glass" className="ai__chat-card">
              <header className="ai__chat-header">
                <div className="ai__chat-heading">
                  <OceanAiMark size={34} />
                  <div>
                    <strong>海洋對話</strong>
                    <span>DeepSeek · 海洋知識限定</span>
                  </div>
                </div>
                <div className="ai__chat-status">
                  <span className={`ai__status-dot ai__status-dot--${statusTone}`} aria-hidden="true" />
                  {statusCopy.label}
                </div>
              </header>

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
                    isDemo={message.isDemo}
                    isGuardrail={message.isGuardrail}
                  />
                ))}
                {isLoading && (
                  <div className="ai__loading" role="status">
                    <OceanAiMark size={22} className="ai__loading-mark" />
                    <span>正在整理海洋資料</span>
                    <span className="ai__loading-dots" aria-hidden="true">
                      <span />
                      <span />
                      <span />
                    </span>
                  </div>
                )}
              </div>

              <div className="ai__input-area">
                <div className="ai__input-wrap">
                  <textarea
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="問一個海洋問題…（Enter 送出，Shift + Enter 換行）"
                    className="ai__input"
                    rows={2}
                    maxLength={300}
                    disabled={isLoading}
                    aria-label="輸入你的海洋問題"
                  />
                  <div className="ai__input-meta">
                    <span>{input.length}/300</span>
                    <span>Shift + Enter 換行</span>
                  </div>
                </div>
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
            <p className="ai__disclaimer">
              OceanLens AI 以繁體中文提供海洋科普，回覆僅供學習參考，重要決策請查證專業資料。
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AI;
