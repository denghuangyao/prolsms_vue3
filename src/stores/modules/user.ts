import { defineStore, acceptHMRUpdate } from 'pinia'
import { type BasicUserInfo } from '@/types'
interface AccessState {
  userInfo: BasicUserInfo | null
  userPermissions: string[]
}
export const useUserStore = defineStore('user', {
  actions: {
    setUserInfo(userInfo: BasicUserInfo | null) {
      this.userInfo = userInfo
      const permisions = userInfo?.permission ?? []
      this.setPermissions(permisions)
    },
    setPermissions(permisions: string[]) {
      this.userPermissions = permisions
    },
  },
  state: (): AccessState => ({
    userInfo: null,
    userPermissions: [],
  }),
  persist: true,
})
const hot = import.meta.hot
if (hot) {
  hot.accept(acceptHMRUpdate(useUserStore, hot))
}
