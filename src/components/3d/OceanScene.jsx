import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import DepthEnvironment from './DepthEnvironment';
import OceanParticles from './OceanParticles';
import MarineCreature from './MarineCreature';
import CameraController from './CameraController';
import Fallback3D from './Fallback3D';

const SCENE_BACKGROUNDS = [
  {
    maxDepth: 200,
    background:
      'linear-gradient(180deg, #00c6ff 0%, #00a6e0 22%, #0077b6 55%, #023e8a 100%)',
    floor: '#0a2942',
  },
  {
    maxDepth: 1000,
    background:
      'linear-gradient(180deg, #0096d6 0%, #0077b6 28%, #023e8a 68%, #03045e 100%)',
    floor: '#071c33',
  },
  {
    maxDepth: 4000,
    background:
      'linear-gradient(180deg, #005f9e 0%, #023e8a 35%, #03045e 72%, #020c1b 100%)',
    floor: '#051226',
  },
  {
    maxDepth: 6000,
    background:
      'linear-gradient(180deg, #02305e 0%, #03045e 45%, #020c1b 100%)',
    floor: '#030b16',
  },
  {
    maxDepth: Number.POSITIVE_INFINITY,
    background:
      'linear-gradient(180deg, #031a33 0%, #020c1b 55%, #010710 100%)',
    floor: '#010710',
  },
];

const getSceneStyle = (depth) =>
  SCENE_BACKGROUNDS.find((entry) => depth < entry.maxDepth) ?? SCENE_BACKGROUNDS[0];

const ROCKS = [
  { position: [-3.6, -5.05, -1.5], scale: [1.5, 0.8, 1.1], color: '#125574' },
  { position: [3.2, -5.1, -2.2], scale: [1.1, 0.55, 0.9], color: '#0f4664' },
  { position: [-1.8, -5, 2.4], scale: [0.8, 0.45, 0.7], color: '#155d7e' },
  { position: [4.5, -5.2, 2.8], scale: [1.7, 0.65, 1.2], color: '#0b3b58' },
  { position: [0.6, -5.1, -3.8], scale: [1.2, 0.5, 1], color: '#0f4664' },
];

const Seafloor = ({ depth }) => {
  const colors = getSceneStyle(depth);

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5.1, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color={colors.floor} roughness={0.95} />
      </mesh>

      {ROCKS.map((rock, index) => (
        <mesh
          key={index}
          position={rock.position}
          scale={rock.scale}
          rotation={[0.15 * index, 0.5 * index, 0.05 * index]}
        >
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={rock.color}
            roughness={0.95}
            metalness={0.05}
          />
        </mesh>
      ))}

      <gridHelper
        args={[40, 40, '#1e6f8f', '#0b3b5a']}
        position={[0, -5.02, 0]}
        material-transparent
        material-opacity={0.18}
      />

      {[
        [-2.2, 2.6, 1.6],
        [2.4, 1.4, -1.8],
        [-0.8, -2.4, 1.2],
        [3.1, -0.8, 2.6],
      ].map(([x, z, radius], index) => (
        <mesh
          key={`caustic-${index}`}
          position={[x, -5.03, z]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <circleGeometry args={[radius, 32]} />
          <meshBasicMaterial
            color="#64ffda"
            transparent
            opacity={0.08}
            blending={2}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
};

const OceanSceneContent = ({ depth, creatureType }) => {
  return (
    <>
      <CameraController position={[0, 0.4, 8]} />
      <DepthEnvironment depth={depth} />
      <OceanParticles depth={depth} />

      <pointLight
        position={[4, 3, 6]}
        intensity={depth > 1000 ? 24 : 2}
        color="#64ffda"
        distance={30}
        decay={2}
      />
      <pointLight
        position={[-4, 1, -4]}
        intensity={depth > 1000 ? 8 : 0.8}
        color="#0077b6"
        distance={24}
        decay={2}
      />

      {creatureType && (
        <Float speed={1.4} rotationIntensity={0.35} floatIntensity={0.8}>
          <MarineCreature type={creatureType} scale={2.2} position={[0, 0.2, 0]} />
        </Float>
      )}

      {depth < 1000 && (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1.1}>
          <MarineCreature type="fish" scale={0.8} position={[-2.4, 1.2, -1]} />
        </Float>
      )}

      <Seafloor depth={depth} />
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
  const sceneStyle = getSceneStyle(depth);

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
    <div
      className="ocean-scene-container"
      style={{ background: sceneStyle.background }}
    >
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
