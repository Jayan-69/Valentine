import React, { useRef, useState, useCallback, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text as TextDrei, Html } from '@react-three/drei';
import { Group, MeshStandardMaterial } from 'three';
import * as THREE from 'three';
import './AnimatedText.css';

// Valentine's quotes array
const valentineQuotes = [
  "You're the love of my life",
  "My heart belongs to you",
  "Forever and always",
  "You're my everything",
  "Love you to the moon and back",
  "You're my happily ever after",
  "Every love story is beautiful, but ours is my favorite",
  "You're my favorite notification"
];

interface AnimatedTextProps {
  children: React.ReactNode;
  color?: string;
  hoverColor?: string;
  fontSize?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
  onClick?: () => void;
  [key: string]: any;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  children = valentineQuotes[Math.floor(Math.random() * valentineQuotes.length)],
  color = '#ff3366',
  hoverColor = '#ff69b4',
  fontSize = 0.4,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  onClick,
  ...props
}) => {
  const textRef = useRef<Group>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [showFallback, setShowFallback] = useState(false);
  const clockRef = useRef(new THREE.Clock());

  // Create refs for hover state, current color, target color, and scale factor
  const hoverState = useRef(0);
  const currentColor = useRef(new THREE.Color(color));
  const targetColor = useRef(new THREE.Color(color));
  const scaleFactor = useRef(1);

  // Material for the text
  const textMaterial = useMemo(() => {
    const mat = new MeshStandardMaterial({
      color: new THREE.Color(color),
      roughness: 0.2,
      metalness: 0.1,
      emissive: new THREE.Color(color),
      emissiveIntensity: 0.3
    });
    return mat;
  }, [color]);

  // Handle hover state
  const handlePointerOver = useCallback(() => setIsHovered(true), []);
  const handlePointerOut = useCallback(() => setIsHovered(false), []);

  // Animation loop
  useFrame(({ clock }) => {
    if (!textRef.current) return;

    const time = clock.getElapsedTime();

    // Smooth hover state transition
    hoverState.current = THREE.MathUtils.lerp(
      hoverState.current,
      isHovered ? 1 : 0,
      0.1
    );

    // Color pulse effect
    const colorPulse = Math.sin(time * 0.5) * 0.1 + 0.9;

    // Update colors with pulse effect
    if (isHovered) {
      targetColor.current.set(hoverColor).multiplyScalar(colorPulse);
    } else {
      targetColor.current.set(color).multiplyScalar(colorPulse);
    }
    currentColor.current.lerp(targetColor.current, 0.1);

    // Floating animation with easing
    const floatY = Math.sin(time * 0.8) * 0.05;
    const floatX = Math.sin(time * 0.5) * 0.02;
    const rotationY = Math.sin(time * 0.3) * 0.1;

    // Dynamic scale based on time and hover state
    const hoverScale = isHovered ? 1.3 : 1;
    const pulseScale = Math.sin(time * 2) * 0.05 + 1;
    scaleFactor.current = THREE.MathUtils.lerp(
      scaleFactor.current,
      hoverScale * pulseScale,
      0.1
    );

    // Apply smooth transformations
    if (textRef.current) {
      textRef.current.position.y = position[1] + floatY + hoverState.current * 0.1;
      textRef.current.position.x = position[0] + floatX;
      textRef.current.rotation.y = rotation[1] + rotationY + hoverState.current * 0.2;
      textRef.current.rotation.x = Math.sin(time * 0.4) * 0.05;

      const finalScale = Array.isArray(scale)
        ? [
          scale[0] * scaleFactor.current,
          scale[1] * scaleFactor.current,
          (scale[2] || 1) * scaleFactor.current
        ]
        : scale * scaleFactor.current;

      if (Array.isArray(finalScale)) {
        textRef.current.scale.set(finalScale[0], finalScale[1], finalScale[2]);
      } else {
        textRef.current.scale.set(finalScale, finalScale, finalScale);
      }
    }
  });

  // This was a duplicate declaration - removed

  // Handle font loading error
  const handleFontError = useCallback(() => {
    console.warn('Font loading failed, falling back to HTML text');
    setShowFallback(true);
  }, []);

  // Convert scale to Vector3 if it's a number
  const scaleVector = useMemo((): [number, number, number] => {
    return typeof scale === 'number' ? [scale, scale, scale] : scale || [1, 1, 1];
  }, [scale]);

  // Show fallback if font loading failed
  if (showFallback) {
    return (
      <group position={[0, 0, 0]}>
        <Html center className="fallback-container">
          <div className="fallback-text">
            <div className="fallback-text-inner">
              {children}
            </div>
          </div>
        </Html>
      </group>
    );
  }

  return (
    <group
      ref={textRef as any}
      position={position}
      rotation={rotation}
      scale={scaleVector}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={onClick}
    >
      {/* @ts-ignore - onError is needed for font loading but not in types */}
      <TextDrei
        font="/Roboto-Bold.ttf"
        color={currentColor.current}
        fontSize={fontSize}
        letterSpacing={0.1}
        lineHeight={1.2}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
        maxWidth={8}
        // @ts-ignore - onError is needed for font loading but not in types
        onError={handleFontError}
        {...props}
      >
        <primitive object={textMaterial} attach="material" />
        {children}
      </TextDrei>

      {/* Enhanced lighting effects */}
      <pointLight
        color={color}
        intensity={0.5 + hoverState.current * 0.8}
        distance={8}
        position={[0, 0, 2]}
        castShadow
      />

      {/* Ambient light with pulse effect */}
      <ambientLight
        intensity={0.3 + Math.sin(clockRef.current.getElapsedTime() * 2) * 0.1}
        color={color}
      />

      {/* Hover effect ring - removed */}
      {/* <mesh position={[0, -0.5, -1]} rotation={[-Math.PI / 2, 0, 0]} visible={isHovered}>
        <ringGeometry args={[3, 3.5, 32]} />
        <meshBasicMaterial 
          color={color} 
          transparent 
          opacity={0.3} 
          side={THREE.DoubleSide}
        />
      </mesh> */}

      {/* Subtle particles */}
      <points>
        <bufferGeometry attach="geometry">
          <bufferAttribute
            attach="attributes-position"
            count={100}
            array={new Float32Array(
              Array(100 * 3).fill(0).map(() => (Math.random() - 0.5) * 10)
            )}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color={color}
          size={0.1}
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>
    </group>
  );
};

export default AnimatedText;
