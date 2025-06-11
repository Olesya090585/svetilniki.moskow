import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: true, // Needed for docker
    port: 5173,
    watch: {
      usePolling: true // Needed for hot reload in Docker on macOS/Windows
    }
  },
  assetsInclude: ['**/*.svg'], // Ensure SVG files are handled as assets
  build: {
    assetsInlineLimit: 0, // Ensure SVG files are always processed as assets
  }
})
