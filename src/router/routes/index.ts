import type { RouteRecordRaw } from 'vue-router'
import { coreRoutes, fallbackRoute } from './core'
import { traverseTreeValues } from '@/utils/tree'
/** 路由列表，由基本路由、外部路由和404路由组成
 *  无需走权限验证 */
const routes: RouteRecordRaw[] = [...coreRoutes, fallbackRoute]
const dynamicRouteFiles = import.meta.glob('./modules/**.ts', { eager: true })
console.log('_dynamicRouteFiles', dynamicRouteFiles)
// function mergeRouteModules(
//   routeModules: Record<string, unknown>,
// ): RouteRecordRaw[] {
//   const mergedRoutes: RouteRecordRaw[] = [];

//   for (const routeModule of Object.values(routeModules)) {
//     const moduleRoutes = (routeModule as RouteModuleType)?.default ?? [];
//     mergedRoutes.push(...moduleRoutes);
//   }

//   return mergedRoutes;
// }
/** 基本路由列表，这些路由不需要进入权限拦截 */
const coreRouteNames = traverseTreeValues(coreRoutes, (route) => route.name)

/** 有权限校验的路由列表，包含动态路由和静态路由 */
// const accessRoutes = [...dynamicRoutes, ...staticRoutes]
export { coreRouteNames, routes }
