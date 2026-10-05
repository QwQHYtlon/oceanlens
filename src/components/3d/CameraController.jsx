import React from 'react';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';

const CameraController = ({ 
  position = [0, 0, 5],
  enableZoom = true,
  enableRotate = true,
  enablePan = false,
  autoRotate = false,
  autoRotateSpeed = 1
}) => {
  return (
    <>
      <PerspectiveCamera makeDefault position={position} fov={50} />
      <OrbitControls
        enableZoom={enableZoom}
        enableRotate={enableRotate}
        enablePan={enablePan}
        autoRotate={autoRotate}
        autoRotateSpeed={autoRotateSpeed}
        minDistance={2}
        maxDistance={10}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2}
      />
    </>
  );
};

export default CameraController;
