import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/di',
  server: {
    host: '0.0.0.0',
    proxy: {
      '/j': 'https://www.88u.asia',
    },
  },


  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          // 'primary-color': '#d48806'
          '@disabled-color': 'fade(#000, 70%);',
        },
      },
    },
  },
});
