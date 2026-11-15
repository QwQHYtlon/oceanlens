import { chatData } from '../data/chatData';
import { isOceanRelated, OFF_TOPIC_RESPONSE } from '../utils/oceanTopic.js';

const KEYWORD_RULES = [
  { keywords: ['珊瑚'], responseKey: '珊瑚白化是什麼原因造成的？' },
  { keywords: ['鮟鱇', '發光', '燈籠魚'], responseKey: '為什麼鮟鱇魚會發光？' },
  { keywords: ['深海', '陽光', '黑暗'], responseKey: '為什麼深海沒有陽光？' },
  { keywords: ['升溫', '暖化', '溫度', '氣候'], responseKey: '海水升溫會造成什麼影響？' },
  { keywords: ['最深', '海溝', '馬里亞納', '深度'], responseKey: '海洋最深的地方有多深？' },
  { keywords: ['塑膠', '垃圾', '微塑膠'], responseKey: '塑膠污染如何影響海洋生物？' },
];

const DEFAULT_RESPONSE =
  '這是一個很好的海洋問題！目前是示範模式，資料庫涵蓋海洋生物、深度環境、珊瑚與污染等主題。設定 DEEPSEEK_API_KEY 後，就能取得即時 AI 回覆。你也可以先問我「為什麼深海沒有陽光？」或「塑膠污染如何影響海洋生物？」。';

const normalize = (value) => value.trim().toLowerCase();

export class AiServiceError extends Error {
  constructor(code, message) {
    super(message);
    this.name = 'AiServiceError';
    this.code = code;
  }
}

const createDemoResponse = (message) => {
  const text = message.trim();
  const exact = chatData.mockResponses[text];
  const normalized = normalize(text);
  const rule = KEYWORD_RULES.find(({ keywords }) =>
    keywords.some((keyword) => normalized.includes(keyword)),
  );

  let response = DEFAULT_RESPONSE;
  if (exact) {
    response = exact;
  } else if (rule) {
    response = chatData.mockResponses[rule.responseKey];
  } else if (['你好', '嗨', 'hello', 'hi'].some((greeting) => normalized.includes(greeting))) {
    response = chatData.defaultWelcome;
  }

  return {
    success: true,
    response,
    blocked: false,
    isDemo: true,
    model: 'demo',
  };
};

const readJson = async (response) => {
  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) return null;
  try {
    return await response.json();
  } catch {
    return null;
  }
};

export const aiService = {
  async getStatus() {
    try {
      const response = await fetch('/api/chat', {
        headers: { Accept: 'application/json' },
      });
      const data = await readJson(response);

      if (response.ok && data?.configured) {
        return {
          state: 'configured',
          configured: true,
          model: data.model || 'deepseek-chat',
        };
      }

      if (response.ok && data && data.configured === false) {
        return {
          state: 'demo',
          configured: false,
          model: data.model || 'deepseek-chat',
        };
      }

      return { state: 'demo', configured: false, model: 'demo' };
    } catch {
      return { state: 'offline', configured: false, model: 'demo' };
    }
  },

  async sendMessage(message, history = []) {
    const text = message.trim();
    if (!text) {
      throw new AiServiceError('EMPTY_MESSAGE', '請輸入問題。');
    }

    if (!isOceanRelated(text)) {
      return {
        success: true,
        response: OFF_TOPIC_RESPONSE,
        blocked: true,
        isDemo: false,
        model: 'ocean-guard',
      };
    }

    let response;
    try {
      response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ message: text, history }),
      });
    } catch {
      throw new AiServiceError(
        'NETWORK_ERROR',
        '目前無法連線到 AI 服務，請確認網路後再試。',
      );
    }

    const data = await readJson(response);

    if (response.status === 503 && data?.code === 'AI_NOT_CONFIGURED') {
      return {
        ...createDemoResponse(text),
        reason: 'not_configured',
      };
    }

    if (!data) {
      // Local `vite` preview has no serverless function; keep the demo usable.
      return {
        ...createDemoResponse(text),
        reason: 'api_unavailable',
      };
    }

    if (!response.ok || data.success === false) {
      throw new AiServiceError(
        data.code || 'AI_ERROR',
        data.message || 'AI 服務暫時無法回應，請稍後再試。',
      );
    }

    return {
      success: true,
      response: data.response,
      blocked: Boolean(data.blocked),
      isDemo: false,
      model: data.model || 'deepseek-chat',
    };
  },

  getSuggestedQuestions() {
    return [...chatData.suggestedQuestions];
  },

  getWelcomeMessage() {
    return chatData.defaultWelcome;
  },
};
