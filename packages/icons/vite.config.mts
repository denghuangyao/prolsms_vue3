import { defineConfig } from 'vite';
import path from 'node:path';
//引入svg-icon
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      iconDirs: [
        path.resolve(process.cwd(), 'src/svg/icons'), //框架基础图标
      ],
      symbolId: 'icon-[dir]-[name]',
    }),
    dts({
      tsconfigPath: 'tsconfig.json',
      outDir: 'dist',
      entryRoot: './src',
      exclude: ['node_modules', 'vite.config.*'],
    }),
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'SvgIcons',
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});
