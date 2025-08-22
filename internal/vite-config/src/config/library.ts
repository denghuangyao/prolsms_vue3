import { defineConfig, mergeConfig, type ConfigEnv, type UserConfig } from 'vite';
import type { DefineLibraryOptions } from '../typing';
import { loadLibraryPlugins } from '../plugins';
import { readPackageJSON } from '@dhy/node-utils';
import { getCommonConfig } from './common';

function defineLibraryConfig(userConfigPromise: DefineLibraryOptions) {
  return defineConfig(async (config: ConfigEnv) => {
    const options = await userConfigPromise?.(config);
    const { mode, command } = config;
    const { library = {}, vite = {} } = options;
    const plugins = await loadLibraryPlugins({
      dts: false,
      mode,
      isBuild: command === 'build',
      ...library,
    });
    const root = process.cwd();
    const packageData = await readPackageJSON(root);
    console.log('packageData--', packageData);
    const { dependencies = {}, peerDependencies = {} } = packageData;
    const externalPackages: string[] = [
      ...Object.keys(dependencies),
      ...Object.keys(peerDependencies),
    ];
    const packageConfig: UserConfig = {
      plugins,
      build: {
        lib: {
          entry: './src/index.ts',
          fileName: (format) => `index.${format}.js`,
          formats: ['es'],
        },
        rollupOptions: {
          external: (id: string) => {
            console.log('rollupOptions-external-id-', id);
            return externalPackages.some((pkg) => pkg === id || id.startsWith(`${pkg}/`));
          },
        },
      },
    };
    const commonConfig = await getCommonConfig();
    const mergeCommonConfig = mergeConfig(commonConfig, packageConfig);
    return mergeConfig(mergeCommonConfig, vite);
  });
}
export { defineLibraryConfig };
