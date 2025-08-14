import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath } from 'node:url';
import dts from 'vite-plugin-dts';
import path from 'node:path';
export default defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: 'tsconfig.json',
      outDir: './dist/es',
      entryRoot: './src',
      exclude: ['node_modules', 'vite.config.ts'],
    }),
    dts({
      tsconfigPath: 'tsconfig.json',
      outDir: './dist/lib',
      entryRoot: './src',
      exclude: ['node_modules', 'vite.config.ts'],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
    },
  },
  build: {
    // 清空输出目录
    emptyOutDir: true,
    // 开启最小化混淆
    minify: true,
    // css 文件切割
    cssCodeSplit: false,
    lib: {
      // 入口文件，指向你的组件库的主文件
      entry: './src/index.ts',
      name: 'vue3-biobank',
      fileName: (format) => `index.${format}.js`,
      cssFileName: 'style',
    },
    rollupOptions: {
      // 确保外部化处理不需要打包的依赖
      external: ['vue'], // 排除 Vue
      output: [
        {
          // es 产物配置
          format: 'es',
          entryFileNames: '[name].js',
          exports: 'named',
          preserveModules: true,
          preserveModulesRoot: 'src',
          dir: './dist/es',
          assetFileNames: (assetInfo) => {
            if (assetInfo.names && assetInfo.names.some((name) => name.endsWith('.css'))) {
              return path.join(path.dirname(assetInfo.names[0]), 'style.css');
            }
            return '[name].[ext]';
          },
        },
        {
          // cjs 产物配置
          format: 'cjs',
          entryFileNames: '[name].js',
          exports: 'named',
          preserveModules: true,
          preserveModulesRoot: 'src',
          dir: './dist/lib',
          assetFileNames: (assetInfo) => {
            if (assetInfo.names && assetInfo.names.some((name) => name.endsWith('.css'))) {
              return path.join(path.dirname(assetInfo.names[0]), 'style.css');
            }
            return '[name].[ext]';
          },
        },
      ],
    },
  },
});
