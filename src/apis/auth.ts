import http from '@/utils/http'
import type { UserInfo } from '@/types'
export namespace AuthApi {
  export interface LoginParams {
    username?: string
    password?: string
    authCode?: ''
  }
  /**登录接口返回值 */
  export interface LoginResult {
    accessToken: string
    user: null | UserInfo
  }
}
export const loginApi = (params: AuthApi.LoginParams) => {
  return http.post<AuthApi.LoginResult>('/auth/login', params)
}
export const getAccessCodesApi = () => {
  return http.get<string[]>('/auth/code')
}

export const logoutApi = () => {
  return http.post('/auth/logout')
}
