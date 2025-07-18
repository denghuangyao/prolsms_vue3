import { join } from 'node:path';
import type { DefineConfig } from '../typing';
import { defineApplicationConfig } from './application';
import { existsSync } from 'node:fs';
export * from './application';
function defineConfig(
  userConfigPromise: DefineConfig,
  type: 'application' | 'library' | 'auto' = 'auto',
) {
  let projectType = type;
  // 根据包是否存在 index.html,自动判断类型
  if (projectType === 'auto') {
    const htmlPath = join(process.cwd(), `index.html`);
    projectType = existsSync(htmlPath) ? 'application' : 'library';
  }
  switch (projectType) {
    case 'application':
      return defineApplicationConfig(userConfigPromise);
    default: {
      throw new Error(`Unsupported project type: ${projectType}`);
    }
  }
}
export { defineConfig };
