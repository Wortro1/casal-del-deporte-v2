import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/


export default defineConfig(({ mode }) => {
  // Carga las variables según el modo (dev, prod, etc.)
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/gym/api': {
          target: env.VITE_API_URL || 'http://localhost:8080',
          changeOrigin: true,
        }
      }
    }
  }
})
