import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'LexiLift',
        short_name: 'LexiLift',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#000000',
        orientation: 'portrait',
        icons: [
          {
            src: 'public/images/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'public/images/icon-512x512.jpg',
            sizes: '512x512',
            type: 'image/jpg',
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^http:\/\/localhost:4173\/.*$/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24, // 1 день
              },
            },
          },
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'image-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 7, // 1 неделя
              },
            },
          },
          {
            urlPattern: ({ request }) => request.destination === 'script' || request.destination === 'style',
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-resources',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
            },
          },
        ],
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
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
      '@styles': '/src/app/styles',
      '@app-types': '/src/app/types',
      '@hooks': '/src/app/hooks',
      '@themes': '/src/app/themes',
      '@store': '/src/app/store',
      '@utils': '/src/app/utils',
      '@constants': '/src/app/constants',
      '@routes': '/src/app/routes',
      '@api': '/src/app/api',
      '@i18n': '/src/app/i18n',
    },
  },
});
