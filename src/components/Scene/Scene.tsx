import React, { useRef, useState, Suspense } from 'react';
import { useFrame, useThree, extend, ReactThreeFiber } from '@react-three/fiber';
import { Text as TextDrei, Sparkles, Float, Html } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { Couple3D } from '../3D/Couple';
import AnimatedText from '../3D/AnimatedText';
import * as THREE from 'three';
import { Group } from 'three';

type Vector3 = [number, number, number];

// Extend Three.js elements for TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      // Custom elements
      color: {
        attach: string;
        args: [THREE.ColorRepresentation];
      };

      fog: {
        attach: string;
        args: [THREE.ColorRepresentation, number, number];
      };
    }
  }
}

// Error boundary component for the 3D scene
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Scene Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Html center>
          <div className="error-message">
            <h3>Something went wrong in the 3D scene.</h3>
            <p>Check the console for more details.</p>
          </div>
        </Html>
      );
    }
    return this.props.children;
  }
}

const SceneContent: React.FC = () => {
  const [error, setError] = useState<Error | null>(null);

  // Catch any async errors
  if (error) {
    return (
      <Html center>
        <div className="error-message">
          <h3>Error loading scene</h3>
          <p>{error.message}</p>
        </div>
      </Html>
    );
  }

  try {
    console.log('Scene component rendering...');
    const messageRef = useRef<Group>(null);

    // Simple wrapper for the animated text
    const Text = ({ children, ...props }: { children: React.ReactNode } & any) => (
      <AnimatedText
        color="#ff3366"
        hoverColor="#ff69b4"
        fontSize={0.5}
        position={[0, 0, 0]}
        {...props}
      >
        {children}
      </AnimatedText>
    );

    // Ensure the font is preloaded
    React.useEffect(() => {
      // This helps with font loading and caching
      const link = document.createElement('link');
      link.href = 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap';
      link.rel = 'stylesheet';
      document.head.appendChild(link);

      return () => {
        document.head.removeChild(link);
      };
    }, []);

    // Camera is now controlled by App.tsx

    // Animation loop for camera rotation
    useFrame(({ clock }) => {
      if (messageRef.current) {
        messageRef.current.rotation.y = clock.getElapsedTime() * 0.3;
      }
    });

    console.log('Rendering 3D scene...');
    return (
      <>

        {/* Background and Fog - Removed to show CSS gradient */}
        {/* <color attach="background" args={['#f8f0ff']} /> */}
        {/* Fog is handled in App.tsx or removed to show gradient clarity */}

        {/* Lights - softer and more natural for better detail visibility */}
        <ambientLight intensity={1.1} />
        <pointLight position={[3, 5, 5]} intensity={1.0} color="#ffffff" castShadow />
        <pointLight position={[-3, 5, 5]} intensity={0.8} color="#ffffff" castShadow />
        <pointLight position={[0, 3, 5]} intensity={0.5} color="#ffffff" />
        <hemisphereLight args={['#ffffff', '#ffdde1', 0.6]} />

        {/* Ground */}
        {/* Ground - transparent to show gradient but catch shadows */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]} receiveShadow>
          <planeGeometry args={[50, 50]} />
          <shadowMaterial opacity={0} transparent />
        </mesh>

        {/* Main couple - even larger and more visible */}
        <Couple3D position={[0, -2.5, 0]} scale={2.5} />


        {/* Floating message - centered above the couple */}
        <group ref={messageRef as any} position={[0, 4.5, 1]}>
          <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
            <group>
              <Text
                color="#ff0044"
                fontSize={0.6}
                maxWidth={6}
                lineHeight={1}
                letterSpacing={0.05}
                textAlign="center"
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.02}
                outlineColor="#440011"
                outlineOpacity={0.8}
              >
                Happy Valentine's Day!
              </Text>
            </group>
          </Float>
        </group>

        {/* Effects - Reduced bloom so it doesn't wash out details */}
        <EffectComposer>
          <Bloom
            intensity={0.5}
            luminanceThreshold={0.6}
            luminanceSmoothing={0.9}
            height={300}
          />
        </EffectComposer>

        {/* Sparkles */}
        <Sparkles
          count={100}
          size={2}
          speed={0.5}
          opacity={0.8}
          scale={10}
          color="#ff69b4"
          noise={0.2}
        />
      </>
    );
  } catch (e) {
    console.error('Error in SceneContent:', e);
    setError(e as Error);
    return null;
  }
};

interface SceneProps { }

const Scene: React.FC<SceneProps> = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={
        <Html center>
          <div className="loading">Loading 3D scene...</div>
        </Html>
      }>
        <SceneContent />
      </Suspense>
    </ErrorBoundary>
  );
}

export default Scene;
