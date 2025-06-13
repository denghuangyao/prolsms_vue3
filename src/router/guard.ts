import { coreRouteNames, accessRoutes } from './routes'
import { useAccessStore, useUserStore, useAuthStore } from '@/stores'
import { LOGIN_PATH, defaultHomePath } from '@/constants'
import { generateAccess } from './access'

import type { Router } from 'vue-router'
import { _import } from './routes/modules'
/**
 * 创建路由守卫
 */
/**
 * 通用路由守卫:处理路由页面加载滚动条
 * @param router
 */
function setCommonGuard(router: Router) {}
/**
 * 权限访问守卫配置
 * @param router
 */
function setupAccessGuard(router: Router) {
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
    /**
     * accessRoutes两种路由配置，
     * 一种根据系统类型过滤的路由，
     * 一种通过router/routes/modules引入的路由
     */
    const preloadRoutes = [...(await _import())]
    console.log('preloadRoutes--', JSON.parse(JSON.stringify(preloadRoutes)))
    console.log('accessRoutes--', JSON.parse(JSON.stringify(accessRoutes)))
    //过滤路由表,生成动态路由表 /path
    let userInfo = userStore?.userInfo || (await authStore.fetchUserInfo())
    let permissions = userInfo?.permission ?? []
    const { accessibleRoutes, accessibleMenus } = generateAccess({
      router,
      permissions,
      routes: [...accessRoutes, ...preloadRoutes],
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
    } else if (userInfo?.homePath && to.path === userInfo.homePath) {
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
}

function createRouterGuard(router: Router) {
  //通用路由守卫
  setCommonGuard(router)
  //权限路由守卫
  setupAccessGuard(router)
}
export { createRouterGuard }
