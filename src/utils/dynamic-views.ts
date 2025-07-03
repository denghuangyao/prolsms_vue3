import { mapTree } from '@/utils';
import type { RouteRecordRaw } from 'vue-router';
const DEFAULT_MODULE_PROPS = 'menuPageData';
interface MenuConfigOptions {
  //取模块对象字段，默认'menuPageData'
  moduleProps?: string;
}
interface ViewsModule {
  path: string;
  module: MenuConfigRecordRaw;
}
/**
 * 预加载动态视图模块
 */
export async function preloadDynamicViews(
  views: Record<string, () => Promise<any>>,
  option: MenuConfigOptions = {},
): Promise<ViewsModule[]> {
  let { moduleProps = DEFAULT_MODULE_PROPS } = option;
  let modules: ViewsModule[] = await Promise.all(
    Object.entries(views).map(async ([path, importModule]) => {
      try {
        const module = await importModule();
        return {
          path,
          module: module[moduleProps],
        };
      } catch (error) {
        console.error(`Failed to load module at ${path}:`, error);
        throw new Error(`Module loading failed: ${path}`);
      }
    }),
  );
  return modules;
}
/**
 * 加载视图组件
 */
function loadView(components: Record<string, unknown>, pathKey: string) {
  // 大小写不敏感查找
  const matchedKey = Object.keys(components).find((key) => {
    return key.toLowerCase() === pathKey.toLowerCase();
  });
  // console.log('pathKey, matchedKey-', pathKey, matchedKey)
  if (!matchedKey) {
    throw new Error(`未找到匹配的视图: ${pathKey}`);
  }
  return components[matchedKey];
}
export function createViewsRoutes(viewsModules: ViewsModule[]): RouteRecordRaw[] {
  const components = import.meta.glob(['@/views/**/*.vue', '!@/views/**/components/*.vue']);
  console.log('-components-', components, viewsModules);
  let modules = Object.values(viewsModules);
  let routes: RouteRecordRaw[] = [];
  modules.forEach(({ path: dir, module }) => {
    // console.log('-module-', module, dir)
    let prefixDir = dir?.replace(/\/config.[jt]s/, '');
    // let viewsDir = prefixDir?.replace(/\/src\/views\/(.*)/, '$1')
    const tree = mapTree<MenuConfigRecordRaw, RouteRecordRaw>([module], (item) => {
      let { path = '', permission, icon, label, componentPath, children, hideInMenu } = item;
      let routeName = (path || prefixDir).split('/').join('-') ?? '/';
      let route: any = {
        meta: { permission, icon, label, hideInMenu },
        name: routeName,
        path,
      };
      // console.log('path---', path, 'routeName--', routeName)
      if (children) {
        route.children = children;
      }
      if (componentPath) {
        let componentKey = `${prefixDir}${componentPath}.vue`;
        // console.log('-componentKey-', componentKey)
        route.component = loadView(components, componentKey);
      }
      return route;
    });
    routes = [...routes, ...tree];
  });
  console.log('createViewsRoutes--routes', routes);
  return routes;
}
if (import.meta.hot) {
  import.meta.hot.accept(() => {});
}
