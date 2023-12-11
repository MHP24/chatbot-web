import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// TODO: use env vars
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    plugins: [react()],
    base: process.env.VITE_BASE_BUILD_URL,
    build: {
      rollupOptions: {
        output: {
          entryFileNames: 'chat-bundle.js',
          assetFileNames: (assetInfo) => {
            return assetInfo.name.match(/.css$/) ? 
              'chat-styles.css' : assetInfo.name;
          },
        },
      },
      outDir: '../server/static/public/scripts/chat',
      assetsDir: '.', 
    },
  })
}