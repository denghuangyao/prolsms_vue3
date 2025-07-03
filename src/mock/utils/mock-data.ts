import type { Recordable } from 'vite-plugin-mock';

export interface UserInfo {
  id: number; //用户id
  username: string; //账号
  password?: string; //密码
  realName: string; //昵称
  roles: string[]; //角色
  btnPermission?: string[]; //按钮权限码
  permission?: string[]; //菜单权限码
  entryMap?: Recordable; //菜单路由入口
  homePath?: string; //首页入口
}
type menuEntry = {
  modelMenuPerms: string;
  entryMenuPerms: string;
};
export interface Role {
  id: number; //用户id
  name: string; //角色名
  btnPermission?: string[]; //按钮权限码
  permission?: string[]; //菜单权限码
  entryList?: menuEntry[]; //菜单入口路径配置
}
export const MOCK_USERS: UserInfo[] = [
  {
    id: 1,
    username: 'denny',
    realName: 'denny',
    password: '123456',
    roles: ['admin'],
    // homePath: '/workbenches',
  },
];
export const MOCK_ROLES: Role[] = [
  {
    id: 1,
    name: 'admin',
    //按钮
    btnPermission: [],
    //菜单
    permission: [
      'homepage:menu',
      'work:plan',
      'weihuapin:menu',
      'whp:jichuguanli',
      'whp:jichuxinxi',
      'shengwuYangben:menu',
      'swyb:yangbenGuanli',
      'swyb:yangbenyuan',
    ],
    entryList: [
      //菜单入口路径对应权限
      {
        modelMenuPerms: 'homepage:menu',
        entryMenuPerms: 'work:plan',
      },
      {
        modelMenuPerms: 'weihuapin:menu',
        entryMenuPerms: 'whp:jichuguanli',
      },
    ],
  },
];
