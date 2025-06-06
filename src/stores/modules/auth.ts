import { defineStore } from 'pinia'
import { useUserStore } from './user'
import { getUserInfo } from '../../apis'
export const useAuthStore = defineStore('auth', () => {
  const userStore = useUserStore()
  async function fetchUserInfo() {
    let userInfo = await getUserInfo()
    console.log(userInfo)
    userStore.setUserInfo(userInfo)
    return userInfo
  }
  return { fetchUserInfo }
})
