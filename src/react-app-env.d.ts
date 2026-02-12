/// <reference types="react-scripts" />

// Extend the JSX namespace to include Three.js elements
import * as THREE from 'three';
import { JSX as ThreeJSX } from '@react-three/fiber';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // Add Three.js elements here
      color: ThreeJSX.IntrinsicElements['color'];
      fog: ThreeJSX.IntrinsicElements['fog'];
      ambientLight: ThreeJSX.IntrinsicElements['ambientLight'];
      pointLight: ThreeJSX.IntrinsicElements['pointLight'];
      // Add other Three.js elements as needed
    }
  }
}
