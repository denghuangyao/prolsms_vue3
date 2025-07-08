type ContainerStatus = 'IN_STORAGE' | 'DISABLED' | 'ENABLED';
type ContainerType = 'NITROGEN_CYLINDER' | 'REFRIGERATOR' | 'RACK' | 'BOX';
type SampleStatus = 'IN_STORAGE' | 'TEMPORARILY_REMOVED';
interface ContainerInfo {
  id?: any; //容器id
  name?: string; //容器名称
  rackQuantity?: number; //子容器数
  sampleQuantity?: number; //总样本数
  rowCount?: number; //容器行数
  maxRackQuantity?: number; //容器列数
  status?: ContainerStatus; //容器状态
  type?: ContainerType;
  specs?: string; //规格
}
interface LevelFirstConInfo {
  children?: LevelFirstConInfo[];
  maxRackQuantity?: number;
  isChecked?: boolean;
  status: ContainerStatus;
  name: string;
  storey: number; //在一级容器中位于第几层，提篮只有一层
  storeyColumn: number; //在一级容器中位于第几列
  isSelected?: boolean;
  rowCount: number; //冻存架行数
  columnCount?: number; //冻存架列数
  type?: ContainerType;
  id?: any; //冻存架id
  parentConId?: any; //一级容器id
}
//冻存架
interface LevelSedConInfo {
  children?: LevelSedConInfo[];
  name: string;
  totalCount: number;
  sampleQuantity: number;
  rackRow: number; //位于冻存架第几行
  rackColumn: number; //位于冻存架第几列
  isChecked?: boolean;
  status: ContainerStatus;
  id?: any; //冻存盒id
  parentConId?: any; //一级容器id
}
interface LevelThirdConInfo {
  rowCount?: number;
  columnCount?: number;
  sampleQuantity?: number;
  fromToLocation?: string;
  status?: ContainerStatus;
}
interface RackColumnPlane extends ContainerInfo {
  // 父容器位置（x,y,z):第几层的第几列的第几个冻存架格子
  parentLocationXYZ: string;
  // 容器名称
  name: string;
  // 容器冻存架抽屉的第几列
  y: string | number;
  // 容器冻存架抽屉的第几行
  x: string | number; //从下到上，行号递增
  rackRow: number;
  rackColumn: number;
}
interface StorageLocation {
  containerRackId?: any;
  containerBoxId?: any;
  boxRow: number;
  boxColumn: number;
  rackRow: number;
}

interface MiniBoxInfo {
  boxRow?: number;
  boxColumn?: number;
  sampleStatus?: SampleStatus; //样本状态
  sampleCode?: string; //样本编号
  sampleId?: any; //样本id
  parentConId?: any; //一级容器id
  rackId?: any; //冻存架id
}
interface SampleInfo {
  id: any; //样本id
  code?: string; //样本编号
  registrant?: string; //登记人
  registrationDate?: string; //登记日期
  name?: string; //样本名称
  expirationDate?: string; //过期日期
  sampleSourceCode?: string; //样本源编号
  sampleSourceName?: string; //样本源名称
  capacity?: string; //容量
  storageLocation?: string; //存放位置
  freezingThawCount?: number; //冻融次数
  description?: string; //描述
}

export type {
  SampleInfo,
  MiniBoxInfo,
  LevelThirdConInfo,
  StorageLocation,
  ContainerInfo,
  LevelFirstConInfo,
  RackColumnPlane,
  LevelSedConInfo,
};
