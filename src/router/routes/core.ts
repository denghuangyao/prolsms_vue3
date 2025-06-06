import type { RouteRecordRaw } from 'vue-router'
import { defaultHomePath } from '@/constants'
//路由缺省页404
const fallbackRoute: RouteRecordRaw = {
  component: () => import('@/views/Fallback/NotFound.vue'),
  meta: {},
  name: 'FallbackNotFound',
  //将匹配所有内容并将其放在 `route.params.pathMatch` 下
  path: '/:pathMatch(.*)*',
}
//基本路由
const coreRoutes: RouteRecordRaw[] = [
  {
    //根路由
    path: '/',
    name: 'root',
    component: () => import('@/views/Layout/Layout.vue'),
    children: [],
    redirect: defaultHomePath,
  },
  {
    //登录页
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login/index.vue'),
  },
]
export { fallbackRoute, coreRoutes }
