import { type MockMethod, type Recordable } from 'vite-plugin-mock'
import { useResponseSuccess, useResponseError, unAuthorizedResponse } from './utils/response'
import { MOCK_USERS, MOCK_ROLES } from './utils/mock-data'
import { generateAccessToken, verifyAccessToken } from './utils/jwt-utils'
import type { UserInfo } from './utils/mock-data'

/**
 * 拼接用户返回数据
 * @param user
 * @returns
 */
const getUserInfo = (user: UserInfo) => {
  const roles = MOCK_ROLES.filter((item) => user.roles.includes(item.name)) || []
  const mergedMenusPerms = [...new Set(roles.flatMap((role) => role.permission))]
  const mergedButtonPerms = [...new Set(roles.flatMap((role) => role.btnPermission))]
  const menuEntryMap: Recordable = roles.reduce((acc: any, role) => {
    role.entryList?.forEach(({ modelMenuPerms, entryMenuPerms }) => {
      acc[modelMenuPerms] = entryMenuPerms
    })
    return acc
  }, {})
  return {
    ...user,
    permission: mergedMenusPerms,
    btnPermission: mergedButtonPerms,
    menuEntry: menuEntryMap,
  }
}
export default [
  {
    url: '/auth/login',
    method: 'post',
    response: ({ body }: any) => {
      console.log('==== Mock Request Body: =======', body) // 自定义日志
      const { username, password } = body
      const findUser = MOCK_USERS.find(
        (user) => user.username === username && user.password === password,
      )
      if (findUser) {
        const accessToken = generateAccessToken(findUser)
        let user = getUserInfo(findUser)
        return useResponseSuccess({
          user: { ...user },
          accessToken,
        })
      } else {
        return useResponseError('用户名或密码错误')
      }
    },
  },
  {
    url: '/user/info',
    method: 'get',
    response: (request: any) => {
      let userinfo = verifyAccessToken(request.headers)
      if (!userinfo) {
        return unAuthorizedResponse()
      }
      return useResponseSuccess({ ...getUserInfo(userinfo) })
    },
  },
] as MockMethod[]
