import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        sub: resolve(__dirname, 'artist-tyler.html'),
        sub: resolve(__dirname, 'listener-andrew.html'),
        sub: resolve(__dirname, 'listener-carter.html'),
        sub: resolve(__dirname, 'playlist-country.html'),
        sub: resolve(__dirname, 'song-whitehouse_road.html'),
        sub: resolve(__dirname, 'subscription.html'),
      },
    },
  },
})