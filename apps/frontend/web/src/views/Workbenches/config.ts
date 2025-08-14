export const menuPageData: MenuConfigRecordRaw = {
  icon: 'btn_gzt',
  permission: 'homepage:menu',
  label: '工作台',
  path: 'workbenches',
  children: [
    {
      path: '',
      permission: 'work:plan',
      label: '首页',
      icon: 'dh_sy',
      query: {
        pageKey: '123',
      },
      componentPath: '/Home/index',
    },
  ],
};
