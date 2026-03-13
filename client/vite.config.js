// FILE: client/vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // Remove manualChunks entirely — it was creating a circular dependency
    // between vendor-react and vendor-misc, silently crashing the app on load.
    // Vite's default chunking works perfectly and avoids this issue.
    chunkSizeWarningLimit: 1000,
  },
})