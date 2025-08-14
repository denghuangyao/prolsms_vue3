export const menuPageData: MenuConfigRecordRaw = {
  icon: 'swyb_menu',
  permission: 'shengwuYangben:menu',
  label: '生物样本',
  path: 'shengwuYangben',
  children: [
    {
      path: 'swybYangbenGuanli',
      permission: 'swyb:yangbenGuanli',
      label: '样本管理',
      icon: 'btn_gzt',
      children: [
        {
          path: 'yangbenyuan',
          permission: 'swyb:yangbenyuan',
          label: '样本源',
          componentPath: '/yangbenyuan/yangbenyuan',
        },
        {
          path: 'yangbenDengji',
          permission: 'swyb:yangbenDengji',
          label: '样本登记',
          componentPath: '/yangbenDengji/yangbenDengji',
        },
        {
          path: 'yangbenKucun',
          permission: 'swyb:yangbenKucun',
          label: '样本库存',
          componentPath: '/yangbenKucun/yangbenKucun',
        },
        {
          path: 'yangbenLiushui',
          permission: 'swyb:yangbenLiushui',
          label: '样本流水',
          componentPath: '/yangbenLiushui/yangbenLiushui',
        },
      ],
    },
    {
      path: 'swybJichuxinxi',
      permission: 'swyb:jichuxinxi',
      label: '基础信息',
      icon: 'jcxx_menu',
      children: [
        {
          path: 'rongqiGuanli',
          permission: 'swyb:rongqiGuanli',
          label: '容器管理',
          componentPath: '/rongqiGuanli/rongqiGuanli',
        },
        {
          path: 'containerType',
          permission: 'swyb:rongqiLeixing',
          label: '容器类型',
          componentPath: '/rongqiLeixing/rongqiLeixing',
        },
        {
          path: 'tongyongZidian',
          permission: 'swyb:tongyongZidian',
          label: '通用字典',
          componentPath: '/tongyongZidian/tongyongZidian',
        },
        {
          path: 'fangjianGuanli',
          permission: 'swyb:fangjianGuanli',
          label: '房间管理',
          componentPath: '/fangjianGuanli/fangjianGuanli',
        },
      ],
    },
  ],
};
