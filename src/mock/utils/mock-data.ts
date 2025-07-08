import type {
  ContainerInfo,
  LevelFirstConInfo,
  LevelSedConInfo,
  MiniBoxInfo,
  SampleInfo,
} from '@/components/biobank';
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
interface Containner extends ContainerInfo {
  rackInfoList?: LevelFirstConInfo[];
  boxInfoList?: LevelSedConInfo[];
}
export const MOCK_CONTAINNERS: Containner[] = [
  {
    id: 1,
    name: '冰箱001',
    rackQuantity: 10,
    sampleQuantity: 2, //总样本数
    rowCount: 5, //容器行数
    maxRackQuantity: 5, //容器列数
    status: 'ENABLED', //容器状态
    type: 'REFRIGERATOR',
    specs: '12', //规格
  },
  {
    id: 2,
    name: '液氮罐01',
    rackQuantity: 5,
    sampleQuantity: 2, //总样本数
    rowCount: 1, //容器行数
    maxRackQuantity: 6, //容器列数
    status: 'ENABLED', //容器状态
    type: 'NITROGEN_CYLINDER',
    specs: '10L*10L', //规格
  },
];
interface RackContainer extends LevelFirstConInfo {
  boxInfoList?: LevelSedConInfo[];
}
export const MOCK_RACKLIST: RackContainer[] = [
  {
    name: '冻存架01',
    rowCount: 5,
    columnCount: 5,
    status: 'ENABLED', //容器状态
    type: 'RACK',
    storey: 5,
    storeyColumn: 1,
    id: 1,
    parentConId: 1,
  },
  {
    name: '冻存架02',
    rowCount: 5,
    columnCount: 5,
    status: 'ENABLED', //容器状态
    type: 'RACK',
    storey: 1, //液氮罐的层数都为1
    storeyColumn: 5,
    id: 2,
    parentConId: 2,
  },
];
interface BoxContainer extends LevelSedConInfo {
  containerLocationList?: MiniBoxInfo[];
  rowCount?: number; //冻存盒行数
  columnCount?: number; //冻存盒列数
}
export const MOCK_BOXLIST: BoxContainer[] = [
  {
    name: '冻存盒01',
    id: 1,
    parentConId: 1,
    rackRow: 5,
    rackColumn: 5,
    rowCount: 10,
    columnCount: 10,
    totalCount: 10,
    sampleQuantity: 2,
    status: 'ENABLED',
    containerLocationList: [
      {
        boxRow: 1,
        boxColumn: 2,
        sampleStatus: 'TEMPORARILY_REMOVED',
        sampleCode: '0001',
        sampleId: 1,
      },
      {
        boxRow: 1,
        boxColumn: 1,
        sampleStatus: 'IN_STORAGE',
        sampleCode: '0002',
        sampleId: 2,
      },
    ],
  },
  {
    name: '冻存盒02',
    id: 2,
    parentConId: 2,
    rackRow: 1,
    rackColumn: 1,
    rowCount: 5,
    columnCount: 5,
    totalCount: 10,
    sampleQuantity: 1,
    status: 'ENABLED',
    containerLocationList: [
      {
        boxRow: 5,
        boxColumn: 1,
        sampleStatus: 'IN_STORAGE',
        sampleCode: '0003',
        sampleId: 3,
      },
    ],
  },
  {
    name: '冻存盒03',
    id: 2,
    parentConId: 2,
    rackRow: 1,
    rackColumn: 5,
    rowCount: 8,
    columnCount: 8,
    totalCount: 0,
    sampleQuantity: 1,
    status: 'DISABLED',
    containerLocationList: [
      {
        boxRow: 1,
        boxColumn: 1,
        sampleStatus: 'IN_STORAGE',
        sampleCode: '0004',
        sampleId: 4,
      },
    ],
  },
];
export const MOCK_SYMPLELIST: SampleInfo[] = [
  {
    id: 1,
    code: 'YB0001',
    registrant: 'denny', //登记人
    registrationDate: '2025-4-5', //登记日期
    name: '样本0001', //样本名称
    expirationDate: '2027-4-5', //过期日期
    sampleSourceCode: 'YBY0001', //样本源编号
    sampleSourceName: '样本源0001', //样本源名称
    capacity: '10L', //容量
    storageLocation: '', //存放位置
    freezingThawCount: 12, //冻融次数
    description: '医疗研究用', //描述
  },
  {
    id: 2,
    code: 'YB0002',
    registrant: 'denny', //登记人
    registrationDate: '2025-4-5', //登记日期
    name: '样本0002', //样本名称
    expirationDate: '2028-4-5', //过期日期
    sampleSourceCode: 'YBY0002', //样本源编号
    sampleSourceName: '样本源0002', //样本源名称
    capacity: '10L', //容量
    storageLocation: '', //存放位置
    freezingThawCount: 1, //冻融次数
    description: '医疗研究用', //描述
  },
  {
    id: 3,
    code: 'YB0003',
    registrant: 'denny', //登记人
    registrationDate: '2025-4-5', //登记日期
    name: '样本0003', //样本名称
    expirationDate: '2027-4-5', //过期日期
    sampleSourceCode: 'YBY0003', //样本源编号
    sampleSourceName: '样本源0003', //样本源名称
    capacity: '10L', //容量
    storageLocation: '', //存放位置
    freezingThawCount: 2, //冻融次数
    description: '医疗研究用', //描述
  },
  {
    id: 4,
    code: 'YB0004',
    registrant: 'denny', //登记人
    registrationDate: '2025-4-5', //登记日期
    name: '样本0004', //样本名称
    expirationDate: '2026-4-5', //过期日期
    sampleSourceCode: 'YBY0004', //样本源编号
    sampleSourceName: '样本源0004', //样本源名称
    capacity: '10L', //容量
    storageLocation: '', //存放位置
    freezingThawCount: 12, //冻融次数
    description: '医疗研究用', //描述
  },
];
