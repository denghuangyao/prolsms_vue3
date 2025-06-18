import type { GenerateRoutesOptions } from '@/types'
import { cloneDeep, generateRoutesByFrontend, generateMenus } from '@/utils'
import type { RouteRecordRaw } from 'vue-router'
const forbiddenComponent = () => import('@/views/Fallback/Forbidden.vue')
export const generateAccess = (options: GenerateRoutesOptions) => {
  const modules = import.meta.glob(['@/views/**/*.vue', '!@/views/**/components/*.vue'], {
    eager: true,
    import: 'default',
  })
  console.log(modules)
  const { router, permissions } = options
  const root = router.getRoutes().find((item) => item.path === '/')
  const rootNames = root?.children?.map((item) => item.name)

  console.log('routes--', options.routes)
  const routes = cloneDeep(options.routes)
  // console.log('routes--', routes)
  const accessibleRoutes = generateRoutesByFrontend(routes, permissions || [])
  console.log('-accessibleRoutes-', accessibleRoutes)
  // 动态添加到router实例内
  accessibleRoutes.forEach((route: RouteRecordRaw) => {
    //将所有权限路由都包裹在根路由“/”下
    if (root && !route.meta?.noBasicLayout) {
      //是否已添加路由
      if (rootNames?.includes(route.name)) {
        //找到已存在的路由索引并更新，不更新会造成切换用户时，一级目录未更新，homePath 在二级目录导致的404问题
        let index = root.children?.findIndex((item) => item.name == route.name)
        if (index !== undefined && index !== -1 && root.children) {
          root.children[index] = route
        }
      } else {
        root.children?.push(route)
      }
    } else {
      //特殊情况：将路由放到最外层，不放在根路由children里面
      router.addRoute(route)
    }
  })
  console.log('root-generateAccess-1', router.getRoutes())
  if (root) {
    if (root.name) {
      router.removeRoute(root.name)
      console.log('root-generateAccess-2', router.getRoutes())
    }
    console.log('root-generateAccess-4')

    router.addRoute(root)
  }
  console.log('root-generateAccess-3', router.getRoutes())
  //生成菜单
  const accessibleMenus: any = generateMenus(accessibleRoutes, router)
  console.log('accessibleMenus--', accessibleMenus)
  return { accessibleMenus, accessibleRoutes }
}
