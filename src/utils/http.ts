import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios'
import qs from 'qs'
import router from '@/router'
import { useAccessStore } from '@/stores'
/**
 * axios传递参数方式：data，params
 * params：url格式传参，拼接在url上：url?name=value&name1=value1
 */
type ApiResponse<T = any> = {
  result: T
  code: string | number
  message: string
}
const app = axios.create({
  timeout: 30000,
  baseURL: 'http://localhost:3000', //mock环境改成“/”
  headers: {
    get: {
      //设置请求头，防止 GET 请求缓存
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/x-www-from-urlencoded;chartset=utf-8',
    },
    post: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  },
})
app.interceptors.request.use(
  (config) => {
    //请求带token
    const token = useAccessStore().accessToken
    if (token) {
      config.headers['authorization'] = `Bearer ${token}`
    }
    // 获取请求方法，并转换为大写
    const method = config.method?.toUpperCase()
    if (method == 'POST') {
      const contentType = config.headers['Content-Type'] || config.headers['content-type']
      if (contentType == 'application/x-www-from-urlencoded') {
        // 如果请求数据存在且不是字符串类型
        if (config.data && typeof config.data !== 'string') {
          // 将请求数据序列化为 URL 编码格式的字符串
          config.data = qs.stringify(config.data)
        }
      }
    }
    return config
  },
  (error) => {
    console.log('request拦截-error-', error)
    return Promise.reject(error)
  },
)
app.interceptors.response.use(
  (response) => {
    console.log('response-拦截-', response)
    let code = response.data?.code
    if (code !== 0) {
      return Promise.reject(response)
    }
    return response
  },
  (error) => {
    console.log('response拦截-error-', error)
    if (error.status === 401) {
      router.replace('/login')
    }
    return Promise.reject(error)
  },
)

const request = <T>(config: AxiosRequestConfig) => {
  return new Promise<ApiResponse<T>>((resolve, reject) => {
    app
      .request<ApiResponse<T>>(config)
      .then((response: AxiosResponse<ApiResponse<T>>) => {
        console.log('response-request-', response)
        if (response) {
          resolve(response.data)
        } else {
          reject(response)
        }
      })
      .catch((error) => {
        console.log('error-request-', error)
        ElMessage.error(error.data.message)
        reject(error)
      })
  })
}
export default {
  //get请求
  get: async <T = any>(url: string, params = {}): Promise<T> => {
    let res = await request<T>({ url, method: 'GET', params })
    console.log('-res-get', res)
    return res.result
  },
  //post请求，发送json格式
  postJson: async <T = any>(url: string, data = {}): Promise<T> => {
    let res = await request<T>({
      url,
      method: 'POST',
      data,
      headers: {
        'Content-Type': 'application/json;chartset=utf-8',
      },
    })
    console.log('-res-postJson', res)
    return res.result
  },
  //post请求：发送
  post: async <T = any>(url: string, data = {}): Promise<T> => {
    let res = await request<T>({
      url,
      method: 'POST',
      data,
      headers: {
        'Content-Type': 'application/x-www-from-urlencoded',
      },
    })
    console.log('-res-post', res)
    return res.result
  },
  // 下载文件的请求方法
  download: async <T = any>(url: string, params: any): Promise<T> => {
    // 发起 GET 请求，设置 responseType 为 blob，用于处理文件下载
    const res = await request<T>({ method: 'GET', responseType: 'blob', params })
    return res.result
  },
  upload: async <T = any>(url: string, data = {}): Promise<T> => {
    const res = await request<T>({
      url,
      method: 'POST',
      data,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return res.result
  },
}
