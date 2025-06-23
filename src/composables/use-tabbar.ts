import { useTabbarStore, getTabKey } from '@/stores'
import { computed, watch, ref } from 'vue'
import { useNavigation } from '@/composables'
import { useRoute } from 'vue-router'
import { useTabs } from '@/composables'
function useTabbar() {
  const route = useRoute()
  const tabbarStore = useTabbarStore()
  const tabs = computed(() => tabbarStore.tabs)
  const { navigation } = useNavigation()
  const { closeTabByKey } = useTabs()
  const currentActive = computed(() => getTabKey(route))
  //点击标签路由跳转
  const handleClick = (key: string) => {
    const { fullPath, path } = tabbarStore.getTabByKey(key)
    navigation(fullPath || path)
  }
  //关闭标签页
  const handleClose = (key: string) => {
    closeTabByKey(key)
  }
  watch(
    () => route.fullPath,
    () => {
      //获取当前路由meta
      const meta = route.matched?.[route.matched.length - 1]?.meta
      console.log('useTabbar::route--matched', route.matched, meta, route.meta)
      tabbarStore.addTab({ ...route, meta: meta || route.meta })
    },
    {
      immediate: true,
    },
  )

  return {
    tabs,
    currentActive,
    handleClick,
    handleClose,
  }
}
export { useTabbar }
