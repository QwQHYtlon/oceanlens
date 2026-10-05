import React, { useMemo } from 'react';
import { useThree } from '@react-three/fiber';

const DepthEnvironment = ({ depth = 0 }) => {
  const { scene } = useThree();
  
  // Calculate environment parameters based on depth
  const environment = useMemo(() => {
    if (depth < 100) {
      // Surface zone - bright, blue
      return {
        fogColor: 0x00b4d8,
        fogNear: 10,
        fogFar: 50,
        backgroundColor: 0x00b4d8,
        ambientIntensity: 0.8,
        directionalIntensity: 1.0,
        lightColor: 0xffffff
      };
    } else if (depth < 500) {
      // Mesopelagic - dimmer
      return {
        fogColor: 0x0077b6,
        fogNear: 5,
        fogFar: 30,
        backgroundColor: 0x0077b6,
        ambientIntensity: 0.5,
        directionalIntensity: 0.5,
        lightColor: 0x88ccff
      };
    } else if (depth < 1000) {
      // Bathypelagic - dark
      return {
        fogColor: 0x023e8a,
        fogNear: 3,
        fogFar: 20,
        backgroundColor: 0x023e8a,
        ambientIntensity: 0.3,
        directionalIntensity: 0.2,
        lightColor: 0x4466aa
      };
    } else if (depth < 4000) {
      // Abyssopelagic - very dark
      return {
        fogColor: 0x03045e,
        fogNear: 2,
        fogFar: 15,
        backgroundColor: 0x03045e,
        ambientIntensity: 0.15,
        directionalIntensity: 0.1,
        lightColor: 0x223355
      };
    } else {
      // Hadal - extremely dark
      return {
        fogColor: 0x020c1b,
        fogNear: 1,
        fogFar: 10,
        backgroundColor: 0x020c1b,
        ambientIntensity: 0.08,
        directionalIntensity: 0.05,
        lightColor: 0x112233
      };
    }
  }, [depth]);
  
  return (
    <>
      <fog
        attach="fog"
        color={environment.fogColor}
        near={environment.fogNear}
        far={environment.fogFar}
      />
      <color attach="background" args={[environment.backgroundColor]} />
      <ambientLight intensity={environment.ambientIntensity} color={environment.lightColor} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={environment.directionalIntensity}
        color={environment.lightColor}
        castShadow
      />
    </>
  );
};

export default DepthEnvironment;
