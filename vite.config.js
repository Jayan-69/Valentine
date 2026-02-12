import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Disable service worker in development
      registerServiceWorker: false,
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '~': resolve(__dirname, './')
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
  },
  server: {
    host: true,
    port: 3000,
    open: true,
    fs: {
      strict: false
    }
  },
  worker: {
    format: 'es',
    plugins: () => []
  },
  optimizeDeps: {
    include: ['three', 'three-mesh-bvh'],
    esbuildOptions: {
      target: 'es2020',
      supported: {
        bigint: true,
        'top-level-await': true
      }
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    minify: 'terser',
    target: 'esnext',
    rollupOptions: {
      output: {
        // Letting Vite handle chunks automatically to avoid external/manualChunk conflicts
      }
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  }
});
