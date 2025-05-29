import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

//mock配置
import { ConfigEnv } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'
// https://vite.dev/config/
export default defineConfig(({ command }: ConfigEnv) => ({
  plugins: [
    vue(),
    viteMockServe({
      mockPath: 'src/mock', // mock文件存放目录
      enable: command === 'serve', // 只在开发服务器启用
      logger: true, // 是否在控制台显示请求日志
    }),
    // vueDevTools(),
    AutoImport({
      // 自动导入 Vue 相关函数
      // imports: ['vue'],
      resolvers: [
        //解决引入非组件方法ElMessage，自动导入配置增强
        ElementPlusResolver({
          // 自动导入组件的同时导入对应的方法
          // importStyle: 'sass',
          // 关键：启用自动导入组件方法
          // directives: true,
          // version: '2.9.10', // 与安装的 Element Plus 版本一致
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
          // importStyle: 'sass',
        }),
      ],
    }),
    Icons({
      autoInstall: true,
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
  server: {
    // host: '0.0.0.0', // 监听所有地址，允许ip访问
    cors: true,
    port: 3000,
    proxy: {
      '/api': {
        path: 'http://127.0.0.1:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
}))
