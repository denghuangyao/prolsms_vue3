import type { PluginOption } from 'vite';
import type {
  ConditionPlugin,
  CommonPluginOptions,
  ApplicationPluginOptions,
  LibraryPluginOptions,
} from '../typing';
import viteVue from '@vitejs/plugin-vue';
import viteDtsPlugin, { type PluginOptions } from 'vite-plugin-dts';
import viteVueDevTools from 'vite-plugin-vue-devtools';
//由vite在Html中注入环境变量，在 .env 文件内配置
import { createHtmlPlugin as viteHtmlPlugin } from 'vite-plugin-html';
import { viteMockPlugin } from './vite-mock';
/**
 * 获取条件成立的 vite 插件
 * @param conditionPlugins
 * @returns
 */
async function loadConditionPlugins(conditionPlugins: ConditionPlugin[]) {
  const plugins: PluginOption[] = [];
  for (let conditionPlugin of conditionPlugins) {
    if (conditionPlugin.condition) {
      const realPlugins = await conditionPlugin.plugins();
      plugins.push(...realPlugins);
    }
  }
  return plugins.flat();
}
/**
 * 根据条件获取通用的vite插件:Vue框架
 */
async function loadCommonPlugins(options: CommonPluginOptions): Promise<ConditionPlugin[]> {
  const { isBuild, devtools } = options;
  return [
    {
      condition: true,
      plugins: () => [viteVue()],
    },
    {
      condition: !isBuild && devtools,
      plugins: () => [viteVueDevTools()],
    },
  ];
}
/**
 * 根据条件获取应用类型的vite插件
 */
async function loadApplicationPlugins(options: ApplicationPluginOptions): Promise<PluginOption[]> {
  const { html, viteMock } = options;
  const commonPlugins = await loadCommonPlugins(options);
  return await loadConditionPlugins([
    ...commonPlugins,
    {
      condition: !!html,
      plugins: () => [viteHtmlPlugin({ minify: true })],
    },
    {
      condition: viteMock,
      plugins: () => [viteMockPlugin()],
    },
  ]);
}

async function loadLibraryPlugins(options: LibraryPluginOptions): Promise<PluginOption[]> {
  const isBuild = options.isBuild;
  const { dts, ...commonOptions } = options;
  const commonPlugins = await loadCommonPlugins(commonOptions);
  return await loadConditionPlugins([
    ...commonPlugins,
    {
      condition: isBuild && !!dts,
      plugins: () => {
        if (Array.isArray(dts)) {
          return dts.map((option: PluginOptions) => viteDtsPlugin(option));
        }
        if (typeof dts === 'boolean') {
          return [viteDtsPlugin({ logLevel: 'error' })];
        }
        return [viteDtsPlugin({ ...dts })];
      },
    },
  ]);
}

export { loadConditionPlugins, loadApplicationPlugins, loadLibraryPlugins, loadCommonPlugins };
