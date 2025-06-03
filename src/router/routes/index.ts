import type { RouteRecordRaw } from 'vue-router'
import { coreRoutes, fallbackRoute } from './core'
import { mergeRouteModules, traverseTreeValues } from '@/utils'
/** 路由列表，由基本路由、外部路由和404路由组成
 *  无需走权限验证 */
const routes: RouteRecordRaw[] = [...coreRoutes, fallbackRoute]
/**路由：约定大于配置
 *
 */

const dynamicRouteFiles = import.meta.glob('./modules/**.ts', { eager: true })
console.log('_dynamicRouteFiles', dynamicRouteFiles)
/** 基本路由列表，这些路由不需要进入权限拦截 */
const coreRouteNames = traverseTreeValues(coreRoutes, (route) => route.name)
const dynamicRoutes = mergeRouteModules(dynamicRouteFiles)
/** 有权限校验的路由列表，包含动态（加载）路由和静态路由（暂无）*/
const accessRoutes = [...dynamicRoutes]
export { coreRouteNames, routes, accessRoutes }
