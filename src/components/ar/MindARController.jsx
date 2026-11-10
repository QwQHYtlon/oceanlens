import { useEffect, useRef, useState } from 'react';
import './MindARController.css';

const THREE_CDN_URLS = [
  'https://unpkg.com/three@0.128.0/build/three.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js',
  'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js',
];

const MINDAR_MODULE_URL =
  'https://cdn.jsdelivr.net/npm/mind-ar@1.2.2/dist/mindar-image-three.prod.js';

const loadScript = (url) =>
  new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    script.onload = () => resolve(script);
    script.onerror = () => {
      script.remove();
      reject(new Error(`腳本載入失敗：${url}`));
    };
    document.head.appendChild(script);
  });

const createPlaceholderCreature = (THREE) => {
  const group = new THREE.Group();

  const body = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 24, 24),
    new THREE.MeshStandardMaterial({ color: 0x00f5d4, roughness: 0.55, metalness: 0.15 }),
  );
  body.scale.set(1, 0.6, 0.4);
  group.add(body);

  const tail = new THREE.Mesh(
    new THREE.ConeGeometry(0.3, 0.5, 24),
    new THREE.MeshStandardMaterial({ color: 0x00b4d8, roughness: 0.55 }),
  );
  tail.rotation.z = Math.PI / 2;
  tail.position.x = -0.6;
  group.add(tail);

  const eyeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.1 });
  const eyeGeometry = new THREE.SphereGeometry(0.08, 12, 12);
  const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
  leftEye.position.set(0.3, 0.1, 0.35);
  group.add(leftEye);
  const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
  rightEye.position.set(0.3, 0.1, -0.35);
  group.add(rightEye);

  return group;
};

const MindARController = ({ onAnchorFound, onAnchorLost, onError, onReady }) => {
  const containerRef = useRef(null);
  const mindarThreeRef = useRef(null);
  const animationFrameRef = useRef(null);
  const callbacksRef = useRef({ onAnchorFound, onAnchorLost, onError, onReady });
  const stepRef = useRef('正在載入 Three.js...');

  const [isLoaded, setIsLoaded] = useState(false);
  const [isTracking, setIsTracking] = useState(false);
  const [error, setError] = useState(null);
  const [loadingStep, setLoadingStep] = useState('正在載入 Three.js...');
  const [loadingTimeout, setLoadingTimeout] = useState(false);
  const [errorDetails, setErrorDetails] = useState(null);

  useEffect(() => {
    callbacksRef.current = { onAnchorFound, onAnchorLost, onError, onReady };
  }, [onAnchorFound, onAnchorLost, onError, onReady]);

  useEffect(() => {
    let cancelled = false;
    let threeScript = null;
    let timeoutId = null;
    let renderer = null;
    let failed = false;

    const setStep = (message) => {
      stepRef.current = message;
      if (!cancelled) setLoadingStep(message);
    };

    const fail = (err) => {
      if (cancelled || failed) return;
      failed = true;
      if (timeoutId) clearTimeout(timeoutId);

      const errorMessage = err?.message || 'AR 初始化失敗';
      const details = {
        step: stepRef.current,
        message: errorMessage,
        stack: err?.stack || '',
        userAgent: navigator.userAgent,
        url: window.location.href,
        timestamp: new Date().toISOString(),
      };

      setError(errorMessage);
      setErrorDetails(details);
      setLoadingStep('');

      const errorObject = new Error(errorMessage, { cause: err });
      errorObject.details = details;
      callbacksRef.current.onError?.(errorObject);
    };

    const loadAR = async () => {
      try {
        if (!window.THREE) {
          setStep('正在載入 Three.js...');
          let lastError = null;
          for (const url of THREE_CDN_URLS) {
            try {
              threeScript = await loadScript(url);
              if (window.THREE) break;
            } catch (err) {
              lastError = err;
            }
          }
          if (!window.THREE) {
            throw new Error(
              `Three.js 載入失敗，請檢查網路連線${lastError ? `（${lastError.message}）` : ''}`,
            );
          }
        }

        if (cancelled || failed) return;

        timeoutId = setTimeout(() => {
          if (cancelled) return;
          setLoadingTimeout(true);
          fail(new Error('AR 載入超時，請檢查網路連線後重試。'));
        }, 30000);

        if (cancelled || failed) return;
        setStep('正在載入 MindAR...');
        const mindarModule = await import(/* @vite-ignore */ MINDAR_MODULE_URL).catch((err) => {
          throw new Error('MindAR 模組載入失敗，請檢查網路連線。', { cause: err });
        });

        if (cancelled || failed) return;

        const MindARThree = mindarModule.MindARThree || window.MindARThree;
        if (!MindARThree) {
          throw new Error('MindARThree 未正確載入。');
        }

        if (!containerRef.current) {
          throw new Error('AR 容器尚未準備好，請重試。');
        }

        setStep('正在初始化 AR...');
        const mindarThree = new MindARThree({
          container: containerRef.current,
          imageTargetSrc: '/ar/oceanlens-target.mind',
          maxTrack: 1,
          uiScanning: false,
          uiLoading: false,
        });

        mindarThreeRef.current = mindarThree;

        const { renderer: mindarRenderer, scene, camera } = mindarThree;
        renderer = mindarRenderer;
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

        // MindAR expects anchors to exist before start().
        setStep('正在準備海洋生物...');
        const anchor = mindarThree.addAnchor(0);
        anchor.group.add(createPlaceholderCreature(window.THREE));

        anchor.onTargetFound = () => {
          if (cancelled) return;
          setIsTracking(true);
          callbacksRef.current.onAnchorFound?.();
        };
        anchor.onTargetLost = () => {
          if (cancelled) return;
          setIsTracking(false);
          callbacksRef.current.onAnchorLost?.();
        };

        setStep('正在啟動相機...');
        try {
          await mindarThree.start();
        } catch (err) {
          if (err?.name === 'NotAllowedError') {
            throw new Error('相機權限被拒絕，請允許相機權限後重試。', { cause: err });
          }
          if (err?.name === 'NotFoundError') {
            throw new Error('找不到可用的相機裝置。', { cause: err });
          }
          throw new Error('無法啟動相機，請確認沒有其他應用程式正在使用相機。', {
            cause: err,
          });
        }

        if (cancelled || failed) {
          await mindarThree.stop();
          return;
        }

        const video = containerRef.current.querySelector('video');
        if (video) {
          Object.assign(video.style, {
            position: 'absolute',
            inset: '0',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: '0',
          });
        }

        const canvas = containerRef.current.querySelector('canvas');
        if (canvas) {
          Object.assign(canvas.style, {
            position: 'absolute',
            inset: '0',
            width: '100%',
            height: '100%',
            zIndex: '1',
          });
        }

        const animate = () => {
          if (cancelled) return;
          renderer.render(scene, camera);
          animationFrameRef.current = requestAnimationFrame(animate);
        };
        animate();

        if (timeoutId) clearTimeout(timeoutId);
        setIsLoaded(true);
        setLoadingStep('');
        callbacksRef.current.onReady?.();
      } catch (err) {
        fail(err);
      }
    };

    loadAR();

    return () => {
      cancelled = true;
      if (timeoutId) clearTimeout(timeoutId);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (renderer) renderer.setAnimationLoop(null);
      if (mindarThreeRef.current) {
        Promise.resolve(mindarThreeRef.current.stop()).catch(() => {});
        mindarThreeRef.current = null;
      }
      if (threeScript?.parentNode) threeScript.parentNode.removeChild(threeScript);
    };
  }, []);

  if (error) {
    return (
      <div className="mindar-controller__error" role="alert">
        <p>AR 載入失敗</p>
        <p className="mindar-controller__error-detail">{error}</p>
        {errorDetails && (
          <div className="mindar-controller__error-debug">
            <p className="mindar-controller__error-debug-title">錯誤詳情：</p>
            <p className="mindar-controller__error-debug-item">步驟: {errorDetails.step}</p>
            <p className="mindar-controller__error-debug-item">時間: {errorDetails.timestamp}</p>
            {errorDetails.stack && (
              <details className="mindar-controller__error-debug-stack">
                <summary>查看錯誤堆疊</summary>
                <pre>{errorDetails.stack}</pre>
              </details>
            )}
          </div>
        )}
        <p className="mindar-controller__error-hint">請檢查網路與相機權限後重試</p>
      </div>
    );
  }

  return (
    <div className="mindar-controller">
      {!isLoaded && (
        <div className="mindar-controller__loading" role="status" aria-live="polite">
          <p className="mindar-controller__loading-step">{loadingStep}</p>
          {loadingTimeout && (
            <p className="mindar-controller__loading-timeout">載入超時，請重新整理頁面</p>
          )}
        </div>
      )}
      <div ref={containerRef} className="mindar-controller__canvas" />
      {isLoaded && !isTracking && (
        <div className="mindar-controller__instruction">
          <p>請將手機對準 OceanLens 圖像</p>
        </div>
      )}
      {isTracking && (
        <div className="mindar-controller__status" role="status">
          <p>✓ 已偵測到海洋生物</p>
        </div>
      )}
    </div>
  );
};

export default MindARController;
