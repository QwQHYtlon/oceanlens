import { useState, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Thermometer, Gauge, Droplets, Fish } from 'lucide-react';
import Card from '../components/Card/Card';
import SectionTitle from '../components/SectionTitle/SectionTitle';
import DepthSelector from '../components/DepthSelector/DepthSelector';
import Loading3D from '../components/3d/Loading3D';
import Fallback3D from '../components/3d/Fallback3D';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { oceanData } from '../data/oceanData';
import './Explore.css';

// Lazy load the 3D bundle so the rest of the page stays lightweight.
const OceanScene = lazy(() => import('../components/3d/OceanScene'));

const getCreatureType = (creatures = []) => {
  if (creatures.includes('深海鮟鱇魚')) return 'anglerfish';
  if (creatures.includes('水母') || creatures.includes('大型水母')) return 'jellyfish';
  if (creatures.includes('海龜')) return 'turtle';
  if (creatures.includes('大白鯊')) return 'shark';
  if (creatures.includes('藍鯨')) return 'whale';
  if (creatures.includes('珊瑚')) return 'coral';
  return 'fish';
};

const Explore = () => {
  useDocumentTitle('海洋深度探索');
  const [selectedDepth, setSelectedDepth] = useState(oceanData.depths[0]);

  const depthInfo = selectedDepth;
  const creatureType = getCreatureType(depthInfo.creatures);

  return (
    <div className="explore">
      <div className="container">
        <SectionTitle
          eyebrow="DEPTH EXPLORER"
          title="海洋深度探索"
          subtitle="點擊不同深度，探索神秘的海洋世界"
          align="center"
        />

        <div className="explore__workspace">
          <aside className="explore__depth-panel">
            <DepthSelector
              depths={oceanData.depths}
              selectedDepth={selectedDepth.depth}
              onSelect={setSelectedDepth}
            />
          </aside>

          <div className="explore__main">
            <div className="explore__scene">
              <ErrorBoundary
                fallback={({ reset }) => (
                  <Fallback3D
                    message="3D 海洋場景載入失敗，請重試。"
                    onRetry={reset}
                  />
                )}
              >
                <Suspense
                  fallback={
                    <div className="explore__scene-fallback">
                      <Loading3D message="正在載入 3D 海洋場景…" />
                    </div>
                  }
                >
                  <OceanScene
                    depth={selectedDepth.depth}
                    creatureType={creatureType}
                  />
                </Suspense>
              </ErrorBoundary>

              <div className="explore__scene-label">
                <strong>{depthInfo.depth}m</strong>
                <span>{depthInfo.zone}</span>
              </div>
            </div>

            <motion.div
              className="explore__content"
              key={selectedDepth.depth}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              aria-live="polite"
            >
              <div className="explore__info">
                <Card variant="glass" className="explore__card" hover={false}>
                  <div className="explore__header">
                    <h2 className="explore__depth">{depthInfo.depth}m</h2>
                    <span className="explore__zone">{depthInfo.zone}</span>
                  </div>

                  <div className="explore__metrics">
                    <div className="explore__metric">
                      <Droplets className="explore__metric-icon" aria-hidden="true" />
                      <div>
                        <div className="explore__metric-label">光線</div>
                        <div className="explore__metric-value">{depthInfo.light}</div>
                      </div>
                    </div>

                    <div className="explore__metric">
                      <Thermometer
                        className="explore__metric-icon"
                        aria-hidden="true"
                      />
                      <div>
                        <div className="explore__metric-label">溫度</div>
                        <div className="explore__metric-value">
                          {depthInfo.temperature}
                        </div>
                      </div>
                    </div>

                    <div className="explore__metric">
                      <Gauge className="explore__metric-icon" aria-hidden="true" />
                      <div>
                        <div className="explore__metric-label">水壓</div>
                        <div className="explore__metric-value">
                          {depthInfo.pressure}
                        </div>
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
                      {depthInfo.creatures.map((creature) => (
                        <span key={creature} className="explore__creature-tag">
                          <Fish size={16} aria-hidden="true" />
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
      </div>
    </div>
  );
};

export default Explore;
