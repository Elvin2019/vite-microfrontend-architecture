import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import federation from '@originjs/vite-plugin-federation'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'toolsMFE',
      filename: 'remoteEntry.js',
      exposes: {
        './ImportComponent': './src/ImportComponent.tsx',
      },
      remotes: {
        host: 'http://localhost:3000/assets/remoteEntry.js', // 🔁 Adjust port if different
      },
      shared: ['react', 'react-dom', 'zustand'],
    }),
  ],
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: 3002,
  },
  preview: {
    port: 3002,
  },
})
