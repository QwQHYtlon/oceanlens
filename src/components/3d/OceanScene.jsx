import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import DepthEnvironment from './DepthEnvironment';
import OceanParticles from './OceanParticles';
import MarineCreature from './MarineCreature';
import CameraController from './CameraController';
import Loading3D from './Loading3D';
import Fallback3D from './Fallback3D';

const OceanSceneContent = ({ depth, creatureType }) => {
  return (
    <>
      <CameraController position={[0, 0, 8]} />
      <DepthEnvironment depth={depth} />
      <OceanParticles depth={depth} />
      
      {/* Add marine creature based on depth */}
      {creatureType && (
        <MarineCreature 
          type={creatureType} 
          scale={1.5}
          position={[0, 0, 0]}
        />
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
  
  if (hasError) {
    return (
      <div className="ocean-scene-container">
        <Fallback3D 
          message="3D 場景載入失敗" 
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }
  
  return (
    <div className="ocean-scene-container">
      <Canvas
        dpr={[1, 2]} // Limit pixel ratio for performance
        gl={{ antialias: true, alpha: true }}
        style={{ width: '100%', height: '100%' }}
        onError={(error) => {
          console.error('Canvas error:', error);
          setHasError(true);
        }}
      >
        <Suspense fallback={<Loading3D />}>
          <OceanSceneContent depth={depth} creatureType={creatureType} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default OceanScene;
