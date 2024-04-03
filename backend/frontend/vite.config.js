import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';

export default defineConfig({
  plugins: [reactRefresh()],  
  publicDir: 'assets',
  build: {
    rollupOptions: {      
      external: ['/assets/index-D4cvZ89r.js'],
      input: 'dist/index.html',
    },
  },
});