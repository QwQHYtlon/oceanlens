export const oceanData = {
  coverage: {
    percentage: 71,
    label: '地球表面被海洋覆蓋',
    description: '海洋佔地球表面積的71%，是地球上最大的生態系統'
  },
  unexplored: {
    percentage: 80,
    label: '海洋尚未被充分探索',
    description: '超過80%的海洋仍未被人類充分探索和了解'
  },
  depths: [
    {
      depth: 0,
      zone: '表層帶 (Epipelagic Zone)',
      light: '100%',
      temperature: '20-28°C',
      pressure: '1 atm',
      environment: '陽光充足，光合作用活躍，多數海洋生物棲息地',
      creatures: ['水母', '海龜', '珊瑚', '多種魚類'],
      color: '#00b4d8'
    },
    {
      depth: 100,
      zone: '中層帶 (Mesopelagic Zone)',
      light: '10-20%',
      temperature: '10-15°C',
      pressure: '11 atm',
      environment: '光線逐漸減弱，生物開始發光，捕食者增多',
      creatures: ['燈籠魚', '烏賊', '深海鮟鱇魚', '大型水母'],
      color: '#0077b6'
    },
    {
      depth: 500,
      zone: '半深層帶 (Bathypelagic Zone)',
      light: '< 1%',
      temperature: '4-6°C',
      pressure: '51 atm',
      environment: '陽光幾乎無法抵達，生物發光現象普遍',
      creatures: ['深海鮟鱇魚', '巨型烏賊', '管蟲', '深海蝦'],
      color: '#023e8a'
    },
    {
      depth: 1000,
      zone: '深層帶 (Abyssopelagic Zone)',
      light: '0%',
      temperature: '2-4°C',
      pressure: '101 atm',
      environment: '完全黑暗，高壓環境，生物適應極端條件',
      creatures: ['深海鮟鱇魚', '管蟲', '深海蝦', '盲蝦'],
      color: '#03045e'
    },
    {
      depth: 4000,
      zone: '超深層帶 (Hadalpelagic Zone)',
      light: '0%',
      temperature: '1-2°C',
      pressure: '401 atm',
      environment: '海溝區域，地球最深處，極端高壓',
      creatures: ['深海鮟鱇魚', '管蟲', '特殊微生物', '盲蝦'],
      color: '#020c1b'
    },
    {
      depth: 6000,
      zone: '挑戰者深淵',
      light: '0%',
      temperature: '1-4°C',
      pressure: '601 atm',
      environment: '地球最深點，馬里亞納海溝，極端環境',
      creatures: ['特殊微生物', '管蟲', '深海蝦', '未知生物'],
      color: '#020c1b'
    }
  ],
  features: [
    {
      id: 1,
      title: '海洋探索',
      description: '互動式深度探索體驗，了解不同深度的海洋環境與生物',
      icon: 'compass',
      path: '/explore'
    },
    {
      id: 2,
      title: '海洋生物',
      description: '完整的海洋生物資料庫，探索各種神奇的海洋生命',
      icon: 'fish',
      path: '/species'
    },
    {
      id: 3,
      title: '生態模擬',
      description: '即時生態系統模擬，了解環境變化對海洋的影響',
      icon: 'activity',
      path: '/simulation'
    },
    {
      id: 4,
      title: 'AI 科普助手',
      description: '智能問答系統，解答所有海洋相關問題',
      icon: 'bot',
      path: '/ai'
    }
  ],
  comparison: {
    traditional: {
      title: '傳統海洋教育',
      items: [
        '圖片與文字閱讀',
        '被動式學習',
        '缺乏互動體驗',
        '難以理解複雜概念'
      ]
    },
    oceanlens: {
      title: 'OceanLens',
      items: [
        '互動式探索體驗',
        '主動式學習',
        '即時模擬與反饋',
        '直觀理解生態系統'
      ]
    }
  }
};
