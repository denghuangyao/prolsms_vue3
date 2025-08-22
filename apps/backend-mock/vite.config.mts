import { defineConfig } from '@dhy/vite-config';
export default defineConfig(async () => {
  return {
    application: {},
    vite: {
      plugins: [],
      server: {
        proxy: {
          '/api': {
            target: 'http://localhost:8080',
            changeOrigin: true,
            rewrite: (path: string) => path.replace(/^\/api/, ''),
          },
        },
      },
    },
  };
});
