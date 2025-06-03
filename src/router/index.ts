import { createRouter, createWebHistory, type RouteRecord, type RouterMeta } from 'vue-router'
import { routes, coreRouteNames } from './routes'
import { usePermissionStore } from '@/stores/modules/permissionStore'
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
const permissionStore = usePermissionStore()
router.beforeEach((to, from, next) => {
  console.log('beforeEach-', to, from, routes, coreRouteNames)
  if (!coreRouteNames.includes(to.name)) {
    let permission = permissionStore.getPermission()
    if (permission.includes(to.meta.key as string)) {
    }
  } else next()
})
export default router
