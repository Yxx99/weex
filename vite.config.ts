import { fileURLToPath, URL } from 'node:url'
import fs from 'fs'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
        resolvers: [VantResolver()]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
    }
  },
  define: {
    'process.env': {}
  },
  server: {
    host: '127.0.0.1',
    port: 3000,
    strictPort: false,
    http: {
        key: fs.readFileSync('./src/certs/cb.sword.cn-key.pem'),
        cert: fs.readFileSync('./src/certs/cb.sword.cn.pem'),
    },
  }
})
