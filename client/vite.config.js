// client/vite.config.js
// IMPORTANT: manualChunks removed — it was creating a circular dependency
// between vendor-react and vendor-misc that silently crashed the app on load.
// Vite's default chunking handles this correctly.
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
  },
})