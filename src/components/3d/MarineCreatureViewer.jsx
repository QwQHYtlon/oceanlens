import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import MarineCreature from './MarineCreature';
import CameraController from './CameraController';
import Loading3D from './Loading3D';
import Fallback3D from './Fallback3D';
import './MarineCreatureViewer.css';

const CreatureScene = ({ creatureType, autoRotate }) => {
  return (
    <>
      <CameraController 
        position={[0, 0, 5]}
        autoRotate={autoRotate}
        autoRotateSpeed={2}
      />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      
      <MarineCreature 
        type={creatureType} 
        scale={2}
        position={[0, 0, 0]}
      />
    </>
  );
};

const MarineCreatureViewer = ({ creatureType = 'fish' }) => {
  const [autoRotate, setAutoRotate] = useState(true);
  const [error, setError] = useState(false);
  
  if (error) {
    return (
      <Fallback3D 
        message="3D 模型載入失敗"
        onRetry={() => setError(false)}
      />
    );
  }
  
  return (
    <div className="creature-viewer">
      <div className="creature-viewer__header">
        <h3 className="creature-viewer__title">3D 模型</h3>
        <button
          className={`creature-viewer__toggle ${autoRotate ? 'creature-viewer__toggle--active' : ''}`}
          onClick={() => setAutoRotate(!autoRotate)}
        >
          {autoRotate ? '停止旋轉' : '自動旋轉'}
        </button>
      </div>
      
      <div className="creature-viewer__canvas">
        <Canvas
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
          style={{ width: '100%', height: '100%' }}
          onError={() => setError(true)}
        >
          <Suspense fallback={<Loading3D message="正在載入 3D 模型……" />}>
            <CreatureScene creatureType={creatureType} autoRotate={autoRotate} />
          </Suspense>
        </Canvas>
      </div>
      
      <div className="creature-viewer__hints">
        <p className="creature-viewer__hint">💡 拖曳以旋轉 • 滾輪以縮放</p>
      </div>
    </div>
  );
};

export default MarineCreatureViewer;
