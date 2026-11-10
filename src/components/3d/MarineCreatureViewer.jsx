import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import MarineCreature from './MarineCreature';
import CameraController from './CameraController';
import Fallback3D from './Fallback3D';
import './MarineCreatureViewer.css';

const CreatureScene = ({ creatureType, autoRotate }) => {
  return (
    <>
      <CameraController position={[0, 0, 5]} autoRotate={autoRotate} autoRotateSpeed={2} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />

      <MarineCreature type={creatureType} scale={2} position={[0, 0, 0]} />
    </>
  );
};

const MarineCreatureViewer = ({ creatureType = 'fish' }) => {
  const [autoRotate, setAutoRotate] = useState(true);
  const [error, setError] = useState(false);
  const [dpr] = useState(() => {
    if (typeof window === 'undefined') return [1, 2];
    return window.matchMedia('(max-width: 768px)').matches ? [1, 1.5] : [1, 2];
  });

  if (error) {
    return (
      <Fallback3D
        message="3D 模型載入失敗，請確認瀏覽器支援 WebGL。"
        onRetry={() => setError(false)}
      />
    );
  }

  return (
    <div className="creature-viewer" aria-label="3D 生物模型檢視器">
      <div className="creature-viewer__header">
        <h3 className="creature-viewer__title">3D 模型</h3>
        <button
          type="button"
          className={`creature-viewer__toggle ${autoRotate ? 'creature-viewer__toggle--active' : ''}`}
          onClick={() => setAutoRotate(!autoRotate)}
          aria-pressed={autoRotate}
        >
          {autoRotate ? '停止旋轉' : '自動旋轉'}
        </button>
      </div>

      <div className="creature-viewer__canvas">
        <Canvas
          dpr={dpr}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          style={{ width: '100%', height: '100%' }}
          onError={() => setError(true)}
        >
          <CreatureScene creatureType={creatureType} autoRotate={autoRotate} />
        </Canvas>
      </div>

      <div className="creature-viewer__hints">
        <p className="creature-viewer__hint">💡 拖曳以旋轉 • 滾輪以縮放</p>
      </div>
    </div>
  );
};

export default MarineCreatureViewer;
