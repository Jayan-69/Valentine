import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CoupleProps {
    position?: [number, number, number];
    scale?: number;
}

export const Couple3D: React.FC<CoupleProps> = ({
    position = [0, 0, 0],
    scale = 1
}) => {
    const groupRef = useRef<THREE.Group>(null);
    const leftPersonRef = useRef<THREE.Group>(null);
    const rightPersonRef = useRef<THREE.Group>(null);

    // Animate the couple with gentle swaying and floating
    useFrame(({ clock }) => {
        const time = clock.getElapsedTime();

        if (leftPersonRef.current) {
            leftPersonRef.current.rotation.z = Math.sin(time * 0.5) * 0.05;
        }

        if (rightPersonRef.current) {
            rightPersonRef.current.rotation.z = Math.sin(time * 0.5 + Math.PI) * 0.05;
        }

        if (groupRef.current) {
            groupRef.current.position.y = position[1] + Math.sin(time * 0.8) * 0.1;
        }


    });

    // Realistic Girl component
    const Girl = ({
        position,
        personRef
    }: {
        position: [number, number, number];
        personRef: React.RefObject<THREE.Group>;
    }) => (
        <group ref={personRef as any} position={position}>
            {/* Head - skin tone */}
            <mesh position={[0, 2.1, 0]} castShadow>
                <sphereGeometry args={[0.22, 32, 32]} />
                <meshStandardMaterial
                    color="#eab676"
                    roughness={0.7}
                    metalness={0.0}
                />
            </mesh>

            {/* Hair - long hair */}
            <mesh position={[0, 2.15, -0.1]} castShadow>
                <sphereGeometry args={[0.25, 32, 32]} />
                <meshStandardMaterial
                    color="#2a1a0a"
                    roughness={0.8}
                />
            </mesh>
            {/* Hair ponytail */}
            <mesh position={[0, 1.9, -0.25]} castShadow>
                <sphereGeometry args={[0.15, 16, 16]} />
                <meshStandardMaterial
                    color="#3d2817"
                    roughness={0.7}
                />
            </mesh>

            {/* Eyes */}
            <mesh position={[-0.08, 2.15, 0.18]} castShadow>
                <sphereGeometry args={[0.03, 16, 16]} />
                <meshStandardMaterial color="#2c1810" />
            </mesh>
            <mesh position={[0.08, 2.15, 0.18]} castShadow>
                <sphereGeometry args={[0.03, 16, 16]} />
                <meshStandardMaterial color="#2c1810" />
            </mesh>

            {/* Nose */}
            <mesh position={[0, 2.08, 0.2]} castShadow>
                <sphereGeometry args={[0.02, 16, 16]} />
                <meshStandardMaterial color="#ffcba4" />
            </mesh>

            {/* Smile */}
            <mesh position={[0, 2.0, 0.19]} rotation={[0, 0, 0]} castShadow>
                <torusGeometry args={[0.06, 0.01, 8, 16, Math.PI]} />
                <meshStandardMaterial color="#ff6b9d" />
            </mesh>

            {/* Neck */}
            <mesh position={[0, 1.85, 0]} castShadow>
                <cylinderGeometry args={[0.08, 0.08, 0.15, 16]} />
                <meshStandardMaterial color="#eab676" roughness={0.7} />
            </mesh>

            {/* Dress/Body - pink dress */}
            <mesh position={[0, 1.3, 0]} castShadow>
                <cylinderGeometry args={[0.15, 0.35, 1, 32]} />
                <meshStandardMaterial
                    color="#ff1493"
                    roughness={0.5}
                    metalness={0.1}
                />
            </mesh>

            {/* Dress details - white collar */}
            <mesh position={[0, 1.75, 0]} castShadow>
                <torusGeometry args={[0.16, 0.03, 16, 32]} />
                <meshStandardMaterial color="#ffffff" />
            </mesh>

            {/* Left Arm */}
            <group position={[-0.25, 1.5, 0]}>
                <mesh rotation={[0, 0, 0.3]} castShadow>
                    <cylinderGeometry args={[0.06, 0.05, 0.5, 16]} />
                    <meshStandardMaterial color="#ff1493" roughness={0.5} />
                </mesh>
                <mesh position={[0, -0.35, 0]} castShadow>
                    <sphereGeometry args={[0.06, 16, 16]} />
                    <meshStandardMaterial color="#eab676" roughness={0.7} />
                </mesh>
            </group>

            {/* Right Arm - extended for holding hands */}
            <group position={[0.25, 1.5, 0]}>
                <mesh rotation={[0, 0, -0.2]} castShadow>
                    <cylinderGeometry args={[0.06, 0.05, 0.5, 16]} />
                    <meshStandardMaterial color="#ff1493" roughness={0.5} />
                </mesh>
                <mesh position={[0, -0.3, 0]} castShadow>
                    <sphereGeometry args={[0.06, 16, 16]} />
                    <meshStandardMaterial color="#eab676" roughness={0.7} />
                </mesh>
            </group>

            {/* Legs - straighter and visible */}
            <mesh position={[-0.12, 0.5, 0]} castShadow>
                <cylinderGeometry args={[0.09, 0.08, 0.9, 32]} />
                <meshStandardMaterial color="#eab676" roughness={0.7} />
            </mesh>
            <mesh position={[0.12, 0.5, 0]} castShadow>
                <cylinderGeometry args={[0.09, 0.08, 0.9, 32]} />
                <meshStandardMaterial color="#eab676" roughness={0.7} />
            </mesh>

            {/* Shoes */}
            <mesh position={[-0.12, 0.05, 0.05]} castShadow>
                <boxGeometry args={[0.1, 0.08, 0.18]} />
                <meshStandardMaterial color="#ff1493" roughness={0.3} />
            </mesh>
            <mesh position={[0.12, 0.05, 0.05]} castShadow>
                <boxGeometry args={[0.1, 0.08, 0.18]} />
                <meshStandardMaterial color="#ff1493" roughness={0.3} />
            </mesh>
        </group>
    );

    // Realistic Boy component
    const Boy = ({
        position,
        personRef
    }: {
        position: [number, number, number];
        personRef: React.RefObject<THREE.Group>;
    }) => (
        <group ref={personRef as any} position={position}>
            {/* Same Head code... but ensuring no floaters */}
            <mesh position={[0, 2.2, 0]} castShadow>
                <sphereGeometry args={[0.24, 32, 32]} />
                <meshStandardMaterial
                    color="#e2a76f"
                    roughness={0.7}
                    metalness={0.0}
                />
            </mesh>

            {/* Hair - short hair */}
            <mesh position={[0, 2.3, 0]} castShadow>
                <sphereGeometry args={[0.26, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
                <meshStandardMaterial
                    color="#1a1a1a"
                    roughness={0.8}
                />
            </mesh>

            {/* Eyes */}
            <mesh position={[-0.09, 2.25, 0.2]} castShadow>
                <sphereGeometry args={[0.03, 16, 16]} />
                <meshStandardMaterial color="#1a1a1a" />
            </mesh>
            <mesh position={[0.09, 2.25, 0.2]} castShadow>
                <sphereGeometry args={[0.03, 16, 16]} />
                <meshStandardMaterial color="#1a1a1a" />
            </mesh>

            {/* Nose */}
            <mesh position={[0, 2.15, 0.22]} castShadow>
                <sphereGeometry args={[0.025, 16, 16]} />
                <meshStandardMaterial color="#e6b896" />
            </mesh>

            {/* Smile */}
            <mesh position={[0, 2.08, 0.21]} rotation={[0, 0, 0]} castShadow>
                <torusGeometry args={[0.07, 0.012, 8, 16, Math.PI]} />
                <meshStandardMaterial color="#d4766b" />
            </mesh>

            {/* Neck */}
            <mesh position={[0, 1.92, 0]} castShadow>
                <cylinderGeometry args={[0.09, 0.09, 0.18, 16]} />
                <meshStandardMaterial color="#e2a76f" roughness={0.7} />
            </mesh>

            {/* Shirt/Body - blue shirt */}
            <mesh position={[0, 1.35, 0]} castShadow>
                <cylinderGeometry args={[0.18, 0.22, 1.1, 32]} />
                <meshStandardMaterial
                    color="#1e90ff"
                    roughness={0.6}
                    metalness={0.1}
                />
            </mesh>

            {/* Shirt collar */}
            <mesh position={[0, 1.82, 0]} castShadow>
                <torusGeometry args={[0.19, 0.03, 16, 32]} />
                <meshStandardMaterial color="#2c4d8f" />
            </mesh>

            {/* Buttons */}
            <mesh position={[0, 1.6, 0.18]} castShadow>
                <sphereGeometry args={[0.02, 16, 16]} />
                <meshStandardMaterial color="#ffffff" metalness={0.5} />
            </mesh>
            <mesh position={[0, 1.4, 0.2]} castShadow>
                <sphereGeometry args={[0.02, 16, 16]} />
                <meshStandardMaterial color="#ffffff" metalness={0.5} />
            </mesh>
            <mesh position={[0, 1.2, 0.21]} castShadow>
                <sphereGeometry args={[0.02, 16, 16]} />
                <meshStandardMaterial color="#ffffff" metalness={0.5} />
            </mesh>

            {/* Left Arm */}
            <group position={[-0.28, 1.55, 0]}>
                <mesh rotation={[0, 0, 0.25]} castShadow>
                    <cylinderGeometry args={[0.07, 0.06, 0.55, 16]} />
                    <meshStandardMaterial color="#1e90ff" roughness={0.6} />
                </mesh>
                <mesh position={[0, -0.38, 0]} castShadow>
                    <sphereGeometry args={[0.07, 16, 16]} />
                    <meshStandardMaterial color="#f4c2a0" roughness={0.6} />
                </mesh>
            </group>

            {/* Right Arm - extended for holding hands */}
            <group position={[0.28, 1.55, 0]}>
                <mesh rotation={[0, 0, -0.2]} castShadow>
                    <cylinderGeometry args={[0.07, 0.06, 0.55, 16]} />
                    <meshStandardMaterial color="#1e90ff" roughness={0.6} />
                </mesh>
                <mesh position={[0, -0.35, 0]} castShadow>
                    <sphereGeometry args={[0.07, 16, 16]} />
                    <meshStandardMaterial color="#e2a76f" roughness={0.7} />
                </mesh>
            </group>

            {/* Belt */}
            <mesh position={[0, 1.0, 0]} castShadow>
                <cylinderGeometry args={[0.2, 0.2, 0.1, 32]} />
                <meshStandardMaterial color="#654321" roughness={0.4} />
            </mesh>

            {/* Left Pant Leg */}
            <mesh position={[-0.11, 0.45, 0]} castShadow>
                <cylinderGeometry args={[0.09, 0.08, 1.0, 32]} />
                <meshStandardMaterial color="#2c2c2c" roughness={0.7} />
            </mesh>

            {/* Right Pant Leg */}
            <mesh position={[0.11, 0.45, 0]} castShadow>
                <cylinderGeometry args={[0.09, 0.08, 1.0, 32]} />
                <meshStandardMaterial color="#2c2c2c" roughness={0.7} />
            </mesh>

            {/* Shoes */}
            <mesh position={[-0.1, -0.1, 0.06]} castShadow>
                <boxGeometry args={[0.14, 0.1, 0.2]} />
                <meshStandardMaterial color="#1a1a1a" roughness={0.3} />
            </mesh>
            <mesh position={[0.1, -0.1, 0.06]} castShadow>
                <boxGeometry args={[0.14, 0.1, 0.2]} />
                <meshStandardMaterial color="#1a1a1a" roughness={0.3} />
            </mesh>
        </group>
    );

    return (
        <group ref={groupRef as any} position={position} scale={scale}>
            {/* Girl on the left */}
            <Girl
                position={[-0.7, 0, 0]}
                personRef={leftPersonRef}
            />

            {/* Boy on the right */}
            <Boy
                position={[0.7, 0, 0]}
                personRef={rightPersonRef}
            />

            {/* Holding hands connection */}
            <mesh position={[0, 1.5, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
                <cylinderGeometry args={[0.05, 0.05, 1.2, 16]} />
                <meshStandardMaterial
                    color="#eab676"
                    roughness={0.7}
                />
            </mesh>
        </group>
    );
};
