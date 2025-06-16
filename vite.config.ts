import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
//自动导入element组件：或使用unplugin-element-plus
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
//自动导入图标
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
//mock配置
import { ConfigEnv } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'
//由vite在Html中注入环境变量，在 .env 文件内配置
import { createHtmlPlugin as viteHtmlPlugin } from 'vite-plugin-html'
//引入svg-icon
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'node:path'
// https://vite.dev/config/
export default defineConfig(({ command }: ConfigEnv) => ({
  plugins: [
    vue(),
    viteHtmlPlugin({ minify: true }),
    viteMockServe({
      mockPath: 'src/mock', // mock文件存放目录
      enable: command === 'serve', // 只在开发服务器启用
      logger: true, // 是否在控制台显示请求日志
    }),
    // vueDevTools(),
    // 自动导入api
    AutoImport({
      // imports: ['vue','pinia','vue-router'],// 自动导入 Vue 相关函数
      // dts: 'src/auto-imports.d.ts', // 生成自动导入的类型声明文件
      resolvers: [
        //解决引入非组件方法ElMessage，自动导入配置增强,自动导入组件的同时导入对应的方法
        ElementPlusResolver({}),
        // 自动导入图标组件
        IconsResolver({
          prefix: 'Icon',
        }),
      ],
    }),
    // 自动导入组件
    Components({
      // dirs: ['src/components', 'src/layout/components'], // 自动导入这些文件夹中定义的组件
      resolvers: [
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ['ep'],
        }),
        //配置ElementPlus采用sass样式配色系统，
        ElementPlusResolver({
          importStyle: 'sass', //必要，否则无法定制主题色
        }),
      ],
    }),
    Icons({
      autoInstall: true,
    }),
    createSvgIconsPlugin({
      iconDirs: [
        path.resolve(process.cwd(), 'src/icons'), //框架基础图标
        path.resolve(process.cwd(), 'src/assets/icons'), //业务图标
      ],
      symbolId: 'icon-[dir]-[name]',
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
        additionalData: `
          @use "@/styles/variables.scss" as *;
          @use "@/styles/element/el-mixin.scss" as el;
        `,
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
