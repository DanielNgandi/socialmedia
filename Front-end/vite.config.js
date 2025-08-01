import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/socket.io': {
        target: 'http://localhost:5000', // your backend server
        ws: true, // enable WebSocket proxying
        changeOrigin: true,
      },
    },
  },
})