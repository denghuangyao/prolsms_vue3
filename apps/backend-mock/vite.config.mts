import { viteMockServe } from 'vite-plugin-mock';

import type { UserConfigExport, Plugin } from 'vite';
import vue from '@vitejs/plugin-vue';

export default (): UserConfigExport => {
  return {
    plugins: [
      vue(),
      viteMockServe({
        mockPath: 'mock',
        enable: true,
        logger: true,
        cors: true,
      }) as Plugin,
    ],
    server: {
      port: 8080,
    },
  };
};
