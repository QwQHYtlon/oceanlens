import { Suspense, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Box3, Vector3 } from 'three';
import MarineCreature from './MarineCreature';
import CameraController from './CameraController';
import Fallback3D from './Fallback3D';
import { getSpecies3DModel } from '../../data/species3D';
import './MarineCreatureViewer.css';

const ModelLoading = () => {
  const ref = useRef(null);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.45;
  });

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[0.65, 1]} />
      <meshBasicMaterial color="#00f5d4" wireframe transparent opacity={0.3} />
    </mesh>
  );
};

const GltfModel = ({ url, scale = 1, rotation = [0, 0, 0] }) => {
  const { scene } = useGLTF(url);
  const cloned = useMemo(() => scene.clone(true), [scene]);

  // The supplied models are already normalized, but recompute the offset so
  // any future asset variant still sits centered on the floor.
  const offset = useMemo(() => {
    const box = new Box3().setFromObject(cloned);
    if (box.isEmpty()) return [0, 0, 0];
    const center = box.getCenter(new Vector3());
    return [-center.x, -box.min.y, -center.z];
  }, [cloned]);

  return (
    <group scale={scale} rotation={rotation}>
      <primitive object={cloned} position={offset} />
    </group>
  );
};

const CreatureScene = ({ creatureType, speciesId, autoRotate }) => {
  const modelConfig = getSpecies3DModel(speciesId);
  const camera = modelConfig?.camera ?? {
    position: [0, 0, 5],
    target: [0, 0, 0],
  };

  return (
    <>
      <CameraController
        position={camera.position}
        target={camera.target}
        autoRotate={autoRotate}
        autoRotateSpeed={2}
      />
      <ambientLight intensity={0.95} />
      <hemisphereLight args={['#e8fffb', '#03111f', 0.75]} />
      <directionalLight position={[5, 8, 5]} intensity={1.8} />
      <pointLight position={[-3, 2, 3]} intensity={1.1} color="#48cae4" />

      {modelConfig ? (
        <Suspense fallback={<ModelLoading />}>
          <GltfModel
            url={modelConfig.model}
            scale={modelConfig.scale}
            rotation={modelConfig.rotation}
          />
        </Suspense>
      ) : (
        <MarineCreature type={creatureType} scale={2} position={[0, 0, 0]} />
      )}
    </>
  );
};

const MarineCreatureViewer = ({ creatureType = 'fish', speciesId }) => {
  const [autoRotate, setAutoRotate] = useState(true);
  const [error, setError] = useState(false);
  const modelConfig = getSpecies3DModel(speciesId);
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
        <div>
          <h3 className="creature-viewer__title">3D 模型</h3>
          {modelConfig && (
            <p className="creature-viewer__model">{modelConfig.modelName}</p>
          )}
        </div>
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
          <CreatureScene
            creatureType={creatureType}
            speciesId={speciesId}
            autoRotate={autoRotate}
          />
        </Canvas>
      </div>

      <div className="creature-viewer__hints">
        <p className="creature-viewer__hint">💡 拖曳以旋轉 • 滾輪以縮放</p>
        {modelConfig && (
          <p className="creature-viewer__credit">
            3D 模型：{modelConfig.modelName} · {modelConfig.credit} ·{' '}
            {modelConfig.license}
            {modelConfig.source && (
              <>
                {' · '}
                <a href={modelConfig.source} target="_blank" rel="noreferrer">
                  來源
                </a>
              </>
            )}
          </p>
        )}
      </div>
    </div>
  );
};

export default MarineCreatureViewer;
