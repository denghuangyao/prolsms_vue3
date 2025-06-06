import { type MockMethod } from 'vite-plugin-mock'
import { useResponseSuccess, useResponseError } from './utils/response'
import { MOCK_USERS } from './utils/mock-data'
export default [
  {
    url: '/user/login',
    method: 'post',
    response: ({ body }: any) => {
      console.log('==== Mock Request Body: =======', body) // 自定义日志
      const { username, password } = body
      const findUser = MOCK_USERS.find(
        (user) => user.username === username && user.password === password,
      )
      if (findUser) {
        return useResponseSuccess({
          user: {
            ...findUser,
          },
          token: findUser.token,
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
      let token = request.headers.authorization
      token = token?.replace(/Bearer /, '')
      console.log('==== Mock Request Body: =======', token)
      const findUser = MOCK_USERS.find((user) => user.token === token)
      if (findUser) {
        return useResponseSuccess({ ...findUser })
      } else {
        return useResponseError('获取用户信息失败')
      }
    },
  },
] as MockMethod[]
