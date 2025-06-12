/**
 *
 * 获取激活的一级菜单的下级所有菜单
 * 根据访问路径获取激活菜单
 * 获取当前激活的菜单
 */
// import { getCurrentInstance } from 'vue'
// //只能在setup函数中使用
//   const instance = getCurrentInstance()
//   if (!instance) {
//     throw new Error('instance is required')
//   }

import { useAccessStore } from '@/stores'
import { findRootMenuByPath } from '@/utils'
import { useRoute } from 'vue-router'

//   console.log('--useMenu-', instance)
function useMenu() {
  const route = useRoute()
  const accessStore = useAccessStore()
  const { rootMenu } = findRootMenuByPath(accessStore.accessMenus, route.path)
  console.log('rootMenu--', rootMenu)
  /**
   * 选择菜单事件
   */
  const handleMenuSelect = () => {}
  return { handleMenuSelect }
}

export { useMenu }
