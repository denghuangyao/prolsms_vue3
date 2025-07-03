/**
 *
 * 获取激活的一级菜单的下级所有菜单
 * 根据访问路径获取激活菜单
 * 获取当前激活的菜单
 */
import { getCurrentInstance } from 'vue';
function useMenu() {
  //只能在setup函数中使用
  const instance = getCurrentInstance();
  if (!instance) {
    throw new Error('instance is required');
  }
}

export { useMenu };
