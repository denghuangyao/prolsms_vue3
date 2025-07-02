//初始化store，引入pinia持久化+安全性（加密存储）
import { cloneDeep } from '@/utils'
import { createPinia, type Pinia } from 'pinia'
import SecureLS from 'secure-ls'
interface InitStoreOptions {
  namespace?: string
}
let pinia: Pinia
export async function initStores(option?: InitStoreOptions) {
  const { createPersistedState } = await import('pinia-plugin-persistedstate')
  pinia = createPinia()
  console.log('import.meta.env.VITE_APP_NAMESPACE', import.meta.env.VITE_APP_NAMESPACE)
  const { namespace } = option || { namespace: import.meta.env.VITE_APP_NAMESPACE }
  const ls = new SecureLS({
    encodingType: 'aes',
    isCompression: true,
    encryptionSecret: import.meta.env.VITE_APP_STORE_SECURE_KEY,
    // @ts-ignore secure-ls does not have a type definition for this
    metaKey: `${namespace}-secure-meta`,
  })
  pinia.use(
    createPersistedState({
      key: (storeKey) => {
        console.log('storeKey--', storeKey)
        return `${namespace}-${storeKey}`
      },
      storage: import.meta.env.DEV
        ? localStorage
        : {
            getItem(key) {
              return ls.get(key)
            },
            setItem(key, value) {
              ls.set(key, value)
            },
          },
    }),
  )
  pinia.use(({ store }) => {
    // store.$state 是一个对象(即引用数据类型)没有效果, 需要进行深拷贝，JSON.stringify/parse会丢失函数，不可用
    // 获取初始状态, 用于重置store(深拷贝后initialState与最初的store.$state值没有任何关系了)
    const initialState = cloneDeep(store.$state)
    // 给store添加$reset()方法
    store.$reset = () => {
      // 第一次之后的重置也存在引用型数据, 需要进行深拷贝
      // console.log('--$reset-store--pinia.use-')
      store.$state = cloneDeep(initialState)
    }
  })
  return pinia
}
export function resetAllStores() {
  if (!pinia) {
    console.error('Pinia is not installed')
    return
  }
  console.log('resetAllStores-pinia', pinia)
  const allStores = (pinia as any)._s
  for (let [_key, store] of allStores) {
    console.log('-store-', store)
    store.$reset()
  }
}
