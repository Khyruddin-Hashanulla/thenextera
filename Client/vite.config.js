import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: '/thenextera/', // Add this line for GitHub Pages deployment
  server: {
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
  define: {
    'process.env': {
      VITE_API_URL: JSON.stringify('http://localhost:8080'),
    }
  }
});