import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/NextEra/',  // Add this line - should match your repository name
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // your backend URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});