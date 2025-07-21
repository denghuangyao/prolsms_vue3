import { acceptHMRUpdate, defineStore } from 'pinia';
import type { RouteRecordRaw } from 'vue-router';
import type { MenuRecordRaw } from '@dhy/types';
import { findMenuByPath } from '@dhy/utils';
/**
 * SecureLS:安全的本地存储解决方案
 */
type AccessToken = null | string;
interface AccessState {
  /**用户按钮权限码（按钮） */
  accessCodes: string[];
  /**可访问的菜单列表 */
  accessMenus: MenuRecordRaw[];
  /**可访问路由列表 */
  accessRoutes: RouteRecordRaw[];
  /**
   * 登录 accessToken
   */
  accessToken: AccessToken;
  /**
   * 是否检查过权限
   */
  isCheckedAccess: boolean;
  /**
   * 登录是否过期(退出登录失效+或token失效)
   */
  loginExpired: boolean;
}
export const useAccessStore = defineStore('access', {
  state: (): AccessState => ({
    accessCodes: [],
    accessMenus: [],
    accessToken: null,
    accessRoutes: [],
    isCheckedAccess: false,
    loginExpired: false,
  }),
  persist: {
    pick: ['accessToken'],
  },
  actions: {
    getMenuByPath(path: string) {
      return findMenuByPath(this.accessMenus, path);
    },
    setIsCheckedAccess(isCheckedAccess: boolean) {
      this.isCheckedAccess = isCheckedAccess;
    },
    setAccessRoutes(accessRoutes: RouteRecordRaw[]) {
      this.accessRoutes = accessRoutes;
    },
    setAccessMenus(accessMenus: []) {
      this.accessMenus = accessMenus;
    },
    setAccessToken(accessToken: AccessToken) {
      this.accessToken = accessToken;
    },
    setLoginExpired(loginExpired: boolean) {
      this.loginExpired = loginExpired;
    },
    setAccessCode(accessCodes: any) {
      this.accessCodes = accessCodes;
    },
  },
});
// 解决热更新问题
const hot = import.meta.hot;
if (hot) {
  hot.accept(acceptHMRUpdate(useAccessStore, hot));
}
