import { defineConfig } from '@dhy/vite-config';
import { fileURLToPath } from 'node:url';
import ElementPlus from 'unplugin-element-plus/vite';
export default defineConfig(async () => {
  return {
    application: {},
    vite: {
      plugins: [ElementPlus({})],
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('./src', import.meta.url)),
          '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
        },
      },
    },
  };
});
