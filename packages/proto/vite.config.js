import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        sub1: resolve(__dirname, 'artist-tyler.html'),
        sub2: resolve(__dirname, 'listener-andrew.html'),
        sub3: resolve(__dirname, 'listener-carter.html'),
        sub4: resolve(__dirname, 'playlist-country.html'),
        sub5: resolve(__dirname, 'song-whitehouse_road.html'),
        sub6: resolve(__dirname, 'subscription-free.html'),
        sub7: resolve(__dirname, 'login.html'),
      },
    },
  },
})