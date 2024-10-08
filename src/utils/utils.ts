import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useTokenStore } from '@/stores/token'
import 'element-plus/dist/index.css' //添加el组件的动画效果

const getImageUrl = (path: string) => {
  // 开头有根目录 / 则去掉这个 /
  // TODO: 做合法性检查
  if (path === null || path === '') return 'http://47.97.215.255/img/default-user.jpg'
  if (path[0] && path[0] === '/') path = path.slice(1)
  return `http://47.97.215.255/img/${path}`
}

const isBlank = (str: string) => {
  return !str || /^\s*$/.test(str)
}

const httpInstance = axios.create({
  baseURL: '/api',
  timeout: 5000
})

httpInstance.interceptors.request.use(
  (config) => {
    const tokenStore = useTokenStore()
    const token = tokenStore.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (e) => Promise.reject(e)
)

httpInstance.interceptors.response.use(
  (response) => response,
  // 以下写法在不需要考虑返回的状态码情况下使用
  // response => response.data,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized access')
    }
    return Promise.reject(error)
  }
)

export { getImageUrl, isBlank, httpInstance }
export default httpInstance
