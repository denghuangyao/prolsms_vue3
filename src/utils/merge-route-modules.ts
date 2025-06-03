import type { RouteRecordRaw } from 'vue-router'
// 定义模块类型
interface RouteModuleType {
  default: RouteRecordRaw[]
}
function mergeRouteModules(routeModules: Record<string, unknown>): RouteRecordRaw[] {
  const mergedRoutes: RouteRecordRaw[] = []
  for (let routeModule of Object.values(routeModules)) {
    let moduleRoutes = (routeModule as RouteModuleType)?.default ?? []
    console.log('moduleRoutes--', moduleRoutes)
    mergedRoutes.push(...moduleRoutes)
  }
  return mergedRoutes
}
export { mergeRouteModules }
