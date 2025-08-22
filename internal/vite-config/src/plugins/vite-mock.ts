import { viteMockServe, type ViteMockOptions } from 'vite-plugin-mock';
import { getPackage } from '@dhy/node-utils';
import { join } from 'node:path';

export const viteMockPlugin = async ({
  mockPath = '@dhy/backend-mock', // mock文件存放目录
  logger = true, // 是否在控制台显示请求日志
}: ViteMockOptions = {}) => {
  const pkg = await getPackage(mockPath);
  if (!pkg) {
    console.log(`Package ${mockPath} not found. Skip mock server.`);
    return;
  }
  console.log('-viteMockPlugin-', join(pkg.dir, 'mock'));
  return viteMockServe({
    mockPath: join(pkg.dir, 'mock'), // mock文件存放目录
    logger, // 是否在控制台显示请求日志
  });
};
