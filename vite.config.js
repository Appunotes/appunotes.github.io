import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: 'https://appunotes.github.io/aparna.github.io/',   // 🔴 THIS IS THE FIX
})
