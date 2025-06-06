import { createRouter, createWebHistory } from 'vue-router'
import { routes, coreRouteNames, accessRoutes } from './routes'
import { useAccessStore, useUserStore, useAuthStore } from '@/stores'
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
router.beforeEach(async (to, from) => {
  const userStore = useUserStore()
  const accessStore = useAccessStore()
  const authStore = useAuthStore()

  console.log('beforeEach-', from.name, to.name, coreRouteNames, accessStore.accessToken)
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
        path: LOGIN_PATH,
        query: to.path === defaultHomePath ? {} : { redirect: encodeURIComponent(to.fullPath) },
        replace: true,
      }
    }
    //跳转到登录页
    return to
  }
  if (accessStore.isCheckedAccess) {
    return true
  }
  //accessRoutes
  console.log('accessRoutes--', JSON.parse(JSON.stringify(accessRoutes)))
  //过滤路由表,生成动态路由表 /path
  let userInfo = userStore?.userInfo || (await authStore.fetchUserInfo())
  let permissions = userInfo?.permission ?? []
  const { accessibleRoutes, accessibleMenus } = generateAccess({
    router,
    permissions,
    routes: accessRoutes,
  })
  // 保存菜单信息和路由信息
  accessStore.setAccessRoutes(accessibleRoutes)
  accessStore.setAccessMenus(accessibleMenus)
  accessStore.setIsCheckedAccess(true)
  let redirectPath: string
  if (from.query.redirect) {
    redirectPath = from.query.redirect as string
  } else if (to.path === defaultHomePath) {
    redirectPath = defaultHomePath
  } else if (userInfo.homePath && to.path === userInfo.homePath) {
    redirectPath = userInfo.homePath
  } else {
    redirectPath = to.fullPath
  }
  console.log('-redirectPath-', redirectPath)
  return {
    ...router.resolve(decodeURIComponent(redirectPath)),
    replace: true,
  }
})
export default router
