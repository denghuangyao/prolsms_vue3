import { useAccessStore } from '@/stores'
import { findRootMenuByPath } from '@/utils'
import { computed, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import { useNavigation } from './use-navigation'
//   console.log('--useMenu-', instance)
/**
 *
 * @returns
 */
function useMixedMenu() {
  const route = useRoute()
  const accessStore = useAccessStore()
  const { rootMenu } = findRootMenuByPath(accessStore.accessMenus, route.path)
  console.log('rootMenu--', rootMenu)
  const { navigation } = useNavigation()
  const menus = computed(() => accessStore.accessMenus)
  //头部菜单
  const headerMenus = computed(() => menus.value)
  const headerActive = () => {}
  //侧边菜单
  const sidebarMenus = computed(() => [])

  /**
   * 计算侧边菜单
   * @param path 路由路径
   */
  const calcSideMenus = (path: string = route.path) => {
    const { rootMenu } = findRootMenuByPath(accessStore.accessMenus, path)
    console.log('rootMenu--', rootMenu)
  }
  /**
   * 菜单点击事件处理
   * @param key 菜单路径path
   * @param mode 菜单模式，'horizontal' | 'vertical'
   */
  const handleMenuSelect = (key: string, mode?: string) => {
    console.log('-handleMenuSelect-', key)
    //侧边菜单点击直接跳转
    if (mode === 'vertical') {
      navigation(key)
      return
    }
    //头部菜单点击：获取侧边菜单，并跳转至默认侧边菜单
    const rootMenu = menus.value.find((item) => item.path === key)
    const _splitSideMenus = rootMenu?.children ?? []
    if (_splitSideMenus.length === 0) {
      navigation(key)
    } else if (rootMenu) {
    }
  }
  // 初始化计算侧边菜单
  onBeforeMount(() => {
    calcSideMenus(route.meta?.activePath || route.path)
  })
  return { headerMenus, sidebarMenus, handleMenuSelect }
}

export { useMixedMenu }
