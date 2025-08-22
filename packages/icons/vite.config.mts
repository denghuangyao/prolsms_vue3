import { defineConfig } from '@dhy/vite-config';
import path from 'node:path';
//引入svg-icon
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
export default defineConfig(async () => {
  return {
    library: {
      dts: {
        tsconfigPath: 'tsconfig.json',
        outDir: 'dist',
        entryRoot: './src',
        exclude: ['node_modules', 'vite.config.*'],
      },
    },
    vite: {
      plugins: [
        createSvgIconsPlugin({
          iconDirs: [
            path.resolve(process.cwd(), 'src/svg/icons'), //框架基础图标
          ],
          symbolId: 'icon-[dir]-[name]',
        }),
      ],
      // build: {
      //   lib: {
      //     entry: 'src/index.ts',
      //     name: 'SvgIcons',
      //     fileName: (format) => `index.${format}.js`,
      //   },
      //   rollupOptions: {
      //     external: ['vue'],
      //     output: {
      //       globals: {
      //         vue: 'Vue',
      //       },
      //     },
      //   },
      // },
    },
  };
}, 'library');
