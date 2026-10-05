import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadialBarChart, RadialBar } from 'recharts';
import Card from '../components/Card/Card';
import SectionTitle from '../components/SectionTitle/SectionTitle';
import SliderControl from '../components/SliderControl/SliderControl';
import ChartCard from '../components/ChartCard/ChartCard';
import { simulationData } from '../data/simulationData';
import './Simulation.css';

const Simulation = () => {
  const [temperature, setTemperature] = useState(simulationData.initial.temperature);
  const [pollution, setPollution] = useState(simulationData.initial.pollution);
  const [plastic, setPlastic] = useState(simulationData.initial.plastic);
  
  // Calculate ecosystem metrics based on sliders
  const metrics = useMemo(() => 
    simulationData.calculate(temperature, pollution, plastic),
    [temperature, pollution, plastic]
  );
  
  // Generate chart data
  const chartData = useMemo(() => {
    const tempHistory = simulationData.getHistoricalData(metrics.coralHealth, 20);
    const pollutionHistory = simulationData.getHistoricalData(metrics.biodiversity, 25);
    const ecosystemHistory = simulationData.getHistoricalData(metrics.ecosystemHealth, 15);
    
    return {
      temperature: tempHistory,
      pollution: pollutionHistory,
      ecosystem: ecosystemHistory
    };
  }, [metrics]);
  
  // Radial bar data for current metrics
  const radialData = [
    { name: '珊瑚健康度', value: metrics.coralHealth, fill: '#00f5d4' },
    { name: '生物多樣性', value: metrics.biodiversity, fill: '#0077b6' },
    { name: '魚群數量', value: metrics.fishPopulation, fill: '#023e8a' },
    { name: '生態健康度', value: metrics.ecosystemHealth, fill: '#90e0ef' }
  ];
  
  return (
    <div className="simulation">
      <div className="container">
        <SectionTitle 
          title="生態模擬" 
          subtitle="調整環境參數，觀察生態系統變化"
          align="center"
        />
        
        <div className="simulation__layout">
          {/* Controls Panel */}
          <div className="simulation__controls">
            <Card variant="glass" className="simulation__card">
              <h3 className="simulation__card-title">環境控制器</h3>
              
              <SliderControl
                label="海水溫度"
                value={temperature}
                min={simulationData.ranges.temperature.min}
                max={simulationData.ranges.temperature.max}
                unit={simulationData.ranges.temperature.unit}
                onChange={setTemperature}
                color="#ff6b6b"
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
            </Card>
          </div>
          
          {/* Results Panel */}
          <div className="simulation__results">
            {/* Metrics Cards */}
            <div className="simulation__metrics">
              <Card variant="glass" className="simulation__metric-card">
                <div className="simulation__metric-label">珊瑚健康度</div>
                <div className="simulation__metric-value" style={{ color: '#00f5d4' }}>
                  {metrics.coralHealth}%
                </div>
              </Card>
              
              <Card variant="glass" className="simulation__metric-card">
                <div className="simulation__metric-label">生物多樣性</div>
                <div className="simulation__metric-value" style={{ color: '#0077b6' }}>
                  {metrics.biodiversity}%
                </div>
              </Card>
              
              <Card variant="glass" className="simulation__metric-card">
                <div className="simulation__metric-label">魚群數量</div>
                <div className="simulation__metric-value" style={{ color: '#023e8a' }}>
                  {metrics.fishPopulation}%
                </div>
              </Card>
              
              <Card variant="glass" className="simulation__metric-card">
                <div className="simulation__metric-label">生態系統健康度</div>
                <div className="simulation__metric-value" style={{ color: '#90e0ef' }}>
                  {metrics.ecosystemHealth}%
                </div>
              </Card>
            </div>
            
            {/* Charts */}
            <div className="simulation__charts">
              <ChartCard title="溫度 vs 珊瑚健康度">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData.temperature}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="month" stroke="#8892b0" />
                    <YAxis stroke="#8892b0" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(10, 25, 47, 0.9)', 
                        border: '1px solid rgba(100, 255, 218, 0.3)',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#00f5d4" 
                      strokeWidth={2}
                      dot={{ fill: '#00f5d4' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>
              
              <ChartCard title="污染 vs 生物多樣性">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData.pollution}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="month" stroke="#8892b0" />
                    <YAxis stroke="#8892b0" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(10, 25, 47, 0.9)', 
                        border: '1px solid rgba(100, 255, 218, 0.3)',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#ff6b6b" 
                      strokeWidth={2}
                      dot={{ fill: '#ff6b6b' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>
              
              <ChartCard title="環境 vs 生態系統健康度">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData.ecosystem}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="month" stroke="#8892b0" />
                    <YAxis stroke="#8892b0" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(10, 25, 47, 0.9)', 
                        border: '1px solid rgba(100, 255, 218, 0.3)',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#ffd93d" 
                      strokeWidth={2}
                      dot={{ fill: '#ffd93d' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulation;
