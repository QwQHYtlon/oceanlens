import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';

const OceanParticles = ({ depth = 0 }) => {
  const particlesRef = useRef();
  
  // Calculate particle count based on depth
  const particleCount = useMemo(() => {
    // More particles at deeper depths
    const baseCount = 100;
    const depthMultiplier = 1 + (depth / 1000);
    return Math.floor(baseCount * depthMultiplier);
  }, [depth]);
  
  // Generate particle positions
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20; // x
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20; // y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20; // z
    }
    return pos;
  }, [particleCount]);
  
  // Calculate particle size based on depth
  const particleSize = useMemo(() => {
    // Smaller particles at deeper depths
    const baseSize = 0.05;
    const depthFactor = 1 - (depth / 6000) * 0.5;
    return baseSize * depthFactor;
  }, [depth]);
  
  // Calculate particle color based on depth
  const particleColor = useMemo(() => {
    // Lighter at shallow depths, darker at deep depths
    if (depth < 100) return 0x00b4d8;
    if (depth < 500) return 0x0077b6;
    if (depth < 1000) return 0x023e8a;
    return 0x03045e;
  }, [depth]);
  
  useFrame((state) => {
    if (particlesRef.current) {
      // Animate particles upward (bubbles)
      const positions = particlesRef.current.geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += 0.01; // Move up
        
        // Reset if too high
        if (positions[i * 3 + 1] > 10) {
          positions[i * 3 + 1] = -10;
        }
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
      
      // Gentle rotation
      particlesRef.current.rotation.y += 0.0005;
    }
  });
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={particleSize}
        color={particleColor}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

export default OceanParticles;
