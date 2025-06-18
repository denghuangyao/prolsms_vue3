import { ref } from 'vue'
import { useRouter } from 'vue-router'
interface SpinnerOptions {
  minLoadingTime?: number
}
function useContentSpinner(options?: SpinnerOptions) {
  const spinning = ref<boolean>(false)
  const router = useRouter()
  //路由最小加载时间=》过快可能不显示
  const minLoadingTime = options?.minLoadingTime ?? 500
  const startTime = ref(0)
  //结束加载动画
  const onEnd = () => {
    let proccess = performance.now() - startTime.value
    console.log('proccess--', proccess, minLoadingTime - proccess, spinning.value)
    if (proccess < minLoadingTime) {
      setTimeout(() => {
        spinning.value = false
      }, minLoadingTime - proccess)
    } else {
      spinning.value = false
    }
  }
  router.beforeEach((to) => {
    console.log('-beforeEach-useContentSpinner', to.path, to.meta.loaded)
    if (to.meta.loaded) {
      return true
    }
    spinning.value = true
    startTime.value = performance.now()
    return true
  })
  router.afterEach((to) => {
    console.log('-afterEach-useContentSpinner', to.path, to.meta.loaded, spinning.value)
    if (to.meta.loaded) {
      return true
    }
    onEnd()
    return true
  })
  return { spinning }
}
export { useContentSpinner }
