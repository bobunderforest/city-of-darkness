// @ts-check
import { defineConfig } from 'astro/config'

import react from '@astrojs/react'

import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr'

// https://astro.build/config
export default defineConfig({
  integrations: [react()],

  build: {
    assets: '_assets',
  },

  vite: {
    plugins: [tailwindcss(), svgr()],
    server: {
      watch: {
        usePolling: true,
      },
    },
  },
})
