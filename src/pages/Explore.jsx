import React, { useState, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Thermometer, Gauge, Droplets, Fish } from 'lucide-react';
import Card from '../components/Card/Card';
import SectionTitle from '../components/SectionTitle/SectionTitle';
import DepthSelector from '../components/DepthSelector/DepthSelector';
import { oceanData } from '../data/oceanData';
import './Explore.css';

// Lazy load 3D component for performance
const OceanScene = lazy(() => import('../components/3d/OceanScene'));

const Explore = () => {
  const [selectedDepth, setSelectedDepth] = useState(oceanData.depths[0]);
  
  const depthInfo = selectedDepth;
  
  // Map creatures to 3D creature types
  const getCreatureType = (creatures) => {
    if (creatures.includes('深海鮟鱇魚')) return 'anglerfish';
    if (creatures.includes('水母')) return 'jellyfish';
    if (creatures.includes('海龜')) return 'turtle';
    if (creatures.includes('大白鯊')) return 'shark';
    if (creatures.includes('藍鯨')) return 'whale';
    if (creatures.includes('珊瑚')) return 'coral';
    return 'fish';
  };
  
  const creatureType = getCreatureType(depthInfo.creatures);
  
  return (
    <div className="explore">
      <div className="container">
        <SectionTitle 
          title="海洋深度探索" 
          subtitle="點擊不同深度，探索神秘的海洋世界"
          align="center"
        />
        
        <DepthSelector 
          depths={oceanData.depths}
          selectedDepth={selectedDepth.depth}
          onSelect={setSelectedDepth}
        />
        
        <motion.div 
          className="explore__scene"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Suspense fallback={<div className="loading-placeholder">載入 3D 場景中...</div>}>
            <OceanScene 
              depth={selectedDepth.depth} 
              creatureType={creatureType}
            />
          </Suspense>
        </motion.div>
        
        <motion.div 
          className="explore__content"
          key={selectedDepth.depth}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="explore__info">
            <Card variant="glass" className="explore__card">
              <div className="explore__header">
                <h2 className="explore__depth">{depthInfo.depth}m</h2>
                <span className="explore__zone">{depthInfo.zone}</span>
              </div>
              
              <div className="explore__metrics">
                <div className="explore__metric">
                  <Droplets className="explore__metric-icon" />
                  <div>
                    <div className="explore__metric-label">光線</div>
                    <div className="explore__metric-value">{depthInfo.light}</div>
                  </div>
                </div>
                
                <div className="explore__metric">
                  <Thermometer className="explore__metric-icon" />
                  <div>
                    <div className="explore__metric-label">溫度</div>
                    <div className="explore__metric-value">{depthInfo.temperature}</div>
                  </div>
                </div>
                
                <div className="explore__metric">
                  <Gauge className="explore__metric-icon" />
                  <div>
                    <div className="explore__metric-label">水壓</div>
                    <div className="explore__metric-value">{depthInfo.pressure}</div>
                  </div>
                </div>
              </div>
              
 <div className="explore__environment">
                <h3 className="explore__section-title">環境介紹</h3>
                <p className="explore__description">{depthInfo.environment}</p>
              </div>
              
              <div className="explore__creatures">
                <h3 className="explore__section-title">主要生物</h3>
                <div className="explore__creature-list">
                  {depthInfo.creatures.map((creature, index) => (
                    <span key={index} className="explore__creature-tag">
                      <Fish size={16} />
                      {creature}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Explore;
