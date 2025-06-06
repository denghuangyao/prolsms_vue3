import 'vue-router'
import type { RouterMeta as IRouterMeta } from 'vue-router'
declare module 'vue-router' {
  interface RouterMeta extends IRouterMeta {
    key?: string //路由权限表唯一标识
    label?: string //菜单名称
    icon?: Component | string //菜单图标
    /**
     * 当前路由在菜单中不展现
     * @default false
     */
    hideInMenu?: boolean
  }
}
export {}
