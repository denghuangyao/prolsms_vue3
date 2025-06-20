import { defineStore } from 'pinia'
import { useUserStore, useAccessStore } from '@/stores'
import { getUserInfo, loginApi, getAccessCodesApi } from '@/apis'
import type { Recordable, UserInfo } from '@/types'
import { ref } from 'vue'
import router from '@/router'
import { preferences } from '@/preferences'
export const useAuthStore = defineStore('auth', () => {
  const userStore = useUserStore()
  const accessStore = useAccessStore()
  const isLoading = ref(false)
  async function authLogin(param: Recordable<any>, onSuccess?: () => Promise<void> | void) {
    let userInfo: null | UserInfo = null
    try {
      /**
       * 看个人实现：可以
       * 登录成功后返回所有信息，包括用户信息、token信息、权限相关信息
       * 权限相关信息:权限表codes + 角色相关权限
       * 角色相关权限：用户角色、角色菜单模块入口配置、用户登录默认首页路径
       */
      isLoading.value = true
      let { accessToken, user } = await loginApi(param)
      // 如果成功获取到 accessToken
      if (accessToken) {
        accessStore.setAccessToken(accessToken)
        //获取token后，携带token请求
        userInfo = user
        // 获取用户信息并存储到 accessStore 中
        userStore.setUserInfo(userInfo)
        accessStore.setAccessCode(user?.btnPermission)
        if (accessStore.loginExpired) {
          accessStore.setLoginExpired(false)
        }
        onSuccess
          ? await onSuccess?.()
          : await router.push(userInfo?.homePath || preferences.app.defaultHomePath)
      }
    } finally {
      isLoading.value = false
    }
  }
  /**
   * 获取登录用户信息
   * @returns
   */
  async function fetchUserInfo() {
    let userInfo = await getUserInfo()
    console.log(userInfo)
    userStore.setUserInfo(userInfo)
    return userInfo
  }
  return { authLogin, fetchUserInfo }
})
