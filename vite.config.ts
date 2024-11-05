import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
  },
  envPrefix: 'APP_',
  resolve: {
    alias: {
      '@ui': '/src/ui',
      '@components': '/src/components',
      '@modules': '/src/modules',
      '@pages': '/src/pages',
      '@assets': '/src/app/assets',
      '@styles': '/src/app/styles',
      '@app-types': '/src/app/types',
      '@hooks': '/src/app/hooks',
      '@themes': '/src/app/themes',
      '@store': '/src/app/store',
      '@utils': '/src/app/utils',
      '@constants': '/src/app/constants',
      '@routes': '/src/app/routes',
      '@api': '/src/app/api',
    },
  },
});
