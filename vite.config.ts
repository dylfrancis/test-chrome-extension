import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'src/popup/index.tsx'),
        'content-script': resolve(__dirname, 'src/content-script/index.ts'),
        iframe: resolve(__dirname, 'src/iframe/index.tsx'),
      },
      output: {
        entryFileNames: '[name].js',
        // Keep CSS files with predictable names
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return '[name].css'
          }
          return '[name].[ext]'
        }
      }
    },
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: process.env.NODE_ENV === 'development',
    // Ensure CSS is extracted and not inlined
    cssCodeSplit: true
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
  }
})
