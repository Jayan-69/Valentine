import * as React from 'react';
import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface HeartProps {
  position: [number, number, number];
  scale?: number;
  onClick?: () => void;
}

export const Heart3D: React.FC<HeartProps> = ({ position, scale = 1, onClick }) => {
  const heartRef = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);

  useFrame(({ clock }) => {
    if (heartRef.current) {
      heartRef.current.rotation.y = clock.getElapsedTime() * 0.5;
      heartRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.1;
    }
  });

  // Use a simple sphere for the heart shape
  const heartGeometry = useMemo(() => {
    return new THREE.SphereGeometry(0.5, 32, 32);
  }, []);
  
  // Create a material with the desired properties
  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#ff3366',
      roughness: 0.3,
      metalness: 0.1,
      emissive: '#ff3366',
      emissiveIntensity: hovered ? 0.5 : 0.2
    });
  }, [hovered]);

  return (
    <group position={position} scale={[scale, scale, scale]}>
      <mesh
        ref={heartRef}
        scale={hovered ? 1.2 : 1}
        onClick={onClick}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        castShadow
        receiveShadow
      >
        <primitive object={heartGeometry} attach="geometry" />
        <primitive object={material} attach="material" />
      </mesh>
    </group>
  );
};
