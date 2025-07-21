import type { RouteRecordRaw } from 'vue-router';
import { filterTree } from './tree';
/**
 * 动态生成路由：前端方式
 */
export function generateRoutesByFrontend(routes: RouteRecordRaw[], permissions: string[]) {
  const finalRoutes = filterTree(routes, (route) => {
    return hasAuthority(route, permissions);
  });
  return finalRoutes;
}
function hasAuthority(route: RouteRecordRaw, permissions: string[]) {
  const authority = route.meta?.permission;
  if (!authority) {
    return true;
  }
  return Config.bAllRight || permissions.includes(authority as string);
}
