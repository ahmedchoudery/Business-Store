import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Core React — tiny, always needed
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor-react'
          }
          // Three.js + R3F — large (600KB+), only used in 3D canvas
          if (
            id.includes('node_modules/three') ||
            id.includes('node_modules/@react-three')
          ) {
            return 'vendor-three'
          }
          // Framer Motion — medium-sized animation lib
          if (id.includes('node_modules/framer-motion')) {
            return 'vendor-motion'
          }
          // Everything else in node_modules → shared vendor chunk
          if (id.includes('node_modules')) {
            return 'vendor-misc'
          }
        },
      },
    },
    // Warn if any chunk exceeds 600KB
    chunkSizeWarningLimit: 600,
  },
})