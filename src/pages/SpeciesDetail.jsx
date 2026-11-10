import { useState, lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Ruler, Utensils, Shield, Smartphone } from 'lucide-react';
import Card from '../components/Card/Card';
import Button from '../components/Button/Button';
import Loading3D from '../components/3d/Loading3D';
import Fallback3D from '../components/3d/Fallback3D';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { speciesData } from '../data/speciesData';
import { getOceanLabels } from '../data/oceanTags';
import { getCreatureTypeForSpecies } from '../data/species3D';
import './SpeciesDetail.css';

// Lazy load heavy 3D and AR bundles only when a detail page needs them.
const MarineCreatureViewer = lazy(() => import('../components/3d/MarineCreatureViewer'));
const ARScene = lazy(() => import('../components/ar/ARScene'));

const SpeciesDetail = () => {
  const { id } = useParams();
  const species = speciesData.find((item) => item.id === id);
  const [showAR, setShowAR] = useState(false);
  useDocumentTitle(species ? species.name : '找不到海洋生物');

  if (!species) {
    return (
      <div className="species-detail">
        <div className="container">
          <div className="species-detail__not-found">
            <h2>找不到該海洋生物</h2>
            <p>這個生物可能尚未收錄，或連結已經失效。</p>
            <Button to="/species" variant="primary" size="medium">
              <ArrowLeft size={16} />
              返回海洋生物
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const creatureType = getCreatureTypeForSpecies(species);
  const oceanLabels = getOceanLabels(species.habitat);

  return (
    <div className="species-detail">
      <div className="container">
        <div className="species-detail__back">
          <Button to="/species" variant="ghost" size="small">
            <ArrowLeft size={16} aria-hidden="true" />
            返回
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="species-detail__header">
            <div className="species-detail__emoji" aria-hidden="true">
              {species.image}
            </div>
            <div className="species-detail__titles">
              <h1 className="species-detail__name">{species.name}</h1>
              <p className="species-detail__english">{species.englishName}</p>
            </div>
          </div>

          <div className="species-detail__content">
            <div className="species-detail__main">
              <div className="species-detail__viewer-actions">
                <ErrorBoundary
                  fallback={({ reset }) => (
                    <Fallback3D message="3D 模型載入失敗，請重試。" onRetry={reset} />
                  )}
                >
                  <Suspense
                    fallback={
                      <div className="species-detail__viewer-loading">
                        <Loading3D message="正在載入 3D 模型…" />
                      </div>
                    }
                  >
                    <MarineCreatureViewer creatureType={creatureType} />
                  </Suspense>
                </ErrorBoundary>

                <Button
                  variant="primary"
                  size="medium"
                  onClick={() => setShowAR(true)}
                  className="species-detail__ar-button"
                  aria-label="開啟 AR 探索"
                >
                  <Smartphone size={18} aria-hidden="true" />
                  AR 探索
                </Button>
              </div>

              <Card variant="glass" className="species-detail__card">
                <h2 className="species-detail__section-title">詳細介紹</h2>
                <p className="species-detail__description">{species.detailedDescription}</p>
              </Card>

              <Card variant="glass" className="species-detail__card">
                <h2 className="species-detail__section-title">基本資訊</h2>
                <div className="species-detail__info">
                  <div className="species-detail__info-item">
                    <Ruler className="species-detail__info-icon" aria-hidden="true" />
                    <div>
                      <div className="species-detail__info-label">體型</div>
                      <div className="species-detail__info-value">{species.size}</div>
                    </div>
                  </div>

                  <div className="species-detail__info-item">
                    <Utensils className="species-detail__info-icon" aria-hidden="true" />
                    <div>
                      <div className="species-detail__info-label">食性</div>
                      <div className="species-detail__info-value">{species.diet}</div>
                    </div>
                  </div>

                  <div className="species-detail__info-item">
                    <Shield className="species-detail__info-icon" aria-hidden="true" />
                    <div>
                      <div className="species-detail__info-label">保育狀況</div>
                      <div className="species-detail__info-value">{species.conservation}</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="species-detail__sidebar">
              <Card variant="glass" className="species-detail__card">
                <h2 className="species-detail__section-title">棲息環境</h2>
                <div className="species-detail__meta">
                  <div className="species-detail__meta-item">
                    <span className="species-detail__meta-label">生存深度</span>
                    <span className="species-detail__meta-value">{species.depth}</span>
                  </div>
                  <div className="species-detail__meta-item">
                    <span className="species-detail__meta-label">棲息地</span>
                    <span className="species-detail__meta-value">{species.habitat}</span>
                  </div>
                  <div className="species-detail__meta-item">
                    <span className="species-detail__meta-label">大洋分布</span>
                    <span className="species-detail__ocean-tags">
                      {oceanLabels.map((label) => (
                        <span key={label} className="species-detail__ocean-tag">
                          {label}
                        </span>
                      ))}
                    </span>
                  </div>
                  <div className="species-detail__meta-item">
                    <span className="species-detail__meta-label">分類</span>
                    <span className="species-detail__meta-value">{species.category}</span>
                  </div>
                </div>
              </Card>

              <Card variant="glass" className="species-detail__card">
                <h2 className="species-detail__section-title">有趣事實</h2>
                <ul className="species-detail__facts">
                  {species.facts.map((fact) => (
                    <li key={fact} className="species-detail__fact">
                      {fact}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>

      {showAR && (
        <Suspense
          fallback={
            <div className="species-detail__ar-loading">
              <Loading3D message="正在載入 AR 體驗…" />
            </div>
          }
        >
          <ARScene speciesId={id} onClose={() => setShowAR(false)} />
        </Suspense>
      )}
    </div>
  );
};

export default SpeciesDetail;
