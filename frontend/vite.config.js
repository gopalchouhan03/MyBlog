import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://myblog-backend-t9rr.onrender.com/api
"
      },
    },
  },
  plugins: [react(),tailwindcss()],
})
