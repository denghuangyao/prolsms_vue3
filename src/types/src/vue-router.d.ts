import type { Router, RouteRecordRaw } from 'vue-router'

interface GenerateRoutesOptions {
  router: Router
  routes: RouteRecordRaw[]
  permissions?: string[]
}
export type { GenerateRoutesOptions }
