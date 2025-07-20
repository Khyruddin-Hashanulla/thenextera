import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  server: {
    port: 5173,
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // your backend URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/auth': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
    historyApiFallback: true,
  },
  preview: {
    port: 4173,
    host: true,
  },
  define: {
    'process.env': {
      VITE_API_URL: JSON.stringify('http://localhost:8080'),
    }
  }
});