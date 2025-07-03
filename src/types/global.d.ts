declare const window: Window & typeof globalThis;
import type { RouteMeta } from '@/types';
declare global {
  /**
   * 模块所属config配置
   */
  type MenuConfigRecordRaw = RouteMeta & {
    children?: MenuConfigRecordRaw[];
    componentPath?: string; //组件相对路径（不包含/src/views）
    /**
     * 对应路由路径
     * @default ''
     **/
    path?: string;
  };
}
//必要，否则无法识别
export {}; //混合模式，仍然保持模块文件特性
