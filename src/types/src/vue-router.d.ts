import type { Router, RouteRecordRaw } from 'vue-router'

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
export type { GenerateRoutesOptions }
