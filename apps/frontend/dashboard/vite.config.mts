import { defineConfig } from '@dhy/vite-config';
import { fileURLToPath } from 'node:url';
export default defineConfig(async () => {
  return {
    application: {},
    vite: {
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('./src', import.meta.url)),
          '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
        },
      },
    },
  };
});
