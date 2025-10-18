import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// "base" ayarı, GitHub Pages için repo adınızla aynı olmalı
export default defineConfig({
  base: '/',
  plugins: [react()],
})