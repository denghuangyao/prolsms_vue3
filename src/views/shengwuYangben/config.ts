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
          label: 'yangbenDengji',
          componentPath: '/yangbenDengji/yangbenDengji',
        },
        {
          path: 'yangbenKucun',
          permission: 'swyb:yangbenKucun',
          label: 'samplesInventory',
          componentPath: '/yangbenKucun/yangbenKucun',
        },
        {
          path: 'yangbenLiushui',
          permission: 'swyb:yangbenLiushui',
          label: 'sampleWater',
          componentPath: '/yangbenLiushui/yangbenLiushui',
        },
      ],
    },
    {
      path: 'swybJichuxinxi',
      permission: 'swyb:jichuxinxi',
      label: 'basicInformation',
      icon: 'jcxx_menu',
      children: [
        {
          path: 'rongqiGuanli',
          permission: 'swyb:rongqiGuanli',
          label: 'containerManagement',
          componentPath: '/rongqiGuanli/rongqiGuanli',
        },
        {
          path: 'containerType',
          permission: 'swyb:rongqiLeixing',
          label: 'containerType',
          componentPath: '/rongqiLeixing/rongqiLeixing',
        },
        {
          path: 'tongyongZidian',
          permission: 'swyb:tongyongZidian',
          label: 'tongyongzidian',
          componentPath: '/tongyongZidian/tongyongZidian',
        },
        {
          path: 'fangjianGuanli',
          permission: 'swyb:fangjianGuanli',
          label: 'fangjianGuanli',
          componentPath: '/fangjianGuanli/fangjianGuanli',
        },
      ],
    },
  ],
}
