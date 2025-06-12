import type { Router, RouteRecordRaw } from 'vue-router'
/**扩展vue-router的RouteMeta */
interface RouteMeta {
  permission?: string //路由权限表唯一标识
  label?: string //菜单名称
  icon?: Component | string //菜单图标
  /**
   * 当前路由在菜单中不展现
   * @default false
   */
  hideInMenu?: boolean
  /**当前激活菜单 */
  activePath?: string
  /**
   * 菜单所携带的参数
   */
  query?: Recordable
}
interface GenerateRoutesOptions {
  router: Router
  routes: RouteRecordRaw[]
  permissions?: string[]
  /**
   * 不使用基础布局（仅在顶级生效）
   * 部分特殊页面如果不需要基础布局（页面顶部和侧边栏），可将noBasicLayout设置为true
   */
  noBasicLayout?: boolean
}
export type { RouteMeta, GenerateRoutesOptions }
