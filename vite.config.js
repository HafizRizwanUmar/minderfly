import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import prerender from 'vite-plugin-prerender'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    prerender({
      // Required - The path to the vite-outputted static site to prerender.
      staticDir: path.join(__dirname, 'dist'),
      // Required - Routes to render.
      routes: [
        '/',
        '/services',
        '/services/web-development',
        '/services/mobile-app-development',
        '/services/graphics-design',
        '/services/chrome-extension-development',
        '/services/chrome-theme-development',
        '/store',
        '/products/sanad-pdf-editor',
        '/products/debt-settler',
        '/products/nishan-qr',
        '/products/flutter-web-emulator',
        '/products/chrome-themes',
        '/products/cinemafly',
        '/work',
        '/team',
        '/articles'
      ],
    })
  ],
})
