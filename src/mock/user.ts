import { type MockMethod } from 'vite-plugin-mock'
import Mock from 'mockjs'
export default [
  {
    url: '/user/login',
    method: 'post',
    response: ({ body }: any) => {
      console.log('==== Mock Request Body: =======', body) // 自定义日志
      const { username, password } = body
      if (username === 'denny' && password === '123456') {
        return {
          code: 200,
          message: '登录成功',
          result: {
            user: {
              username,
              permission: ['weihuapin:menu', 'whp:jichuguanli', 'whp:jichuxinxi'],
            },
            token: Mock.Random.guid(),
          },
        }
      } else {
        return {
          code: 500,
          message: '用户名或密码错误',
          result: null,
        }
      }
    },
  },
] as MockMethod[]
