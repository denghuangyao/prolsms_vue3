import http from '@/utils/http'
export const login = (username: string, password: string) => {
  return http.post('/user/login', { username, password })
}
