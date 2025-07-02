interface BasicUserInfo {
  avatar: string //头像
  realName: string //用户昵称
  userId: number //用户id
  username: string //用户名
  [key: string]: any
}
type ClassType = Array<object | string> | object | string
export type { BasicUserInfo, ClassType }
