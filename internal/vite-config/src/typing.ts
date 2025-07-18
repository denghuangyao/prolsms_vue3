import type { ConfigEnv, PluginOption, UserConfig } from 'vite';

interface ConditionPlugin {
  condition?: boolean;
  plugins: () => PluginOption[] | PromiseLike<PluginOption[]>;
}
interface CommonPluginOptions {
  /**
   * 是否为构建模式
   * @default false
   */
  isBuild?: boolean;
  /**
   * 是否开启调试工具
   * @default false
   */
  devtools?: boolean;
  /**
   * 构建模式
   * @default 'development'
   */
  mode?: string;
}
interface ApplicationPluginOptions extends CommonPluginOptions {
  /**
   * 是否开启 HTML 插件
   * @default true
   */
  html?: boolean;
  /**
   * 是否开启mock服务
   */
  viteMock?: boolean;
  /**
   * 是否全局注入Scss
   * @default true
   */
  insertGlobalScss?: boolean;
}
type ApplicationOptions = ApplicationPluginOptions;
type DefineApplicationOptions = (config?: ConfigEnv) => Promise<{
  application?: ApplicationOptions;
  vite?: UserConfig;
}>;
/**
 * 配置定义类型
 * @description 应用或库的配置定义
 */
type DefineConfig = DefineApplicationOptions;
export type {
  DefineApplicationOptions,
  ConditionPlugin,
  CommonPluginOptions,
  ApplicationPluginOptions,
  DefineConfig,
};
