import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import './MindARController.css';

const MindARController = ({ 
  onAnchorFound, 
  onAnchorLost, 
  onError,
  onReady 
}) => {
  const containerRef = useRef(null);
  const mindarThreeRef = useRef(null);
  const rendererRef = useRef(null);
  const animationFrameRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isTracking, setIsTracking] = useState(false);
  const [error, setError] = useState(null);
  const [loadingStep, setLoadingStep] = useState('正在檢查 Three.js...');
  const [loadingTimeout, setLoadingTimeout] = useState(false);
  const [errorDetails, setErrorDetails] = useState(null);

  // Early check for THREE
  if (!THREE) {
    console.error('[MindAR] THREE is null at component render');
    return (
      <div className="mindar-controller__error">
        <p>AR 載入失敗</p>
        <p className="mindar-controller__error-detail">Three.js 未正確載入</p>
        <p className="mindar-controller__error-hint">請重新整理頁面</p>
      </div>
    );
  }

  // Check Three.js availability immediately
  useEffect(() => {
    console.log('[MindAR] Component mounted');
    console.log('[MindAR] THREE object:', THREE);
    
    if (!THREE) {
      const errorMsg = 'Three.js 未正確載入';
      console.error('[MindAR]', errorMsg);
      setError(errorMsg);
      setErrorDetails({
        step: '正在檢查 Three.js...',
        message: errorMsg,
        stack: 'THREE object is null or undefined',
        userAgent: navigator.userAgent,
        url: window.location.href,
        timestamp: new Date().toISOString()
      });
      if (onError) onError(new Error(errorMsg));
      return;
    }
    
    setLoadingStep('正在初始化 AR...');
  }, []);

  useEffect(() => {
    let mindarScript = null;
    let threeScript = null;
    let mindarThree = null;
    let renderer = null;
    let timeoutId = null;

    const loadMindAR = async () => {
      try {
        console.log('[MindAR] Starting initialization...');
        setLoadingStep('正在初始化 AR...');
        
        // Check THREE again before proceeding
        if (!THREE) {
          throw new Error('Three.js 未正確載入');
        }
        
        // Set timeout to prevent infinite loading
        timeoutId = setTimeout(() => {
          console.error('[MindAR] Loading timeout after 30 seconds');
          setLoadingTimeout(true);
          setError('AR 載入超時，請檢查網路連線或重新整理頁面');
        }, 30000);
        
        // Three.js is already imported from node_modules
        console.log('[MindAR] Three.js loaded from node_modules');
        console.log('[MindAR] THREE object:', THREE);
        
        // Make THREE available globally for MindAR
        setLoadingStep('正在設定 Three.js...');
        window.THREE = THREE;
        console.log('[MindAR] window.THREE set:', window.THREE);

        setLoadingStep('正在載入 MindAR...');
        // Load MindAR from CDN with fallback
        const mindarCdnUrls = [
          'https://cdn.jsdelivr.net/npm/mind-ar@1.2.2/dist/mindar-image-three.prod.js',
          'https://unpkg.com/mind-ar@1.2.2/dist/mindar-image-three.prod.js'
        ];
        
        let mindarLoaded = false;
        for (const url of mindarCdnUrls) {
          try {
            console.log(`[MindAR] Trying MindAR from: ${url}`);
            setLoadingStep(`正在載入 MindAR (${url})...`);
            mindarScript = document.createElement('script');
            mindarScript.src = url;
            mindarScript.async = true;
            
            await new Promise((resolve, reject) => {
              mindarScript.onload = () => {
                console.log('[MindAR] MindAR loaded');
                resolve();
              };
              mindarScript.onerror = () => {
                console.error(`[MindAR] MindAR failed to load from: ${url}`);
                reject(new Error(`MindAR 載入失敗: ${url}`));
              };
              document.head.appendChild(mindarScript);
            });
            mindarLoaded = true;
            break;
          } catch (err) {
            console.error(`[MindAR] Failed to load MindAR from ${url}, trying next...`);
            if (mindarScript) {
              document.head.removeChild(mindarScript);
            }
            continue;
          }
        }
        
        if (!mindarLoaded) {
          clearTimeout(timeoutId);
          throw new Error('所有 MindAR CDN 來源載入失敗，請檢查網路連線');
        }

        setLoadingStep('正在初始化 MindAR...');
        // Initialize MindAR after scripts load
        if (!window.MindARThree) {
          clearTimeout(timeoutId);
          throw new Error('MindARThree 未正確載入');
        }
        
        if (!containerRef.current) {
          clearTimeout(timeoutId);
          throw new Error('容器 ref 未設置');
        }

        console.log('[MindAR] Creating MindARThree instance...');
        setLoadingStep('正在建立 MindAR 實例...');
        mindarThree = new window.MindARThree({
          container: containerRef.current,
          imageTargetSrc: '/ar/oceanlens-target.mind',
          maxTrack: 1,
          uiScanning: false,
          uiLoading: false,
        });

        console.log('[MindAR] Starting MindAR...');
        setLoadingStep('正在啟動相機...');
        const { renderer: mindarRenderer, scene, camera } = await mindarThree.start();
        
        console.log('[MindAR] MindAR started successfully');
        clearTimeout(timeoutId);
        renderer = mindarRenderer;
        mindarThreeRef.current = mindarThree;
        rendererRef.current = renderer;

        // Add anchor for target 0
        console.log('[MindAR] Adding anchor for target 0...');
        const anchor = mindarThree.addAnchor(0);
        
        // Add placeholder fish geometry
        console.log('[MindAR] Creating placeholder fish...');
        const fishGroup = createPlaceholderFish();
        anchor.group.add(fishGroup);

        // Handle anchor events
        anchor.onTargetFound = () => {
          console.log('[MindAR] Target found');
          setIsTracking(true);
          if (onAnchorFound) onAnchorFound();
        };

        anchor.onTargetLost = () => {
          console.log('[MindAR] Target lost');
          setIsTracking(false);
          if (onAnchorLost) onAnchorLost();
        };

        // Start animation loop
        console.log('[MindAR] Starting animation loop...');
        const animate = () => {
          animationFrameRef.current = requestAnimationFrame(animate);
          renderer.render(scene, camera);
        };
        animate();

        console.log('[MindAR] Initialization complete');
        setIsLoaded(true);
        setLoadingStep('');
        if (onReady) onReady();
      } catch (err) {
        console.error('[MindAR] Initialization error:', err);
        if (timeoutId) clearTimeout(timeoutId);
        
        const errorMessage = err.message || 'AR 初始化失敗';
        const errorStack = err.stack || '';
        const userAgent = navigator.userAgent;
        
        setError(errorMessage);
        setErrorDetails({
          step: loadingStep,
          message: errorMessage,
          stack: errorStack,
          userAgent: userAgent,
          url: window.location.href,
          timestamp: new Date().toISOString()
        });
        setLoadingStep('');
        
        // Pass error with details to parent
        const errorObj = new Error(errorMessage);
        errorObj.details = {
          step: loadingStep,
          message: errorMessage,
          stack: errorStack,
          userAgent: userAgent,
          url: window.location.href,
          timestamp: new Date().toISOString()
        };
        if (onError) onError(errorObj);
      }
    };

    loadMindAR();

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (mindarThreeRef.current) {
        mindarThreeRef.current.stop();
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      if (mindarScript) {
        document.head.removeChild(mindarScript);
      }
      if (threeScript) {
        document.head.removeChild(threeScript);
      }
    };
  }, [onAnchorFound, onAnchorLost, onError, onReady]);

  // Create placeholder fish geometry
  const createPlaceholderFish = () => {
    const group = new THREE.Group();
    
    // Fish body (sphere)
    const bodyGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const bodyMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x00f5d4,
      roughness: 0.5,
      metalness: 0.3
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.scale.set(1, 0.6, 0.4);
    group.add(body);

    // Fish tail (cone)
    const tailGeometry = new THREE.ConeGeometry(0.3, 0.5, 32);
    const tailMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x00b4d8,
      roughness: 0.5,
      metalness: 0.3
    });
    const tail = new THREE.Mesh(tailGeometry, tailMaterial);
    tail.rotation.z = Math.PI / 2;
    tail.position.x = -0.6;
    group.add(tail);

    // Fish fins
    const finGeometry = new THREE.ConeGeometry(0.15, 0.3, 32);
    const finMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x0077b6,
      roughness: 0.5,
      metalness: 0.3
    });
    
    const topFin = new THREE.Mesh(finGeometry, finMaterial);
    topFin.position.set(0, 0.4, 0);
    group.add(topFin);

    const bottomFin = new THREE.Mesh(finGeometry, finMaterial);
    bottomFin.position.set(0, -0.4, 0);
    bottomFin.rotation.x = Math.PI;
    group.add(bottomFin);

    // Eyes
    const eyeGeometry = new THREE.SphereGeometry(0.08, 16, 16);
    const eyeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const pupilGeometry = new THREE.SphereGeometry(0.04, 16, 16);
    const pupilMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });

    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(0.3, 0.1, 0.35);
    group.add(leftEye);

    const leftPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
    leftPupil.position.set(0.35, 0.1, 0.4);
    group.add(leftPupil);

    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.3, 0.1, -0.35);
    group.add(rightEye);

    const rightPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
    rightPupil.position.set(0.35, 0.1, -0.4);
    group.add(rightPupil);

    return group;
  };

  if (error) {
    return (
      <div className="mindar-controller__error">
        <p>AR 載入失敗</p>
        <p className="mindar-controller__error-detail">{error}</p>
        {errorDetails && (
          <div className="mindar-controller__error-debug">
            <p className="mindar-controller__error-debug-title">錯誤詳情：</p>
            <p className="mindar-controller__error-debug-item">步驟: {errorDetails.step}</p>
            <p className="mindar-controller__error-debug-item">時間: {errorDetails.timestamp}</p>
            <p className="mindar-controller__error-debug-item">設備: {errorDetails.userAgent}</p>
            <p className="mindar-controller__error-debug-item">URL: {errorDetails.url}</p>
            {errorDetails.stack && (
              <details className="mindar-controller__error-debug-stack">
                <summary>查看錯誤堆疊</summary>
                <pre>{errorDetails.stack}</pre>
              </details>
            )}
          </div>
        )}
        <p className="mindar-controller__error-hint">請檢查網路連線後重新整理頁面</p>
      </div>
    );
  }

  return (
    <div className="mindar-controller">
      {!isLoaded && (
        <div className="mindar-controller__loading">
          <p className="mindar-controller__loading-step">{loadingStep}</p>
          {loadingTimeout && (
            <p className="mindar-controller__loading-timeout">
              載入超時，請重新整理頁面
            </p>
          )}
        </div>
      )}
      <div 
        ref={containerRef} 
        className="mindar-controller__canvas"
        style={{ width: '100%', height: '100%' }}
      />
      {isLoaded && !isTracking && (
        <div className="mindar-controller__instruction">
          <p>請將手機對準 OceanLens 圖像</p>
        </div>
      )}
      {isTracking && (
        <div className="mindar-controller__status">
          <p>✓ 已偵測到海洋生物</p>
        </div>
      )}
    </div>
  );
};

export default MindARController;
