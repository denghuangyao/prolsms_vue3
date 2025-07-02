//初始化store，引入pinia持久化+安全性（加密存储）
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
