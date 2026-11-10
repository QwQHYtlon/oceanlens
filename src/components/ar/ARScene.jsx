import { useCallback, useEffect, useState } from 'react';
import MindARController from './MindARController';
import ARError from './ARError';
import ARFallback from './ARFallback';
import ARInstructions from './ARInstructions';
import ARInfoCard from './ARInfoCard';
import { getARModelInfo } from '../../data/arModels';
import './ARScene.css';

const detectMobileOrTablet = () => {
  if (typeof navigator === 'undefined') return false;
  const userAgent = navigator.userAgent || '';
  const isIPadOS = /Macintosh/i.test(userAgent) && navigator.maxTouchPoints > 1;
  return /android|iphone|ipad|ipod|mobile|tablet/i.test(userAgent) || isIPadOS;
};

const ARScene = ({ speciesId, onClose }) => {
  const [showInstructions, setShowInstructions] = useState(true);
  const [isTracking, setIsTracking] = useState(false);
  const [error, setError] = useState(null);
  const [errorDetails, setErrorDetails] = useState(null);
  const [isMobile] = useState(detectMobileOrTablet);
  const [arReady, setArReady] = useState(false);
  const [retryKey, setRetryKey] = useState(0);

  const arModelInfo = getARModelInfo(speciesId);
  const isDebug = import.meta.env.VITE_AR_DEBUG === 'true';

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleStartAR = useCallback(() => setShowInstructions(false), []);
  const handleAnchorFound = useCallback(() => setIsTracking(true), []);
  const handleAnchorLost = useCallback(() => setIsTracking(false), []);
  const handleARReady = useCallback(() => setArReady(true), []);
  const handleView3D = useCallback(() => onClose(), [onClose]);

  const handleARError = useCallback((err) => {
    setError(err.message || 'AR 載入失敗');
    setErrorDetails(err.details || null);
  }, []);

  const handleRetry = useCallback(() => {
    setError(null);
    setErrorDetails(null);
    setArReady(false);
    setRetryKey((key) => key + 1);
  }, []);

  const closeButton = (
    <button type="button" className="ar-scene__close" onClick={onClose} aria-label="關閉 AR">
      ✕
    </button>
  );

  if (!isMobile) {
    return (
      <div className="ar-scene" role="dialog" aria-modal="true" aria-label="AR 探索">
        <ARFallback onView3D={handleView3D} currentUrl={window.location.href} />
        {closeButton}
      </div>
    );
  }

  if (showInstructions) {
    return (
      <div className="ar-scene" role="dialog" aria-modal="true" aria-label="AR 探索">
        <ARInstructions onStart={handleStartAR} onCancel={onClose} />
        {closeButton}
      </div>
    );
  }

  if (error) {
    return (
      <div className="ar-scene" role="dialog" aria-modal="true" aria-label="AR 探索">
        <ARError
          errorType="ar_init_failed"
          message={error}
          errorDetails={errorDetails}
          onRetry={handleRetry}
          onView3D={handleView3D}
          onClose={onClose}
        />
        {closeButton}
      </div>
    );
  }

  return (
    <div className="ar-scene" role="dialog" aria-modal="true" aria-label="AR 探索">
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

      {closeButton}
    </div>
  );
};

export default ARScene;
