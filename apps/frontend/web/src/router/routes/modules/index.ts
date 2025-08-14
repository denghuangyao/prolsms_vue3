import { checkSystemType, createViewsRoutes, preloadDynamicViews } from '@dhy/utils';
import { DynamicViews } from '@dhy/constants';
import type { RouteRecordRaw } from 'vue-router';
/** 路由页面在这里导入 */
async function _import(): Promise<RouteRecordRaw[]> {
  //1.根据系统类型筛选需要加载的模块路径
  const activePaths = Object.entries(DynamicViews)
    .filter(([systemType, _]) => Config.bAllRight || checkSystemType(systemType))
    .map(([_, path]) => path);
  //2.获取所需加载模块的第一层级Config.ts文件
  const modules: Record<string, any> = import.meta.glob([`@/views/*/config.[jt]s`]);
  // console.log('modules--', modules, activePaths)
  //3. 筛选并预加载活动模块
  const activeModules = Object.entries(modules).reduce((acc, [path, module]) => {
    //获取模块在views下的哪个目录
    const dir = path.replace(/^\/src\/views\/(.*)\/config.[jt]s$/, '$1');
    return dir && activePaths.includes(dir) ? { ...acc, ...{ [path]: module } } : acc;
  }, {});
  console.log('activeModules', activeModules);
  const viewsModules = await preloadDynamicViews(activeModules);
  console.log('viewsModules--', viewsModules);
  return createViewsRoutes(viewsModules);
}
export { _import };
