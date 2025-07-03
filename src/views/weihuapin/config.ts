export const menuPageData: MenuConfigRecordRaw = {
  icon: 'dh_whp',
  permission: 'weihuapin:menu',
  label: '危化品',
  path: 'chemicals',
  children: [
    {
      path: 'basicManagement',
      permission: 'whp:jichuguanli',
      label: '基础管理',
      icon: 'jcxx_menu',
      children: [
        {
          path: 'basicInformation',
          permission: 'whp:jichuxinxi',
          label: '基础信息',
          componentPath: '/jichuxinxi/whpJichuXinxi',
        },
      ],
    },
  ],
};
