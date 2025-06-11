import 'vue-router'
import type { RouterMeta as IRouterMeta } from '@/types'
declare module 'vue-router' {
  interface RouterMeta extends IRouterMeta {}
}
