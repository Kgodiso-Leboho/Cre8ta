import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),  // ✅ Moved here - correct location
  ],
  base: '/Cre8ta/', // ✅ Correct for your GitHub repo
})