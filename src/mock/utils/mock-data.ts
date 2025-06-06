import Mock from 'mockjs'
export interface UserInfo {
  id: number
  username: string
  password: string
  realName: string
  permission: string[]
  homePath?: string
  token?: string
}
export const MOCK_USERS: UserInfo[] = [
  {
    id: 1,
    username: 'denny',
    realName: 'denny',
    password: '123456',
    permission: ['weihuapin:menu', 'whp:jichuguanli', 'whp:jichuxinxi'],
    token: Mock.Random.guid(),
    // homePath: '/home',
  },
]
