import { defineConfig } from '@dhy/vite-config';
export default defineConfig(async () => {
  return {
    application: {
      insertGlobalScss: false,
    },
    vite: {},
  };
});
