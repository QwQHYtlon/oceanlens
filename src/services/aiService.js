// AI Service - Abstracted for future API integration
// Currently uses mock responses, will be replaced with actual AI API in Phase 4

import { chatData } from '../data/chatData';

export const aiService = {
  // Send message to AI (currently mock)
  async sendMessage(message) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check for mock response
    const mockResponse = chatData.mockResponses[message];
    if (mockResponse) {
      return {
        success: true,
        response: mockResponse
      };
    }
    
    // Default response for unknown questions
    return {
      success: true,
      response: '這是一個很好的問題！目前我正在學習更多海洋知識。請嘗試問我關於海洋生物、生態系統或環境問題的問題。'
    };
  },
  
  // Get suggested questions
  getSuggestedQuestions() {
    return chatData.suggestedQuestions;
  },
  
  // Get welcome message
  getWelcomeMessage() {
    return chatData.defaultWelcome;
  }
};

// Future integration placeholder:
// When integrating with actual AI API (OpenAI, Zhipu, etc.),
// replace the sendMessage method with actual API calls
// Example structure:
/*
export const aiService = {
  async sendMessage(message) {
    const response = await fetch('API_ENDPOINT', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({ message })
    });
    return response.json();
  }
};
*/
