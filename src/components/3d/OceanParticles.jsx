import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { AdditiveBlending } from 'three';

// Deterministic value noise keeps particle generation pure across renders.
const pseudoRandom = (index, salt, depth) => {
  const value = Math.sin(index * 12.9898 + salt * 78.233 + depth * 0.017) * 43758.5453;
  return value - Math.floor(value);
};

const OceanParticles = ({ depth = 0 }) => {
  const particlesRef = useRef();
  
  // Calculate particle count based on depth
  const particleCount = useMemo(() => {
    // More particles at deeper depths
    const baseCount = 100;
    const depthMultiplier = 1 + Math.min(depth, 6000) / 1000;
    return Math.floor(baseCount * depthMultiplier);
  }, [depth]);
  
  // Generate particle positions
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (pseudoRandom(i, 1, depth) - 0.5) * 20; // x
      pos[i * 3 + 1] = (pseudoRandom(i, 2, depth) - 0.5) * 20; // y
      pos[i * 3 + 2] = (pseudoRandom(i, 3, depth) - 0.5) * 20; // z
    }
    return pos;
  }, [particleCount, depth]);
  
  // Calculate particle size based on depth
  const particleSize = useMemo(() => {
    // Smaller particles at deeper depths
    const baseSize = 0.065;
    const depthFactor = 1 - (Math.min(depth, 6000) / 6000) * 0.35;
    return baseSize * depthFactor;
  }, [depth]);
  
  // Calculate particle color based on depth
  const particleColor = useMemo(() => {
    // Lighter at shallow depths, darker at deep depths
    if (depth < 200) return 0x00b4d8;
    if (depth < 1000) return 0x48cae4;
    if (depth < 4000) return 0x90e0ef;
    return 0x64ffda;
  }, [depth]);
  
  useFrame(() => {
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
    <points key={particleCount} ref={particlesRef}>
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
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  );
};

export default OceanParticles;
