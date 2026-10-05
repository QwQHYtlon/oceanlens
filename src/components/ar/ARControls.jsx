import React from 'react';
import { RotateCw, Move, ZoomIn, RefreshCw } from 'lucide-react';
import Button from '../Button/Button';
import './ARControls.css';

const ARControls = ({ 
  onRotate,
  onMove,
  onScale,
  onReset,
  autoRotate,
  onToggleAutoRotate
}) => {
  return (
    <div className="ar-controls">
      <div className="ar-controls__group">
        <button
          className="ar-controls__button"
          onClick={onRotate}
          title="旋轉模型"
        >
          <RotateCw size={20} />
        </button>
        <button
          className="ar-controls__button"
          onClick={onMove}
          title="移動模型"
        >
          <Move size={20} />
        </button>
        <button
          className="ar-controls__button"
          onClick={onScale}
          title="縮放模型"
        >
          <ZoomIn size={20} />
        </button>
      </div>
      
      <div className="ar-controls__group">
        <button
          className={`ar-controls__button ${autoRotate ? 'ar-controls__button--active' : ''}`}
          onClick={onToggleAutoRotate}
          title="自動旋轉"
        >
          <RefreshCw size={20} />
        </button>
        <button
          className="ar-controls__button"
          onClick={onReset}
          title="重置模型"
        >
          <RefreshCw size={20} />
        </button>
      </div>
    </div>
  );
};

export default ARControls;
