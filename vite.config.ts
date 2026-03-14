import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/restaurant-order-app/',
  plugins: [
    tailwindcss(),
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'Restaurant Bestellung',
        short_name: 'Bestell',
        description: 'Restaurant Bestellsystem für Tablet',
        theme_color: '#570DF8',
        background_color: '#1d232a',
        display: 'standalone',
        orientation: 'landscape',
        start_url: '/restaurant-order-app/',
        scope: '/restaurant-order-app/',
        icons: [
          {
            src: 'favicon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,json,woff2}']
      }
    })
  ]
})
