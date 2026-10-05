import React, { useState, useEffect } from 'react';
import MindARController from './MindARController';
import ARLoading from './ARLoading';
import ARError from './ARError';
import ARFallback from './ARFallback';
import ARInstructions from './ARInstructions';
import ARInfoCard from './ARInfoCard';
import { getARModelInfo } from '../../data/arModels';
import './ARScene.css';

const ARScene = ({ speciesId, onClose }) => {
  const [showInstructions, setShowInstructions] = useState(true);
  const [isTracking, setIsTracking] = useState(false);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [arReady, setArReady] = useState(false);
  const [retryKey, setRetryKey] = useState(0);
  
  const arModelInfo = getARModelInfo(speciesId);
  const isDebug = import.meta.env.VITE_AR_DEBUG === 'true';
  
  // Check if mobile device
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      return /android/i.test(userAgent) || /iPad|iPhone|iPod/.test(userAgent);
    };
    
    setIsMobile(checkMobile());
  }, []);
  
  const handleStartAR = () => {
    setShowInstructions(false);
  };
  
  const handleCancel = () => {
    onClose();
  };
  
  const handleAnchorFound = () => {
    setIsTracking(true);
  };
  
  const handleAnchorLost = () => {
    setIsTracking(false);
  };
  
  const handleARError = (err) => {
    setError(err.message || 'AR 載入失敗');
  };
  
  const handleARReady = () => {
    setArReady(true);
  };
  
  const handleView3D = () => {
    onClose();
  };
  
  const handleRetry = () => {
    setError(null);
    setArReady(false);
    setRetryKey(prev => prev + 1);
  };
  
  // Desktop fallback
  if (!isMobile) {
    return (
      <div className="ar-scene">
        <ARFallback 
          onView3D={handleView3D}
          currentUrl={window.location.href}
        />
      </div>
    );
  }
  
  // Show instructions first
  if (showInstructions) {
    return (
      <div className="ar-scene">
        <ARInstructions 
          onStart={handleStartAR}
          onCancel={handleCancel}
        />
      </div>
    );
  }
  
  // Error state
  if (error) {
    return (
      <div className="ar-scene">
        <ARError 
          errorType="ar_init_failed"
          message={error}
          onRetry={handleRetry}
          onView3D={handleView3D}
          onClose={onClose}
        />
      </div>
    );
  }
  
  // AR Scene with MindAR
  return (
    <div className="ar-scene">
      <MindARController
        key={retryKey}
        onAnchorFound={handleAnchorFound}
        onAnchorLost={handleAnchorLost}
        onError={handleARError}
        onReady={handleARReady}
      />
      
      {arModelInfo && isTracking && (
        <ARInfoCard
          name={arModelInfo.name}
          englishName={arModelInfo.englishName}
          depth={arModelInfo.depth}
          description={arModelInfo.description}
        />
      )}
      
      {isDebug && (
        <div className="ar-scene__debug">
          <div>AR Engine: MindAR</div>
          <div>Camera: {arReady ? 'READY' : 'INITIALIZING'}</div>
          <div>Target: {isTracking ? 'FOUND' : 'LOST'}</div>
          <div>Model: LOADED (placeholder)</div>
        </div>
      )}
      
      <button 
        className="ar-scene__close"
        onClick={onClose}
        aria-label="關閉 AR"
      >
        ✕
      </button>
    </div>
  );
};

export default ARScene;
