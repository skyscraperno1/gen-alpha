import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    server: {
      open: true,
      port: 8080
    },
    base: loadEnv(mode, process.cwd()).VITE_BASE_URL,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    }
  }
})