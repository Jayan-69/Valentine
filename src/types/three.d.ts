import * as THREE from 'three';
import { JSX as ThreeJSX } from '@react-three/fiber';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // Three.js elements
      color: ThreeJSX.IntrinsicElements['color'];
      fog: ThreeJSX.IntrinsicElements['fog'];
      ambientLight: ThreeJSX.IntrinsicElements['ambientLight'];
      pointLight: ThreeJSX.IntrinsicElements['pointLight'];
      mesh: ThreeJSX.IntrinsicElements['mesh'];
      // Add other Three.js elements as needed
    }
  }
}
