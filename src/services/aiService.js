// AI Service - abstracted so a real API can replace the mock later.
// No network calls or backend are used in this phase.

import { chatData } from '../data/chatData';

const KEYWORD_RULES = [
  { keywords: ['珊瑚'], responseKey: '珊瑚白化是什麼原因造成的？' },
  { keywords: ['鮟鱇', '發光', '燈籠魚'], responseKey: '為什麼鮟鱇魚會發光？' },
  { keywords: ['深海', '陽光', '黑暗'], responseKey: '為什麼深海沒有陽光？' },
  { keywords: ['升溫', '暖化', '溫度', '氣候'], responseKey: '海水升溫會造成什麼影響？' },
  { keywords: ['最深', '海溝', '馬里亞納', '深度'], responseKey: '海洋最深的地方有多深？' },
  { keywords: ['塑膠', '垃圾', '微塑膠'], responseKey: '塑膠污染如何影響海洋生物？' },
];

const DEFAULT_RESPONSE =
  '這是一個很好的問題！目前我是展示用的海洋科普助手，資料庫涵蓋海洋生物、深度環境、珊瑚與污染等主題。你可以問我「為什麼深海沒有陽光？」或「塑膠污染如何影響海洋生物？」。';

const normalize = (value) => value.trim().toLowerCase();

export const aiService = {
  // Send message to AI (currently a deterministic mock).
  async sendMessage(message) {
    const text = message.trim();

    // Simulate a short thinking delay so the loading state is visible.
    await new Promise((resolve) => setTimeout(resolve, 650));

    const exact = chatData.mockResponses[text];
    if (exact) {
      return { success: true, response: exact, isMock: true };
    }

    const normalized = normalize(text);
    const rule = KEYWORD_RULES.find(({ keywords }) =>
      keywords.some((keyword) => normalized.includes(keyword)),
    );

    if (rule) {
      return {
        success: true,
        response: chatData.mockResponses[rule.responseKey],
        isMock: true,
      };
    }

    if (['你好', '嗨', 'hello', 'hi'].some((greeting) => normalized.includes(greeting))) {
      return { success: true, response: chatData.defaultWelcome, isMock: true };
    }

    return { success: true, response: DEFAULT_RESPONSE, isMock: true };
  },

  getSuggestedQuestions() {
    return [...chatData.suggestedQuestions];
  },

  getWelcomeMessage() {
    return chatData.defaultWelcome;
  },
};

// Future integration placeholder:
// Replace sendMessage with a fetch() call when a real AI API is approved.
