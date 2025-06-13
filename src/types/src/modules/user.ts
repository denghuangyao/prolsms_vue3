import type { BasicUserInfo, Recordable } from '../'

interface UserInfo extends BasicUserInfo {
  //登录首页路径
  homePath: string
  permission?: string[]
  btnPermission?: string[]
  menuEntry?: Recordable

  /**
   * accessToken
   */
  //   token: string
}

export type { UserInfo }
