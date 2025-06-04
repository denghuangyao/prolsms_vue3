import { acceptHMRUpdate, defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'
/**
 * SecureLS:安全的本地存储解决方案
 */
type AccessToken = null | string
interface AccessState {
  /**可访问的菜单列表 */
  accessMenus: []
  /**可访问路由列表 */
  accessRoutes: RouteRecordRaw[]
  /**
   * 登录 accessToken
   */
  accessToken: AccessToken
  /**
   * 是否检查过权限
   */
  isCheckedAccess: boolean
}
export const useAccessStore = defineStore('access', {
  state: (): AccessState => ({
    accessMenus: [],
    accessToken: null,
    accessRoutes: [],
    isCheckedAccess: false,
  }),
  persist: {
    pick: ['accessToken'],
  },
  actions: {
    setIsCheckedAccess(isCheckedAccess: boolean) {
      this.isCheckedAccess = isCheckedAccess
    },
    setAccessRoutes(accessRoutes: RouteRecordRaw[]) {
      this.accessRoutes = accessRoutes
    },
    setAccessMenus(accessMenus: []) {
      this.accessMenus = accessMenus
    },
    setAccessToken(accessToken: AccessToken) {
      this.accessToken = accessToken
    },
  },
})
// 解决热更新问题
const hot = import.meta.hot
if (hot) {
  hot.accept(acceptHMRUpdate(useAccessStore, hot))
}
