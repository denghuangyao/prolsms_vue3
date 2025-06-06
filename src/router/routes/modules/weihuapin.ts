import type { RouteRecordRaw } from 'vue-router'
const routes: RouteRecordRaw[] = [
  {
    meta: {
      key: 'weihuapin:menu',
      label: 'hazardousChemicals',
      icon: 'dh_whp',
    },
    path: 'chemicals',
    children: [
      {
        meta: {
          key: 'whp:jichuguanli',
          label: 'basicManagement',
          icon: 'jcxx_menu',
        },
        name: 'chemicalsBasicManagement',
        path: 'basicManagement',
        children: [
          {
            meta: {
              key: 'whp:jichuxinxi',
              label: 'basicInformation',
            },
            name: 'chemicalsBasicInformation',
            path: 'basicInformation',
            component: () => import('@/views/weihuapin/jichuxinxi/WhpJichuXinxi.vue'),
          },
        ],
      },
    ],
  },
]
export default routes
