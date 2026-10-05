import React, { useState, lazy, Suspense } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Ruler, Utensils, Shield, Smartphone } from 'lucide-react';
import Card from '../components/Card/Card';
import Button from '../components/Button/Button';
import { speciesData } from '../data/speciesData';
import { getCreatureType } from '../data/species3D';
import './SpeciesDetail.css';

// Lazy load 3D and AR components for performance
const MarineCreatureViewer = lazy(() => import('../components/3d/MarineCreatureViewer'));
const ARScene = lazy(() => import('../components/ar/ARScene'));

const SpeciesDetail = () => {
  const { id } = useParams();
  const species = speciesData.find(s => s.id === id);
  const creatureType = getCreatureType(id);
  const [showAR, setShowAR] = useState(false);
  
  if (!species) {
    return (
      <div className="species-detail">
        <div className="container">
          <div className="species-detail__not-found">
            <h2>找不到該海洋生物</h2>
            <Link to="/species">
              <Button variant="primary">返回海洋生物</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="species-detail">
      <div className="container">
        <Link to="/species" className="species-detail__back">
          <Button variant="ghost" size="small">
            <ArrowLeft size={16} />
            返回
          </Button>
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="species-detail__header">
            <div className="species-detail__emoji">{species.image}</div>
            <div className="species-detail__titles">
              <h1 className="species-detail__name">{species.name}</h1>
              <p className="species-detail__english">{species.englishName}</p>
            </div>
          </div>
          
          <div className="species-detail__content">
            <div className="species-detail__main">
              <div className="species-detail__viewer-actions">
                <Suspense fallback={<div className="loading-placeholder">載入 3D 模型中...</div>}>
                  <MarineCreatureViewer creatureType={creatureType} />
                </Suspense>
                <Button 
                  variant="primary" 
                  size="medium"
                  onClick={() => setShowAR(true)}
                  className="species-detail__ar-button"
                  aria-label="開啟 AR 探索"
                >
                  <Smartphone size={18} />
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
                    <Ruler className="species-detail__info-icon" />
                    <div>
                      <div className="species-detail__info-label">體型</div>
                      <div className="species-detail__info-value">{species.size}</div>
                    </div>
                  </div>
                  
                  <div className="species-detail__info-item">
                    <Utensils className="species-detail__info-icon" />
                    <div>
                      <div className="species-detail__info-label">食性</div>
                      <div className="species-detail__info-value">{species.diet}</div>
                    </div>
                  </div>
                  
                  <div className="species-detail__info-item">
                    <Shield className="species-detail__info-icon" />
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
                    <span className="species-detail__meta-label">分類</span>
                    <span className="species-detail__meta-value">{species.category}</span>
                  </div>
                </div>
              </Card>
              
              <Card variant="glass" className="species-detail__card">
                <h2 className="species-detail__section-title">有趣事實</h2>
                <ul className="species-detail__facts">
                  {species.facts.map((fact, index) => (
                    <li key={index} className="species-detail__fact">
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
        <Suspense fallback={<div className="ar-loading-placeholder">載入 AR 中...</div>}>
          <ARScene 
            speciesId={id} 
            onClose={() => setShowAR(false)} 
          />
        </Suspense>
      )}
    </div>
  );
};

export default SpeciesDetail;
