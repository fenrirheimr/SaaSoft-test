import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import vuetify from 'vite-plugin-vuetify'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vuetify({ autoImport: true }), // Vuetify auto-import
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: ['.js', '.ts', '.vue', '.json'] // Указываем расширения файлов
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "sass:color";
          @use "sass:map";
          @import "@/styles/variables.scss";
        `
      }
    }
  },
  server: {
    port: 3000,
    open: true,
    host: true, // Доступ с других устройств в локальной сети
    strictPort: true // Завершать работу, если порт занят
  },
  build: {
    chunkSizeWarningLimit: 1600, // Увеличиваем лимит для предупреждений
    rollupOptions: {
      output: {
        manualChunks: {
          vuetify: ['vuetify'],
          mdi: ['@mdi/font']
        }
      }
    }
  },
  optimizeDeps: {
    include: ['vue', 'pinia', 'vuetify']
  }
})