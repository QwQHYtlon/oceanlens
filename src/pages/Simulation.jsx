import { useMemo, useState } from 'react';
import { RotateCcw, Waves } from 'lucide-react';
import Card from '../components/Card/Card';
import SectionTitle from '../components/SectionTitle/SectionTitle';
import SliderControl from '../components/SliderControl/SliderControl';
import SimulationChart from '../components/SimulationChart/SimulationChart';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { simulationData } from '../data/simulationData';
import './Simulation.css';

const getStatus = (health) => {
  if (health >= 70) return { label: '健康', tone: 'good' };
  if (health >= 40) return { label: '警戒', tone: 'warning' };
  return { label: '危險', tone: 'danger' };
};

const Simulation = () => {
  useDocumentTitle('生態模擬');
  const [temperature, setTemperature] = useState(simulationData.initial.temperature);
  const [pollution, setPollution] = useState(simulationData.initial.pollution);
  const [plastic, setPlastic] = useState(simulationData.initial.plastic);

  const metrics = useMemo(
    () => simulationData.calculate(temperature, pollution, plastic),
    [temperature, pollution, plastic],
  );

  const series = useMemo(
    () => ({
      temperature: simulationData.getTemperatureSeries(pollution, plastic),
      pollution: simulationData.getPollutionSeries(temperature, plastic),
      plastic: simulationData.getPlasticSeries(temperature, pollution),
      ecosystem: simulationData.getStressSeries(),
    }),
    [temperature, pollution, plastic],
  );

  const status = getStatus(metrics.ecosystemHealth);
  const chartConfig = simulationData.charts;

  const metricCards = [
    { label: '珊瑚健康度', value: metrics.coralHealth, color: '#00f5d4' },
    { label: '生物多樣性', value: metrics.biodiversity, color: '#00b4d8' },
    { label: '魚群數量', value: metrics.fishPopulation, color: '#90e0ef' },
    { label: '生態系統健康度', value: metrics.ecosystemHealth, color: '#64ffda' },
  ];

  const handleReset = () => {
    setTemperature(simulationData.initial.temperature);
    setPollution(simulationData.initial.pollution);
    setPlastic(simulationData.initial.plastic);
  };

  return (
    <div className="simulation">
      <div className="container">
        <SectionTitle
          eyebrow="ECOSYSTEM LAB"
          title="生態模擬"
          subtitle="調整環境參數，觀察生態系統的即時變化"
          align="center"
        />

        <div className="simulation__layout">
          <div className="simulation__controls">
            <Card variant="glass" className="simulation__card">
              <div className="simulation__card-header">
                <h3 className="simulation__card-title">環境控制器</h3>
                <button type="button" className="simulation__reset" onClick={handleReset}>
                  <RotateCcw size={14} aria-hidden="true" />
                  重置
                </button>
              </div>

              <SliderControl
                label="海水溫度"
                value={temperature}
                min={simulationData.ranges.temperature.min}
                max={simulationData.ranges.temperature.max}
                unit={simulationData.ranges.temperature.unit}
                onChange={setTemperature}
                color="#ff8a8a"
              />

              <SliderControl
                label="海洋污染"
                value={pollution}
                min={simulationData.ranges.pollution.min}
                max={simulationData.ranges.pollution.max}
                unit={simulationData.ranges.pollution.unit}
                onChange={setPollution}
                color="#ffd93d"
              />

              <SliderControl
                label="塑膠污染"
                value={plastic}
                min={simulationData.ranges.plastic.min}
                max={simulationData.ranges.plastic.max}
                unit={simulationData.ranges.plastic.unit}
                onChange={setPlastic}
                color="#ff9f43"
              />

              <div className="simulation__live" aria-live="polite">
                <span>目前生態健康度</span>
                <strong>{metrics.ecosystemHealth}%</strong>
                <span className={`simulation__status simulation__status--${status.tone}`}>
                  {status.label}
                </span>
              </div>

              <p className="simulation__hint">
                拖動滑桿，右側指標與圖表會立即更新。重置可回到初始環境。
              </p>
            </Card>
          </div>

          <div className="simulation__results">
            <div className={`simulation__summary simulation__summary--${status.tone}`} aria-live="polite">
              <div className="simulation__summary-icon" aria-hidden="true">
                <Waves size={26} />
              </div>
              <div className="simulation__summary-body">
                <span className="simulation__summary-label">整體生態健康度</span>
                <strong className="simulation__summary-value">{metrics.ecosystemHealth}%</strong>
                <span className="simulation__summary-meta">
                  環境壓力指數 {metrics.stressIndex}% · 依目前三項參數估算
                </span>
              </div>
              <span className={`simulation__status simulation__status--${status.tone}`}>
                {status.label}
              </span>
            </div>

            <div className="simulation__metrics">
              {metricCards.map((metric) => (
                <Card key={metric.label} variant="glass" className="simulation__metric-card">
                  <div className="simulation__metric-label">{metric.label}</div>
                  <div className="simulation__metric-value" style={{ color: metric.color }}>
                    {metric.value}%
                  </div>
                </Card>
              ))}
            </div>

            <div className="simulation__charts">
              <SimulationChart
                {...chartConfig.temperature}
                data={series.temperature}
                referenceX={temperature}
                referenceLabel="目前水溫"
              />
              <SimulationChart
                {...chartConfig.pollution}
                data={series.pollution}
                referenceX={pollution}
                referenceLabel="目前污染"
              />
              <SimulationChart
                {...chartConfig.plastic}
                data={series.plastic}
                referenceX={plastic}
                referenceLabel="目前塑膠"
              />
              <SimulationChart {...chartConfig.ecosystem} data={series.ecosystem} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulation;
