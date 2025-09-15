import { defineConfig, mergeConfig, type ConfigEnv, type UserConfig } from 'vite';
import type { DefineApplicationOptions } from '../typing';
import { loadApplicationPlugins } from '../plugins';
import { loadAndConvertEnv } from '../utils/env';
import { getCommonConfig } from './common';
import path from 'node:path';
import { findMonorepoRoot } from '@dhy/node-utils';
function createCssOptions(insertGlobalScss = true) {
  const root = findMonorepoRoot();
  return {
    //安装对应的scss npm i sass sass-loader -D
    // @import 已经被弃用 改用 @use
    preprocessorOptions: insertGlobalScss
      ? {
          scss: {
            //建议只用来嵌入 SCSS 的变量声明文件
            additionalData: (content: string, filepath: string) => {
              const relativePath = path.relative(root, filepath);
              // console.log('additionalData---', relativePath, filepath);
              if (relativePath.startsWith(`apps${path.sep}`)) {
                return `@use "@dhy/styles/global" as *;\n${content}`;
              }
              return content;
            },
          },
        }
      : {
          scss: {
            additionalData: `
                @use "@/styles/variables.scss" as *;
                @use "@/styles/element/el-mixin.scss" as el;
              `,
          },
        },
  };
}
function defineApplicationConfig(UserConfigPromise?: DefineApplicationOptions) {
  return defineConfig(async (config: ConfigEnv) => {
    const options = await UserConfigPromise?.(config);
    const { application = {}, vite = {} } = options || {};
    const { command, mode } = config;
    const { port, base, ...envConfig } = await loadAndConvertEnv();
    const isBuild = command === 'build';
    const plugins = await loadApplicationPlugins({
      isBuild,
      viteMock: !isBuild,
      html: true,
      devtools: true,
      mode,
      ...envConfig,
      ...application,
    });
    const { insertGlobalScss = true } = application;
    const applicationConfig: UserConfig = {
      base,
      plugins,
      build: {
        target: 'es2015',
      },
      css: createCssOptions(insertGlobalScss),
      server: {
        host: true,
        port,
        warmup: {
          clientFiles: ['./index.html', './src/bootstrap.ts', './src/{views,router,stores}/*'],
        },
      },
    };
    const mergedCommonConfig = mergeConfig(await getCommonConfig(), applicationConfig);
    return mergeConfig(mergedCommonConfig, vite);
  });
}
export { defineApplicationConfig };
