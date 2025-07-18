import {
  getPackagesSync as getPackagesSyncFunc,
  getPackages as getPackagesFunc,
} from '@manypkg/get-packages';
import { findUpSync } from 'find-up';
import { dirname } from 'node:path';
function findMonorepoRoot(cwd: string = process.cwd()) {
  const lockFile = findUpSync('pnpm-lock.yaml', {
    cwd,
    type: 'file',
  });
  console.log('findMonorepoRoot-lockFile-', lockFile);
  return dirname(lockFile || '');
}
/**
 * 同步获取所有的大仓
 * @returns
 */
function getPackagesSync() {
  const root = findMonorepoRoot();
  return getPackagesSyncFunc(root);
}
async function getPackages() {
  const root = findMonorepoRoot();
  return await getPackagesFunc(root);
}
/**
 *
 * @param pkgName
 */
async function getPackage(pkgName: string) {
  const { packages } = await getPackages();
  return packages.find((pkg) => pkg.packageJson.name === pkgName);
}
export { findMonorepoRoot, getPackage, getPackagesSync };
