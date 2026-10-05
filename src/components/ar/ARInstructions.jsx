import React from 'react';
import { Camera, Scan, Eye } from 'lucide-react';
import Button from '../Button/Button';
import './ARInstructions.css';

const ARInstructions = ({ onStart, onCancel }) => {
  return (
    <div className="ar-instructions">
      <div className="ar-instructions__content">
        <div className="ar-instructions__icon">
          <Camera size={64} />
        </div>
        
        <h2 className="ar-instructions__title">AR 探索指南</h2>
        
        <div className="ar-instructions__steps">
          <div className="ar-instructions__step">
            <div className="ar-instructions__step-number">1</div>
            <div className="ar-instructions__step-content">
              <h3 className="ar-instructions__step-title">允許相機權限</h3>
              <p className="ar-instructions__step-desc">
                點擊「開始 AR」並允許瀏覽器使用相機
              </p>
            </div>
          </div>
          
          <div className="ar-instructions__step">
            <div className="ar-instructions__step-number">2</div>
            <div className="ar-instructions__step-content">
              <h3 className="ar-instructions__step-title">對準 OceanLens Marker</h3>
              <p className="ar-instructions__step-desc">
                將手機相機對準 OceanLens AR Marker
              </p>
            </div>
          </div>
          
          <div className="ar-instructions__step">
            <div className="ar-instructions__step-number">3</div>
            <div className="ar-instructions__step-content">
              <h3 className="ar-instructions__step-title">觀看海洋生物</h3>
              <p className="ar-instructions__step-desc">
                等待 3D 模型載入，即可在現實環境中觀看海洋生物
              </p>
            </div>
          </div>
        </div>
        
        <div className="ar-instructions__note">
          <Eye size={16} />
          <span>提示：確保環境光線充足，Marker 清晰可見</span>
        </div>
        
        <div className="ar-instructions__actions">
          <Button onClick={onStart} variant="primary" size="medium">
            開始 AR
          </Button>
          <Button onClick={onCancel} variant="ghost" size="medium">
            取消
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ARInstructions;
