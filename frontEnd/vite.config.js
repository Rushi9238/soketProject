import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    port: 3001,
    proxy: {
      '/api': {
        target: 'https://soketproject.onrender.com',
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
});
