const OCEAN_TERMS = [
  '海洋', '大海', '海水', '海底', '深海', '淺海', '海面', '海浪', '海流',
  '潮汐', '海溝', '海床', '海岸', '海島', '海灣', '海峽', '海盆', '海嘯',
  '大洋', '太平洋', '大西洋', '印度洋', '北冰洋', '南大洋', '極地', '冰川',
  '冰山', '河口', '潟湖', '濕地', '珊瑚', '珊瑚礁', '魚', '鯨', '豚', '鯊',
  '鮟鱇', '章魚', '烏賊', '魷魚', '蝦', '蟹', '龍蝦', '貝', '螺', '海龜',
  '企鵝', '海鳥', '海豹', '海獅', '海象', '水母', '浮游', '藻', '海草',
  '紅樹林', '微生物', '生態', '棲地', '生物多樣性', '食物鏈', '漁業',
  '過度捕撈', '養殖', '污染', '塑膠', '微塑膠', '酸化', '暖化', '氣候變遷',
  '海平面', '碳排', '藍碳', '缺氧', '死區', '油污', '噪音', '潛水', '航海',
  '海洋科學', '海洋研究', '海洋教育', '海洋保育', '海洋生物', '海水升溫',
  '聖嬰', '洋流', '潮間帶', '深海生態', '海洋環境', '水域', '水下',
  'ocean', 'marine', 'sea', 'coral', 'whale', 'shark', 'fish', 'reef',
  'deep sea', 'tide', 'current', 'estuary', 'plankton',
];

const CONTEXT_TERMS = [
  '氣候變遷', '全球暖化', '溫室效應', '溫室氣體', '海平面上升', '碳循環',
  '碳封存', '生態系統', '生態系', '生物多樣性', '環境污染', '環境保育',
  '永續發展', '極端氣候', '颱風', '聖嬰現象', '反聖嬰', '地球科學',
  '自然保育', '棲地保育', '水資源', '水循環', '冰川融化', '兩極',
];

const GREETING_ONLY =
  /^(你好|您好|嗨|哈囉|哈喽|hello|hi|hey|早安|午安|晚安|哈囉哈囉)[！!。,.，、\s]*$/i;

const META_ONLY =
  /^(你是誰|你是什麼|你可以做什麼|你能做什麼|你會什麼|怎麼用|如何使用|使用說明|自我介紹|介紹你自己|你是ai|你是 ai)[？?！!。,.，\s]*$/i;

const normalize = (value) => value.trim().toLowerCase();

export const MAX_MESSAGE_LENGTH = 300;

export const OFF_TOPIC_RESPONSE =
  '我專注於海洋與水域科學，只能回答海洋生物、生態、深度、污染、氣候與海洋環境相關問題。試試問我：「為什麼深海沒有陽光？」或「塑膠污染如何影響海洋生物？」';

export const isOceanRelated = (message) => {
  if (typeof message !== 'string') return false;
  const text = normalize(message);
  if (!text) return false;

  if (GREETING_ONLY.test(text) || META_ONLY.test(text)) return true;

  const hasOceanTerm = OCEAN_TERMS.some((term) => text.includes(term));
  const hasContextTerm = CONTEXT_TERMS.some((term) => text.includes(term));
  if (hasOceanTerm || hasContextTerm) return true;

  // 沒有海洋或相關地球科學線索時，採從嚴處理。
  return false;
};

export const getTopicRefusal = () => OFF_TOPIC_RESPONSE;
