import type { RouteRecordRaw } from 'vue-router';
import type { Component } from 'vue';
/**
 * 扩展路由记录类型
 */
type ExRouteRecordRaw = RouteRecordRaw & {
  parent?: string;
  parents?: string[];
  path?: any;
};
/**
 * 生成菜单记录
 */
interface MenuRecordRaw {
  order?: number; //菜单排序号
  activeIcon?: string; //激活菜单icon
  label: string; //菜单名
  permission?: string; //菜单权限
  parent?: string; //父级路径
  parents?: string[]; //所有父级路径
  path: string; //菜单唯一路径
  children?: MenuRecordRaw[]; //子菜单
  icon?: Component | string; //图标名
  /**
   * 是否显示菜单
   * @default true
   */
  show?: boolean;
}

export type { ExRouteRecordRaw, MenuRecordRaw };
