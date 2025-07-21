import type { RouteRecordRaw } from 'vue-router';
// 定义模块类型
interface RouteModuleType {
  default: RouteRecordRaw[];
}
/**
 * 合并动态路由模块的默认导出
 * @param routeModules
 * @returns
 */
function mergeRouteModules(routeModules: Record<string, unknown>): RouteRecordRaw[] {
  const mergedRoutes: RouteRecordRaw[] = [];
  for (const routeModule of Object.values(routeModules)) {
    const moduleRoutes = (routeModule as RouteModuleType)?.default ?? [];
    mergedRoutes.push(...moduleRoutes);
  }
  console.log('mergedRoutes--', JSON.parse(JSON.stringify(mergedRoutes)));
  return mergedRoutes;
}
export { mergeRouteModules };
