import { defineConfig } from '@dhy/vite-config';
export default defineConfig(async () => {
  return {
    vite: {
      publicDir: './src/scss-vars',
    },
  };
});
