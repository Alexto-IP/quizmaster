import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/quizmaster/' : '/',
  plugins: [
    react(),
    tailwindcss(),
  ],
  define: {
    'import.meta.env.VITE_YM_ID': JSON.stringify(process.env.VITE_YM_ID),
  }
}))