import * as React from 'react';
import { useMemo } from 'react';
import * as THREE from 'three';
import { MeshProps, useThree } from '@react-three/fiber';

// Extend Three.js elements for TypeScript
// Extend Three.js elements for TypeScript - definitions removed as they conflict with @react-three/fiber types

interface TreeProps {
  position?: [number, number, number];
  scale?: number;
}

export const Tree3D: React.FC<TreeProps> = ({ position = [0, 0, 0], scale = 1 }) => {
  const leaves = useMemo(() => {
    const leavesData: Array<{
      position: [number, number, number];
      scale: number;
      rotation: [number, number, number];
    }> = [];

    const leafCount = 50;

    for (let i = 0; i < leafCount; i++) {
      const radius = 1 + Math.random() * 2;
      const angle = Math.random() * Math.PI * 2;
      const height = 1 + Math.random() * 2;

      leavesData.push({
        position: [
          Math.cos(angle) * radius * 0.5,
          height,
          Math.sin(angle) * radius * 0.5
        ] as [number, number, number],
        scale: 0.5 + Math.random() * 0.8,
        rotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        ] as [number, number, number]
      });
    }
    return leavesData;
  }, []);

  const scaleArray = React.useMemo(() => [scale, scale, scale] as [number, number, number], [scale]);

  return (
    <group position={position} scale={scaleArray}>
      {/* Tree trunk */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.4, 1, 8]} />
        <meshStandardMaterial
          color="#8B4513"
          roughness={0.8}
        />
      </mesh>

      {/* Tree leaves */}
      {leaves.map((leaf, i) => {
        const leafScale = [leaf.scale, leaf.scale, leaf.scale] as [number, number, number];
        return (
          <mesh
            key={i}
            position={leaf.position}
            scale={leafScale}
            rotation={leaf.rotation}
            castShadow
          >
            <sphereGeometry args={[1, 8, 8]} />
            <meshStandardMaterial
              color="#4CAF50"
              roughness={0.5}
              transparent
              opacity={0.8}
            />
          </mesh>
        );
      })}
    </group>
  );
};
