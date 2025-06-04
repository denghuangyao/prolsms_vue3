import { createRouter, createWebHistory, type RouteRecord, type RouterMeta } from 'vue-router'
import { routes, coreRouteNames, accessRoutes } from './routes'
import { usePermissionStore, useAccessStore } from '@/stores'
import { LOGIN_PATH, defaultHomePath } from '@/constants'
import { generateAccess } from './access'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    //login/#top
    return to.hash ? { behavior: 'smooth', el: to.hash } : { left: 0, top: 0 }
  },
})
router.beforeEach((to, from) => {
  const permissionStore = usePermissionStore()
  const accessStore = useAccessStore()

  console.log('beforeEach-', to, routes, coreRouteNames, accessStore.accessToken, LOGIN_PATH)
  //基本路由：不需要权限拦截
  if (coreRouteNames.includes(to.name)) {
    //已经登录过，跳login会重定向到首页
    if (to.path === LOGIN_PATH && accessStore.accessToken) {
      return { to: defaultHomePath, replace: true }
    }
    return true
  }
  /**
   * 权限路由进行权限校验
   * 判断accessToken是否已登录=》
   *  未登录=》
   *    是否跳到登录页=》
   *      非登录页：则先跳到登录页并携带当前跳转的页面（redirect），登录后重新跳转该页面
   *      登录页：直接跳转，不携带参数
   *  已登录：校验权限
   * */
  //未登录
  if (!accessStore.accessToken) {
    //跳转非登录页
    if (to.fullPath !== LOGIN_PATH) {
      return {
        to: LOGIN_PATH,
        query: to.path === defaultHomePath ? {} : { redirect: encodeURIComponent(to.fullPath) },
        replace: true,
      }
    }
    //跳转到登录页
    return to
  }
  //accessRoutes
  console.log('accessRoutes--', accessRoutes)
  //过滤路由表 /path
  let permissions = permissionStore.getPermission()
  generateAccess({
    router,
    permissions,
    routes: accessRoutes,
  })
  if (permissions.includes(to.meta.key as string)) {
  }
  return true
})
export default router
