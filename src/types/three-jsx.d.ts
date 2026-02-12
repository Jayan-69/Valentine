import * as React from 'react';
import * as THREE from 'three';
import { ReactThreeFiber } from '@react-three/fiber';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // Custom elements
      color: ReactThreeFiber.Object3DNode<THREE.Color, typeof THREE.Color> & {
        attach: string;
        args: [THREE.ColorRepresentation];
      };
      
      fog: ReactThreeFiber.Object3DNode<THREE.Fog, typeof THREE.Fog> & {
        attach: string;
        args: [THREE.ColorRepresentation, number, number];
      };
      
      // Basic Three.js elements
      mesh: ReactThreeFiber.Object3DNode<THREE.Mesh, typeof THREE.Mesh> & {
        position?: [number, number, number];
        rotation?: [number, number, number];
        scale?: number | [number, number, number];
        castShadow?: boolean;
        receiveShadow?: boolean;
        onClick?: (event: THREE.Event) => void;
        onPointerOver?: (event: THREE.Event) => void;
        onPointerOut?: (event: THREE.Event) => void;
      };
      
      // Geometries
      boxGeometry: ReactThreeFiber.BufferGeometryNode<THREE.BoxGeometry, [number, number, number, number?, number?, number?]>;
      planeGeometry: ReactThreeFiber.BufferGeometryNode<THREE.PlaneGeometry, [number, number, number?, number?]>;
      cylinderGeometry: ReactThreeFiber.BufferGeometryNode<THREE.CylinderGeometry, [number?, number?, number?, number?, boolean?]>;
      
      // Materials
      meshStandardMaterial: ReactThreeFiber.MaterialNode<THREE.MeshStandardMaterial, [THREE.MeshStandardMaterialParameters]> & {
        color?: THREE.ColorRepresentation;
        roughness?: number;
        metalness?: number;
        transparent?: boolean;
        opacity?: number;
        emissive?: THREE.ColorRepresentation;
        emissiveIntensity?: number;
      };
      
      // Lights
      ambientLight: ReactThreeFiber.Object3DNode<THREE.AmbientLight, typeof THREE.AmbientLight> & {
        intensity?: number;
        color?: THREE.ColorRepresentation;
      };
      
      pointLight: ReactThreeFiber.Object3DNode<THREE.PointLight, typeof THREE.PointLight> & {
        position?: [number, number, number];
        intensity?: number;
        color?: THREE.ColorRepresentation;
        distance?: number;
        decay?: number;
      };
      
      // Scene
      scene: ReactThreeFiber.Object3DNode<THREE.Scene, typeof THREE.Scene> & {
        background?: string | number | THREE.Color | THREE.Texture | null;
        fog?: any;
      };
      
      // Camera
      perspectiveCamera: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        fov?: number;
        near?: number;
        far?: number;
        position?: [number, number, number];
      };
      
      // Helpers
      gridHelper: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        args: any[];
      };
      
      // ExtrudeGeometry for Heart component
      extrudeGeometry: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        args: any[];
      };
      
      // Group
      group: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        position?: [number, number, number];
        scale?: number | [number, number, number];
        rotation?: [number, number, number];
      };
      
      // Text (from @react-three/drei)
      text: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        color?: string | number | THREE.Color;
        fontSize?: number;
        maxWidth?: number;
        lineHeight?: number;
        letterSpacing?: number;
        textAlign?: 'left' | 'right' | 'center' | 'justify';
        font?: string;
        anchorX?: number | 'left' | 'center' | 'right';
        anchorY?: number | 'top' | 'top-baseline' | 'middle' | 'bottom-baseline' | 'bottom';
      };
      
      // Sparkles (from @react-three/drei)
      sparkles: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        count?: number;
        position?: [number, number, number];
        scale?: number | [number, number, number];
        size?: number;
        speed?: number | { min: number; max: number };
        opacity?: number | { min: number; max: number };
        color?: string | number | THREE.Color;
        noise?: [number, number, number] | number;
      };
      
      // Float (from @react-three/drei)
      float: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        speed?: number;
        rotationIntensity?: number;
        floatIntensity?: number;
      };
    }
  }
}
