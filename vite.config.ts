import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import IconsResolver from 'unplugin-icons/resolver'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // vueDevTools(),
    AutoImport({
      // 自动导入 Vue 相关函数
      // imports: ['vue'],
      resolvers: [
        //解决引入非组件方法ElMessage，自动导入配置增强
        ElementPlusResolver({
          // 自动导入组件的同时导入对应的方法
          importStyle: 'sass',
          // 关键：启用自动导入组件方法
          directives: true,
          version: '2.9.6', // 与安装的 Element Plus 版本一致
        }),
        // 自动导入图标组件
        IconsResolver({
          prefix: 'Icon',
        }),
      ],
    }),
    Components({
      resolvers: [
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ['ep'],
        }),
        //1.配置ElementPlus采用sass样式配色系统
        ElementPlusResolver({
          importStyle: 'sass',
          // 自动导入图标组件
          // ssr: true,
        }),
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
    },
  },
  //安装对应的scss npm i sass sass-loader -D
  // @import 已经被弃用 改用 @use
  css: {
    preprocessorOptions: {
      scss: {
        //建议只用来嵌入 SCSS 的变量声明文件
        additionalData: '@use "@/styles/variables.scss" as *;',
      },
    },
  },
})
