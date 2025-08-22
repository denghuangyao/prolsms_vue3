import { join } from 'node:path';
import type { ApplicationPluginOptions } from '../typing';
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import dotenv from 'dotenv';
const getString = (value: string | undefined, fallback: string) => value ?? fallback;
const getNumber = (value: string | undefined, fallback: number) => Number(value) ?? fallback;
const getBoolean = (value: string | undefined) => value === 'true';
/**
 * 获取当前环境下生效的配置文件名
 */
function getConfFiles() {
  // console.log('--getConfFiles-', process.env);
  const script = process.env.npm_lifecycle_script as string; //指定脚本对应命令 vite
  const regx = /--mode ([\d_a-z]+)/;
  const result = regx.exec(script);
  let mode = 'production';
  if (result) {
    mode = result[1] as string;
  }
  return ['.env', '.env.local', `.env.${mode}`, `.env.${mode}.local`];
}
async function loadEnv<T = Record<string, string>>(match = 'VITE_', confFiles = getConfFiles()) {
  let envConfig = {};
  for (const confFile of confFiles) {
    try {
      const confFilePath = join(process.cwd(), confFile);
      if (existsSync(confFilePath)) {
        const envFileContents = await readFile(confFilePath, {
          encoding: 'utf-8',
        });
        // console.log('envFileContents--', envFileContents);
        const env = dotenv.parse(envFileContents);
        envConfig = { ...envConfig, ...env };
      }
    } catch (error) {
      console.error(`Error while parsing ${confFile}`, error);
    }
  }
  const regExp = new RegExp(match);
  Object.keys(envConfig).forEach((key) => {
    if (!regExp.test(key)) {
      Reflect.deleteProperty(envConfig, key);
    }
  });
  return envConfig as T;
}
async function loadAndConvertEnv(
  match = 'VITE_',
  confFiles = getConfFiles(),
): Promise<
  Partial<ApplicationPluginOptions> & {
    base?: string;
    port?: number;
  }
> {
  let envConfig = await loadEnv(match, confFiles);
  const { VITE_BASE, VITE_PORT, VITE_DEVTOOLS, VITE_MOCK } = envConfig;
  return {
    base: getString(VITE_BASE, '/'),
    port: getNumber(VITE_PORT, 3000),
    viteMock: getBoolean(VITE_MOCK),
    devtools: getBoolean(VITE_DEVTOOLS),
  };
}
export { loadAndConvertEnv };
