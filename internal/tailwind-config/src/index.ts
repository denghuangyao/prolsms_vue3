import type { Config } from 'tailwindcss';
import { getPackagesSyncFunc, type Package } from '@dhy/node-utils';
import { existsSync } from 'node:fs';
import path from 'node:path';
const { packages } = getPackagesSyncFunc(process.cwd());
// console.log('-packages--', packages);
const tailwindPackages: string[] = [];
packages.forEach((pkg: Package) => {
  if (existsSync(path.join(pkg.dir, 'tailwind.config.mjs'))) {
    tailwindPackages.push(pkg.dir);
  }
});
export default {
  corePlugins: {
    preflight: false, // 禁用Tailwind的默认基础样式（preflight）
  },
  content: [
    './index.html',
    ...tailwindPackages.map((pkgDir) => path.join(pkgDir, 'src/**/*.{vue,js,ts,jsx,tsx,html}')),
  ],
  plugins: [],
  theme: {},
} as Config;
