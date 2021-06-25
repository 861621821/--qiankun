import axios from 'axios'
import { Message } from 'element-ui'
// import router from '../router'

const baseURL = process.env.VUE_APP_BASE_URL

const Axios = axios.create({
  baseURL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
})

Axios.interceptors.request.use(
  config => {
    if (localStorage.token) {
      config.headers.Authorization = localStorage.token
    }
    return config
  },
  error => {
    Message({
      showClose: true,
      message: error && error.data.error.message,
      type: 'error'
    })
    return Promise.reject(error.data.error.message)
  }
)

// 返回状态判断(添加响应拦截器)
Axios.interceptors.response.use(
  res => {
    if (res.data && res.data.code === 200) {
      return res.data.data
    }
    return res.data
  },
  error => {
    if (error.response.status === 404) {
      // router.push({
      //   path: '/error/404'
      // })
    }
    // 返回 response 里的错误信息
    // const errorInfo = error.data.error ? error.data.error.message : error.data
    return Promise.reject(error)
  }
)

// 对axios的实例重新封装成一个plugin ,方便 Vue.use(xxxx)
export default {
  install (Vue, Option) {
    Object.defineProperty(Vue.prototype, '$http', { value: Axios })
  }
}
