import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'host',
      filename: 'remoteEntry.js',  // Add this line to explicitly set the filename
      exposes: {
        // Expose the geoStore for other MFEs to consume
        './geoStore': './src/geoStore.ts'
      },
      remotes: {
        toolsMFE: 'http://localhost:3002/assets/remoteEntry.js',
        mapMFE: 'http://localhost:3001/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom', 'zustand'],
    }),
  ],
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        // Ensure consistent placement of the remoteEntry.js file
        entryFileNames: 'assets/[name].js',
      }
    }
  },
  server: {
    port: 3000,
    fs: {
      // Allow serving files from one level up to the project root
      allow: ['..'],
    },
  },
  preview: {
    port: 3000,
  },
})
