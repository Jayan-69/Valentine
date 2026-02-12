import * as React from 'react';
import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, Html } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import gsap from 'gsap';

// Components
import Scene from './components/Scene/Scene';

// Styles
import './App.css';
import './animations.css';

// Loading component for Suspense fallback
const Loader = () => (
  <Html center>
    <div className="loader-text">Loading 3D content...</div>
  </Html>
);

const App: React.FC = () => {
  console.log('App component rendering...');
  const [muted, setMuted] = useState(true);
  const [animationComplete, setAnimationComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  console.log('Animation complete state:', animationComplete);

  // Set mounted state
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Intro animation timeline
  useEffect(() => {
    if (!isMounted) return;

    const tl = gsap.timeline({
      onComplete: () => setAnimationComplete(true)
    });

    tl.fromTo(
      '.valentine-container',
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1.5,
        ease: 'power2.inOut'
      }
    );

    return () => {
      if (tl) {
        (tl as any).kill();
      }
    };
  }, [isMounted]);

  // Audio setup
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio
    const audio = new Audio(encodeURI('/music/Brooklyn Duo - A Thousand Years [WEDDING VERSION].mp3'));
    audio.loop = true;
    audio.volume = 0.6;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  // Handle play/pause based on muted state
  useEffect(() => {
    if (audioRef.current) {
      if (muted) {
        audioRef.current.pause();
      } else {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.log("Audio playback failed:", error);
          });
        }
      }
    }
  }, [muted]);

  console.log('Rendering Canvas...');
  if (!isMounted) return null;

  return (
    <div className="valentine-container" ref={containerRef}>
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        camera={{
          position: [0, 1.5, 5],
          fov: 60,
          near: 0.1,
          far: 1000,
        }}
        onCreated={({ gl, scene, camera }) => {
          console.log('WebGL context created:', gl);
          console.log('Scene:', scene);
          console.log('Camera:', camera);
          camera.lookAt(0, -0.5, 0);
        }}
      >
        {/* <color attach="background" args={['#f8f0ff']} /> - Removed to show CSS gradient */}
        <fog attach="fog" args={['#fff0f5', 10, 30]} />

        <Suspense fallback={<Loader />}>
          <Scene />
          <OrbitControls
            enableZoom={true}
            enablePan={true}
            maxPolarAngle={Math.PI / 1.5}
            minPolarAngle={Math.PI / 3}
          />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
          <pointLight position={[-10, 10, -10]} intensity={0.8} color="#ff69b4" />
          <pointLight position={[0, 10, 0]} intensity={0.5} color="#ff3366" />
          <EffectComposer>
            <Bloom
              luminanceThreshold={0.8}
              luminanceSmoothing={0.9}
              intensity={0.4}
              height={300}
            />
          </EffectComposer>
          <Environment preset="sunset" />
        </Suspense>
      </Canvas>

      {animationComplete && (
        <>
          {/* Rain animation with quotes */}
          <div className="quote-rain">
            {[...Array(15)].map((_, i) => {
              // Vibrant lovable colors: Blues, Greens, Oranges, Pinks, Purples
              const colors = [
                '#ff3366', // Red-Pink
                '#ff69b4', // Hot Pink
                '#1e90ff', // Dodger Blue
                '#32cd32', // Lime Green
                '#ffa500', // Orange
                '#9370db', // Medium Purple
                '#ff1493', // Deep Pink
                '#00ced1', // Dark Turquoise
                '#ff4500', // Orange Red
                '#ffd700', // Gold
                '#dc143c', // Crimson
                '#ba55d3', // Medium Orchid
                '#00bfff'  // Deep Sky Blue
              ];
              const randomColor = colors[Math.floor(Math.random() * colors.length)];

              return (
                <div
                  key={i}
                  className="quote-item"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${8 + Math.random() * 4}s`,
                    color: randomColor,
                    fontWeight: 'bold',
                    textShadow: `0 0 5px ${randomColor}80` // subtle glow
                  }}
                >
                  {[
                    'Love you ❤️',
                    'Forever 💕',
                    'You & Me 💑',
                    'XOXO 💋',
                    'Be Mine 💝',
                    'Sweetheart 💖',
                    'My Love 💗',
                    'Darling 💓',
                    'Cutie 💘',
                    'Angel 👼'
                  ][i % 10]}
                </div>
              )
            })}
          </div>

          {/* Floating hearts in background */}
          <div className="hearts-background">
            {[...Array(20)].map((_, i) => {
              // Same vibrant palette for hearts
              const colors = [
                '#ff3366', '#ff69b4', '#1e90ff', '#32cd32',
                '#ffa500', '#9370db', '#ff1493', '#00ced1', '#ff4500',
                '#ffd700', '#dc143c', '#ba55d3', '#00bfff'
              ];
              const randomColor = colors[Math.floor(Math.random() * colors.length)];

              return (
                <div
                  key={i}
                  className="floating-heart"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${3 + Math.random() * 2}s`,
                    fontSize: `${20 + Math.random() * 30}px`,
                    color: randomColor,
                    filter: `drop-shadow(0 0 5px ${randomColor})`
                  }}
                >
                  ❤️
                </div>
              )
            })}
          </div>

          <div className="ui-overlay">
            <button
              className="mute-button"
              onClick={() => setMuted(!muted)}
            >
              {muted ? '🔇' : '🔊'}
            </button>
            <div className="valentine-message centered">
              <h1>Happy Valentine's Day!</h1>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
