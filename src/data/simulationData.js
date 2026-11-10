const clamp = (value, min = 0, max = 100) => Math.min(max, Math.max(min, value));
const round = (value) => Math.round(value);

const calculate = (temperature, pollution, plastic) => {
  const tempStress = clamp(((temperature - 24) / 8) * 100);
  const tempEffect = 1 - (tempStress / 100) * 0.6;

  const pollutionEffect = 1 - (pollution / 100) * 0.7;
  const plasticEffect = 1 - (plastic / 100) * 0.8;

  const coralHealth = clamp(tempEffect * 100 - pollution * 0.2 - plastic * 0.1);
  const biodiversity = clamp(pollutionEffect * 100 - plastic * 0.3);
  const fishPopulation = clamp(plasticEffect * 100 - pollution * 0.2);
  const ecosystemHealth = (coralHealth + biodiversity + fishPopulation) / 3;
  const stressIndex = clamp(tempStress * 0.4 + pollution * 0.35 + plastic * 0.25);

  return {
    coralHealth: round(coralHealth),
    biodiversity: round(biodiversity),
    fishPopulation: round(fishPopulation),
    ecosystemHealth: round(ecosystemHealth),
    stressIndex: round(stressIndex),
  };
};

export const simulationData = {
  initial: {
    temperature: 28,
    pollution: 20,
    plastic: 15,
  },

  ranges: {
    temperature: { min: 24, max: 32, unit: '°C' },
    pollution: { min: 0, max: 100, unit: '%' },
    plastic: { min: 0, max: 100, unit: '%' },
  },

  calculate,

  // Each series varies one factor while keeping the other two at their
  // current values, so the charts update instantly and meaningfully when
  // the sliders move.
  getTemperatureSeries: (pollution, plastic) => {
    const data = [];
    for (let temperature = 24; temperature <= 32; temperature += 1) {
      data.push({
        x: temperature,
        y: calculate(temperature, pollution, plastic).coralHealth,
      });
    }
    return data;
  },

  getPollutionSeries: (temperature, plastic) => {
    const data = [];
    for (let pollution = 0; pollution <= 100; pollution += 10) {
      data.push({
        x: pollution,
        y: calculate(temperature, pollution, plastic).biodiversity,
      });
    }
    return data;
  },

  getPlasticSeries: (temperature, pollution) => {
    const data = [];
    for (let plastic = 0; plastic <= 100; plastic += 10) {
      data.push({
        x: plastic,
        y: calculate(temperature, pollution, plastic).fishPopulation,
      });
    }
    return data;
  },

  // Ramps up all three stressors together to visualise their combined effect.
  getStressSeries: () => {
    const data = [];
    for (let stress = 0; stress <= 100; stress += 10) {
      const temperature = 24 + (stress / 100) * 8;
      data.push({
        x: stress,
        y: calculate(temperature, stress, stress).ecosystemHealth,
      });
    }
    return data;
  },

  charts: {
    temperature: {
      title: '水溫 vs 珊瑚健康度',
      xLabel: '水溫 (°C)',
      lineName: '珊瑚健康度',
      color: '#00f5d4',
    },
    pollution: {
      title: '海洋污染 vs 生物多樣性',
      xLabel: '污染程度 (%)',
      lineName: '生物多樣性',
      color: '#ff6b6b',
    },
    plastic: {
      title: '塑膠污染 vs 魚群數量',
      xLabel: '塑膠污染 (%)',
      lineName: '魚群數量',
      color: '#ffd93d',
    },
    ecosystem: {
      title: '整體環境壓力 vs 生態健康度',
      xLabel: '環境壓力指數 (%)',
      lineName: '生態健康度',
      color: '#90e0ef',
    },
  },
};
