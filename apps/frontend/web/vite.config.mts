import { defineConfig } from '@dhy/vite-config';
import { fileURLToPath, URL } from 'node:url';
//自动导入element组件：或使用unplugin-element-plus
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
//自动导入图标
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
//自动导入radix-vue组件
import RadixVueResolver from 'radix-vue/resolver';
export default defineConfig(async () => {
  return {
    application: {
      insertGlobalScss: false,
    },
    vite: {
      plugins: [
        // 自动导入api
        AutoImport({
          // imports: ['vue','pinia','vue-router'],// 自动导入 Vue 相关函数
          dts: 'src/auto-imports.d.ts', // 生成自动导入的类型声明文件
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
          dts: 'src/components.d.ts',
          resolvers: [
            // 自动注册图标组件
            IconsResolver({
              enabledCollections: ['ep'],
            }),
            //配置ElementPlus采用sass样式配色系统，
            ElementPlusResolver({
              importStyle: 'sass', //必要，否则无法定制主题色
            }),
            RadixVueResolver(),
          ],
        }),
        Icons({
          autoInstall: true,
        }),
      ],
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('./src', import.meta.url)),
          '#': fileURLToPath(new URL('./src', import.meta.url)),
          '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
        },
      },
      server: {},
    },
  };
});
