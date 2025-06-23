import type { TabDefinition } from '@/types'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref, toRaw } from 'vue'
import { type RouteLocationNormalized, type Router, type RouteRecordNormalized } from 'vue-router'
import { preferences } from '@/preferences'
export const useTabbarStore = defineStore(
  'tabbar',
  () => {
    const tabs = ref<TabDefinition[]>([])
    const getTabs = () => {
      return tabs.value
    }
    const addTab = (routeTab: TabDefinition) => {
      let tab = cloneTab(routeTab)
      if (!tab.key) {
        tab.key = getTabKey(tab)
      }
      if (!isTabShow(tab)) {
        return tab
      }
      const tabIndex = tabs.value.findIndex((item) => item.key === tab.key)
      if (tabIndex === -1) {
        //已存在标签,判断标签最大数量
        const maxCount = preferences.tabbar.maxCount
        if (maxCount > 0 && tabs.value.length >= maxCount) {
          //关闭第一个
          const index = tabs.value.findIndex(
            (item) => !Reflect.has(item.meta, 'affixTab') && !item.meta.affixTab,
          )
          index != -1 && tabs.value.splice(index, 1)
        }
        tabs.value.push(tab)
      } else {
        // 页面已经存在，不重复添加选项卡，只更新选项卡参数
        const currentTab = toRaw(tabs.value[tabIndex])
        // console.log('--currentTab-', currentTab, tabs.value[tabIndex])
        const mergeTab = {
          ...currentTab,
          ...tab,
          meta: { ...currentTab?.meta, ...tab.meta },
        }
        if (currentTab) {
          const curMeta = currentTab.meta
          if (Reflect.has(curMeta, 'affixTab')) {
            mergeTab.meta.affixTab = curMeta.affixTab
          }
          if (Reflect.has(curMeta, 'newTabTitle')) {
            mergeTab.meta.newTabTitle = curMeta.newTabTitle
          }
        }
        tab = mergeTab
        tabs.value.splice(tabIndex, 1, mergeTab)
      }
      return tab
    }
    /**
     * 通过key关闭标签页
     * @param key
     * @param router
     * @returns
     */
    const closeTabByKey = (key: string, router: Router) => {
      const originalKey = decodeURIComponent(key)
      const index = tabs.value.findIndex((item) => item.key === originalKey)
      if (index === -1) return
      const tab = tabs.value[index]
      if (tab) {
        closeTab(tab, router)
      }
    }
    /**
     * 关闭标签页：
     *  是否是激活页
     *    =》是，关闭标签页并跳转下一页或上一页
     *    =》否，直接关闭标签页
     * @param tab
     * @param router
     * @returns
     */
    const closeTab = async (tab: TabDefinition, router: Router) => {
      const { currentRoute } = router
      //如果关闭的不是激活选项
      if (getTabKeyFromTab(tab) !== getTabKey(currentRoute.value)) {
        _close(tab)
        return
      }
      const index = tabs.value.findIndex(
        (item) => getTabKeyFromTab(item) === getTabKey(currentRoute.value),
      )
      const after = tabs.value[index + 1]
      const before = tabs.value[index - 1]
      if (after) {
        // 下一个tab存在，跳转到下一个
        _close(tab)
        await _goToTab(after, router)
      } else if (before) {
        // 上一个tab存在，跳转到上一个
        _close(tab)
        await _goToTab(before, router)
      } else {
        console.error('Failed to close the tab; only one tab remains open.')
      }
    }
    /**
     * 关闭标签，固定标签页不关闭
     * @param tab
     * @returns
     */
    const _close = (tab: TabDefinition) => {
      if (isAffixTab(tab)) {
        return
      }
      const index = tabs.value.findIndex((item) => item.key === tab.key)
      index != -1 && tabs.value.splice(index, 1)
    }
    /**
     * 跳转到标签页
     * @param tab
     * @param router
     */
    const _goToTab = async (tab: TabDefinition, router: Router) => {
      const { path, query, params } = tab
      const toParams = {
        path,
        query: query || {},
        params: params || {},
      }
      await router.replace(toParams)
    }
    /**
     * 根据tab的key获取tab
     * @param key
     */
    const getTabByKey = (key: string) => {
      return tabs.value.find((item) => getTabKeyFromTab(item) === key) as TabDefinition
    }
    return {
      tabs,
      addTab,
      closeTabByKey,
      getTabs,
      getTabByKey,
    }
  },
  {
    persist: {
      // tabs不需要保存在localStorage
      pick: ['tabs'],
      storage: sessionStorage,
    },
  },
)
// 解决热更新问题
const hot = import.meta.hot
if (hot) {
  hot.accept(acceptHMRUpdate(useTabbarStore, hot))
}
/**
 * @zh_CN 克隆路由,防止路由被修改
 * @param route
 */
function cloneTab(route: TabDefinition): TabDefinition {
  if (!route) return route
  //其他参数赋值给opt
  const { meta, matched, ...opt } = route
  // console.log('cloneTab--', opt)
  return {
    ...opt,
    matched: matched.map((item) => ({
      name: item.name,
      path: item.path,
      meta: item.meta,
    })) as RouteRecordNormalized[],
    meta: {
      ...meta,
      newTabTitle: meta.newTabTitle, //扩展，可动态修改tab标题
    },
  }
}
/**
 * 从route获取tab页的key
 * @param tab
 * @returns
 * 每个标签页Tab使用唯一的key标识，设置Tab key有三种方式，优先级由高到低：
 * - 使用路由query参数pageKey
 * - 路由的完整路径作为key
 * - 路由的path作为key
 */
function getTabKey(tab: RouteLocationNormalized | RouteRecordNormalized) {
  const {
    fullPath,
    path,
    meta: { fullPathKey },
    query = {},
  } = tab as RouteLocationNormalized
  //pageKey可能是数组（查询参数重复时可能出现）
  let pageKey = Array.isArray(query.pageKey) ? query.pageKey[0] : query.pageKey
  let rawKey
  if (pageKey) {
    rawKey = pageKey
  } else if (fullPathKey === false) {
    rawKey = path
  } else {
    rawKey = fullPath
  }
  try {
    return decodeURIComponent(rawKey)
  } catch (e) {
    return rawKey
  }
}
/**
 * 是否显示标签
 * @param tab
 */
function isTabShow(tab: TabDefinition) {
  const matched = tab.matched ?? []
  return !tab.meta.hideInTab && matched.every((item) => !item.meta.hideInTab)
}
/**
 * @zh_CN 是否是固定标签页
 * @param tab
 */
function isAffixTab(tab: TabDefinition) {
  return tab?.meta?.affixTab ?? false
}
/**
 * 从标签页获取key
 * @param tab
 */
function getTabKeyFromTab(tab: TabDefinition) {
  return tab.key ?? getTabKey(tab)
}
export { getTabKey }
