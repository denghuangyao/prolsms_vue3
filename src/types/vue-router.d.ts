import 'vue-router'
import type { RouteMeta as IRouteMeta } from '@/types'
declare module 'vue-router' {
  interface RouteMeta extends IRouteMeta {}
}
