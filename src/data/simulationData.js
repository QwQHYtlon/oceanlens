export const simulationData = {
  initial: {
    temperature: 28,
    pollution: 20,
    plastic: 15
  },
  ranges: {
    temperature: { min: 24, max: 32, unit: '°C' },
    pollution: { min: 0, max: 100, unit: '%' },
    plastic: { min: 0, max: 100, unit: '%' }
  },
  // Simulation calculation formulas
  calculate: (temperature, pollution, plastic) => {
    // Temperature effect: higher temp = lower coral health
    const tempEffect = 1 - ((temperature - 24) / 8) * 0.6;
    
    // Pollution effect: higher pollution = lower biodiversity
    const pollutionEffect = 1 - (pollution / 100) * 0.7;
    
    // Plastic effect: higher plastic = lower fish population
    const plasticEffect = 1 - (plastic / 100) * 0.8;
    
    // Combined effects
    const coralHealth = Math.max(0, Math.min(100, tempEffect * 100 - (pollution * 0.2) - (plastic * 0.1)));
    const biodiversity = Math.max(0, Math.min(100, pollutionEffect * 100 - (plastic * 0.3)));
    const fishPopulation = Math.max(0, Math.min(100, plasticEffect * 100 - (pollution * 0.2)));
    
    // Ecosystem health is average of all factors
    const ecosystemHealth = (coralHealth + biodiversity + fishPopulation) / 3;
    
    return {
      coralHealth: Math.round(coralHealth),
      biodiversity: Math.round(biodiversity),
      fishPopulation: Math.round(fishPopulation),
      ecosystemHealth: Math.round(ecosystemHealth)
    };
  },
  // Historical data for charts
  getHistoricalData: (baseValue, variance) => {
    const data = [];
    for (let i = 0; i < 12; i++) {
      data.push({
        month: i + 1,
        value: Math.max(0, Math.min(100, baseValue + (Math.random() - 0.5) * variance))
      });
    }
    return data;
  },
  // Chart configurations
  charts: {
    temperature: {
      title: '溫度 vs 珊瑚健康度',
      xAxis: '溫度 (°C)',
      yAxis: '珊瑚健康度 (%)',
      color: '#00f5d4'
    },
    pollution: {
      title: '污染 vs 生物多樣性',
      xAxis: '污染程度 (%)',
      yAxis: '生物多樣性 (%)',
      color: '#ff6b6b'
    },
    ecosystem: {
      title: '環境 vs 生態系統健康度',
      xAxis: '環境指數',
      yAxis: '生態健康度 (%)',
      color: '#ffd93d'
    }
  }
};
