import React from 'react';
import { Sphere, Cone, Torus } from '@react-three/drei';

// TODO: Replace placeholder geometry with licensed GLB/GLTF models
// Current implementation uses simple geometric shapes as placeholders
// Future: Load actual 3D models using useGLTF from @react-three/drei

const MarineCreature = ({ type = 'fish', scale = 1, position = [0, 0, 0] }) => {
  const creatureProps = {
    scale,
    position,
  };
  
  // Placeholder creatures using simple geometry
  switch (type) {
    case 'anglerfish':
      // Anglerfish placeholder - sphere body + cone lure
      return (
        <group {...creatureProps}>
          <Sphere args={[0.5, 32, 32]} position={[0, 0, 0]}>
            <meshStandardMaterial color="#4a4a4a" roughness={0.8} />
          </Sphere>
          <Cone args={[0.1, 0.8, 8]} position={[0, 0.6, 0]} rotation={[0, 0, Math.PI]}>
            <meshStandardMaterial color="#ff6b6b" emissive="#ff0000" emissiveIntensity={0.5} />
          </Cone>
          <Sphere args={[0.15, 16, 16]} position={[0.3, 0.1, 0.2]}>
            <meshStandardMaterial color="#ffffff" />
          </Sphere>
          <Sphere args={[0.15, 16, 16]} position={[-0.3, 0.1, 0.2]}>
            <meshStandardMaterial color="#ffffff" />
          </Sphere>
        </group>
      );
    
    case 'jellyfish':
      // Jellyfish placeholder - hemisphere + tentacles
      return (
        <group {...creatureProps}>
          <Sphere args={[0.6, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} position={[0, 0.3, 0]}>
            <meshStandardMaterial color="#00b4d8" transparent opacity={0.6} />
          </Sphere>
          <Torus args={[0.3, 0.05, 8, 32]} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial color="#00b4d8" transparent opacity={0.4} />
          </Torus>
        </group>
      );
    
    case 'turtle':
      // Turtle placeholder - flattened sphere
      return (
        <group {...creatureProps}>
          <Sphere args={[0.7, 32, 32, 0, Math.PI * 2, 0, Math.PI]} scale={[1, 0.4, 1.2]}>
            <meshStandardMaterial color="#2d5a27" roughness={0.9} />
          </Sphere>
          <Sphere args={[0.25, 16, 16]} position={[0, 0.15, 0.6]}>
            <meshStandardMaterial color="#3d7a37" />
          </Sphere>
          <Sphere args={[0.15, 16, 16]} position={[0.5, 0, 0]}>
            <meshStandardMaterial color="#3d7a37" />
          </Sphere>
          <Sphere args={[0.15, 16, 16]} position={[-0.5, 0, 0]}>
            <meshStandardMaterial color="#3d7a37" />
          </Sphere>
        </group>
      );
    
    case 'shark':
      // Shark placeholder - elongated body
      return (
        <group {...creatureProps}>
          <Sphere args={[0.4, 32, 32]} scale={[2, 0.5, 0.6]} position={[0, 0, 0]}>
            <meshStandardMaterial color="#4a5568" roughness={0.7} />
          </Sphere>
          <Cone args={[0.15, 0.4, 8]} position={[0.8, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
            <meshStandardMaterial color="#4a5568" />
          </Cone>
          <Sphere args={[0.1, 16, 16]} position={[0.3, 0.2, 0.2]}>
            <meshStandardMaterial color="#2d3748" />
          </Sphere>
          <Sphere args={[0.1, 16, 16]} position={[0.3, 0.2, -0.2]}>
            <meshStandardMaterial color="#2d3748" />
          </Sphere>
        </group>
      );
    
    case 'whale':
      // Whale placeholder - large elongated body
      return (
        <group {...creatureProps}>
          <Sphere args={[1, 32, 32]} scale={[3, 0.8, 1]} position={[0, 0, 0]}>
            <meshStandardMaterial color="#1a365d" roughness={0.8} />
          </Sphere>
          <Sphere args={[0.3, 16, 16]} position={[2.5, 0.2, 0]}>
            <meshStandardMaterial color="#2c5282" />
          </Sphere>
          <Sphere args={[0.15, 16, 16]} position={[0.5, 0.4, 0.3]}>
            <meshStandardMaterial color="#1a365d" />
          </Sphere>
          <Sphere args={[0.15, 16, 16]} position={[0.5, 0.4, -0.3]}>
            <meshStandardMaterial color="#1a365d" />
          </Sphere>
        </group>
      );
    
    case 'coral':
      // Coral placeholder - multiple spheres
      return (
        <group {...creatureProps}>
          <Sphere args={[0.3, 16, 16]} position={[0, 0, 0]}>
            <meshStandardMaterial color="#ff6b6b" roughness={0.9} />
          </Sphere>
          <Sphere args={[0.2, 16, 16]} position={[0.4, 0.2, 0.2]}>
            <meshStandardMaterial color="#ff8787" roughness={0.9} />
          </Sphere>
          <Sphere args={[0.25, 16, 16]} position={[-0.3, 0.3, -0.1]}>
            <meshStandardMaterial color="#ff5252" roughness={0.9} />
          </Sphere>
          <Sphere args={[0.15, 16, 16]} position={[0.2, 0.5, 0.1]}>
            <meshStandardMaterial color="#ffb3b3" roughness={0.9} />
          </Sphere>
        </group>
      );
    
    default:
      // Generic fish
      return (
        <group {...creatureProps}>
          <Sphere args={[0.3, 32, 32]} scale={[1.5, 0.6, 0.5]} position={[0, 0, 0]}>
            <meshStandardMaterial color="#48bb78" roughness={0.7} />
          </Sphere>
          <Cone args={[0.1, 0.3, 8]} position={[0.5, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
            <meshStandardMaterial color="#48bb78" />
          </Cone>
        </group>
      );
  }
};

export default MarineCreature;
