import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'mapMFE',
      filename: 'remoteEntry.js', // <- this is what host loads
      exposes: {
        './MapComponent': './src/MapComponent.tsx', // <- make sure this file exists
      },
      remotes: {
        host: 'http://localhost:3000/assets/remoteEntry.js', // <- this is what host loads
      },
      shared: ['react', 'react-dom', 'zustand'],
    }),
  ],
  build: {
    target: 'esnext',
    cssCodeSplit: false,
    minify: false,
    rollupOptions: {
      output: {
        manualChunks: {}, // 👈 this is important to avoid chunk splitting that breaks federation
      },
    },
  },
  server: {
    port: 3001,
  },
  preview: {
    port: 3001,
  },
});
