import { useAccessStore, useUserStore } from '@/stores'
import { findRootMenuByPath } from '@/utils'
import { computed, onBeforeMount, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useNavigation } from './use-navigation'
import type { MenuRecordRaw } from '@/types'
//   console.log('--useMenu-', instance)
/**
 *
 * @returns
 */
function useMixedMenu() {
  const route = useRoute()
  const accessStore = useAccessStore()
  const userStore = useUserStore()
  const splitSideMenus = ref<MenuRecordRaw[]>([]) //侧边菜单
  const { rootMenu } = findRootMenuByPath(accessStore.accessMenus, route.path)
  console.log('rootMenu--', rootMenu)
  /** 记录当前顶级菜单下哪个子菜单最后激活 */
  const defaultSubMap = new Map<string, string>()
  const { navigation } = useNavigation()
  const menus = computed(() => accessStore.accessMenus)
  //头部菜单激活
  const rootMenuPath = ref<string>('')
  //头部菜单
  const headerMenus = computed(() =>
    menus.value.map((item) => {
      return {
        ...item,
        children: [],
      }
    }),
  )
  //头部菜单激活路径
  const headerActive = computed(() => rootMenuPath.value)
  //侧边菜单
  const sidebarMenus = computed(() => splitSideMenus.value)
  //侧边菜单激活路径
  const sidebarActive = computed(() => route.path)
  /**
   * 计算侧边菜单
   * @param path 路由路径
   */
  const calcSideMenus = (path: string = route.path) => {
    let { rootMenu } = findRootMenuByPath(menus.value, path)
    if (!rootMenu) {
      //当前是顶级菜单，位于头部
      rootMenu = menus.value.find((item) => item.path === path)
    }
    splitSideMenus.value = rootMenu?.children ?? []
    rootMenuPath.value = rootMenu?.path ?? ''
    console.log('calcSideMenus--', splitSideMenus)
  }
  //点击目录时自动激活子菜单
  const autoActivateChild = false
  /**
   * 菜单点击事件处理
   * @param key 菜单路径path
   * @param mode 菜单模式，'horizontal' | 'vertical'
   * horizontal：侧边菜单，vertical：导航面包屑，tab标签，头部菜单
   */
  const handleMenuSelect = (key: string, mode?: string) => {
    //侧边菜单点击直接跳转
    if (mode === 'vertical') {
      navigation(key)
      return
    }
    //头部菜单点击：获取侧边菜单，并跳转至默认侧边菜单
    const rootMenu = menus.value.find((item) => item.path === key)
    const _splitSideMenus = rootMenu?.children ?? []
    console.log('-handleMenuSelect-', rootMenu, _splitSideMenus, _splitSideMenus.length)
    splitSideMenus.value = _splitSideMenus
    if (_splitSideMenus.length === 0) {
      navigation(key)
    } else if (rootMenu && autoActivateChild) {
      navigation(
        defaultSubMap.has(rootMenu.path)
          ? (defaultSubMap.get(rootMenu.path) as string)
          : rootMenu.path,
      )
    }
  }
  const getActivePath = (permissionKey: string) => {
    // userStore.userInfo?.menuEntry[permissionKey]
  }
  // 初始化计算侧边菜单
  onBeforeMount(() => {
    calcSideMenus(route.path)
  })
  watch(
    () => route.path,
    (path) => {
      console.log('当前路由-', path)
      const currentPath = path
      calcSideMenus(currentPath)
      if (rootMenuPath.value) {
        defaultSubMap.set(rootMenuPath.value, currentPath)
      }
    },
    {
      immediate: true,
    },
  )
  return { headerMenus, headerActive, sidebarMenus, sidebarActive, handleMenuSelect }
}

export { useMixedMenu }
