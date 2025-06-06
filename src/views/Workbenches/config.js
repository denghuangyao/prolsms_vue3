export const menuPageData = {
  icon: 'btn_gzt',
  key: 'homepage:menu',
  label: 'home',
  children: [
    {
      key1: 'home',
      key: 'work:plan',
      label: 'home',
      icon: 'dh_sy',
      path: '/gongzuotai/gongzuotai/gongzuotai',
    },
    {
      key1: 'personalcenter',
      key: 'work:gerenzhongxin',
      label: 'PersonalCenter',
      icon: 'dh_grzx',
      path: '/gongzuotai/gongzuotai/gerenshouye/gerenzhongxin',
    },
    {
      key1: 'examine',
      key: 'work:woderenwu', //此处权限key影响vuex中查询未审核数的判断
      label: 'iReview',
      icon: 'dh_wdsh',
      path: '/gongzuotai/myshenhe/myshenhechaxun',
    },
    {
      key1: 'message',
      key: 'message:chaxun', //此处权限key影响vuex中查询未读消息数的判断
      label: 'reminder',
      icon: 'dh_txxx',
      path: '/gongzuotai/tixingxiaoxi/tixingxiaoxichaxun',
    },
    {
      key1: 'resource',
      key: 'work:wodeziliao',
      label: 'resource',
      icon: 'dh_zlzx',
      path: '/gongzuotai/wodeziliao/wodeziliaochaxun',
    },
  ],
}
