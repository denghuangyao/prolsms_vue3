import type { RouteRecordRaw } from 'vue-router'
const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'btn_gzt',
      //   key: 'homepage:menu',
      label: '工作台',
    },
    name: 'workbenches',
    path: 'workbenches',
    children: [
      {
        meta: {
          //   key: 'work:plan',
          label: '首页',
          icon: 'dh_sy',
        },
        path: '',
        name: 'home',
        component: () => import('@/views/Workbenches/Home/index.vue'),
      },
    ],
  },
]
export default routes
