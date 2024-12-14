import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    port: 3001,
    proxy: {
      '/api': {
        target: process.env.VITE_APP_SOKET_URL || 'https://soketproject.onrender.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Optional: adjust based on backend routes
      },
    },
  },
  plugins: [react()],
});
