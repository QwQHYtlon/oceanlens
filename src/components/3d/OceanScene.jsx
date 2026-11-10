import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import DepthEnvironment from './DepthEnvironment';
import OceanParticles from './OceanParticles';
import MarineCreature from './MarineCreature';
import CameraController from './CameraController';
import Fallback3D from './Fallback3D';

const OceanSceneContent = ({ depth, creatureType }) => {
  return (
    <>
      <CameraController position={[0, 0, 8]} />
      <DepthEnvironment depth={depth} />
      <OceanParticles depth={depth} />

      {creatureType && (
        <MarineCreature type={creatureType} scale={1.5} position={[0, 0, 0]} />
      )}

      {/* Ocean floor - simple plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial
          color={depth > 1000 ? '#020c1b' : depth > 500 ? '#03045e' : '#023e8a'}
          roughness={0.9}
        />
      </mesh>
    </>
  );
};

const OceanScene = ({ depth = 0, creatureType = null, onError }) => {
  const [hasError, setHasError] = useState(false);
  const [retryKey, setRetryKey] = useState(0);
  const [dpr] = useState(() => {
    if (typeof window === 'undefined') return [1, 2];
    return window.matchMedia('(max-width: 768px)').matches ? [1, 1.5] : [1, 2];
  });

  const handleCanvasError = (error) => {
    console.error('[OceanLens] 3D scene error:', error);
    setHasError(true);
    onError?.(error);
  };

  if (hasError) {
    return (
      <div className="ocean-scene-container">
        <Fallback3D
          message="3D 場景載入失敗，請確認瀏覽器支援 WebGL。"
          onRetry={() => {
            setHasError(false);
            setRetryKey((key) => key + 1);
          }}
        />
      </div>
    );
  }

  return (
    <div className="ocean-scene-container">
      <Canvas
        key={retryKey}
        dpr={dpr}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ width: '100%', height: '100%' }}
        onError={handleCanvasError}
      >
        <OceanSceneContent depth={depth} creatureType={creatureType} />
      </Canvas>
    </div>
  );
};

export default OceanScene;
