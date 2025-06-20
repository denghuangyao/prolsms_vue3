import { useTabbarStore } from '@/stores'
import { useRouter } from 'vue-router'

function useTabs() {
  const router = useRouter()
  const tabbarStore = useTabbarStore()
  const closeTabByKey = (key: string) => {
    tabbarStore.closeTabByKey(key, router)
  }
  return { closeTabByKey }
}
export { useTabs }
