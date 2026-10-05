import React, { Suspense } from 'react';
import { useGLTF } from '@react-three/drei';
import MarineCreature from '../3d/MarineCreature';

// TODO: Replace with actual GLB/GLTF models
// Currently using placeholder geometry from MarineCreature component
// Future: Load licensed GLB models from public/models/

const MarineARModel = ({ type, scale = 1, position = [0, 0, 0] }) => {
  // Try to load GLB model if available
  const ModelLoader = ({ modelPath }) => {
    try {
      const { scene } = useGLTF(modelPath);
      return <primitive object={scene} scale={scale} position={position} />;
    } catch (error) {
      console.error('Failed to load GLB model:', error);
      return null;
    }
  };

  // Placeholder model path (will be replaced with actual models)
  const modelPath = `/models/${type}.glb`;

  return (
    <Suspense fallback={null}>
      {/* Try to load GLB model, fallback to placeholder */}
      <ModelLoader modelPath={modelPath} />
      {/* Fallback to placeholder geometry */}
      <MarineCreature type={type} scale={scale} position={position} />
    </Suspense>
  );
};

export default MarineARModel;
