import http from '@/utils/http'
export const login = <T = any>(username: string, password: string): Promise<T> => {
  return http.post<T>('/user/login', { username, password })
}
export const getUserInfo = () => {
  return http.get('/user/info')
}
