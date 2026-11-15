import { User } from 'lucide-react';
import OceanAiMark from '../OceanAiMark/OceanAiMark';
import MessageContent from './MessageContent';
import './ChatMessage.css';

const ChatMessage = ({ message, isUser, isDemo = false, isGuardrail = false }) => {
  return (
    <div
      className={`chat-message chat-message--${isUser ? 'user' : 'ai'} ${
        isGuardrail ? 'chat-message--guardrail' : ''
      }`}
    >
      <div className="chat-message__avatar" aria-hidden="true">
        {isUser ? <User size={19} /> : <OceanAiMark size={26} />}
      </div>
      <div className="chat-message__content">
        <div className="chat-message__bubble">
          {isUser ? (
            <div className="chat-message__text">{message}</div>
          ) : (
            <MessageContent text={message} />
          )}
        </div>
        {(isDemo || isGuardrail) && (
          <div className="chat-message__meta">
            {isGuardrail && (
              <span className="chat-message__badge chat-message__badge--guardrail">
                海洋限定
              </span>
            )}
            {isDemo && (
              <span className="chat-message__badge chat-message__badge--demo">
                示範回覆
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
