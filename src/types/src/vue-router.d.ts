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
  /**
   * 当前路由在标签中不展现
   * @default false
   */
  hideInTab?: boolean
  /**
   * 是否固定标签
   */
  affixTab?: boolean
  /**当前激活菜单 */
  activePath?: string
  /**
   * 菜单所携带的参数
   */
  query?: Recordable
  /**
   * 路由是否已经加载过
   */
  loaded?: boolean
  /**配置页面是否开启缓存，开启后页面会缓存，不会重新加载，仅在标签页启用时有效。 */
  keepAlive?: boolean
  /**
   * 路由的完整路径作为key（默认true）
   * @default true
   */
  fullPathKey?: boolean
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
