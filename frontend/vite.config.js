import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://d2w8d5sgt2ne9t.cloudfront.net/api"
      },
    },
  },
  plugins: [react(),tailwindcss()],
})
