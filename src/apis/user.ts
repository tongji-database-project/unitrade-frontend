import { httpInstance } from '@/utils/utils'
import { useTokenStore } from '@/stores/token'

// 对于用户登录 API 的二次封装

export const loginAPI = async (username: string, password: string) => {
  return await httpInstance({
    url: '/oauth/login',
    method: 'POST',
    // data 的字段名与后端接收数据的实体字段名保持一致（这里与后端中的 LoginRequest 实体字段一致），下同
    data: {
      name: username,
      password: password
    }
  })
}

export const adminLoginAPI = async (username: string, password: string) => {
  return await httpInstance({
    url: '/adminlogin',
    method: 'POST',
    data: {
      name: username,
      password: password
    }
  })
}

export const getUserInfo = async () => {
  return await httpInstance({
    url: '/info',
    method: 'GET'
  })
    .then((response) => {
      if (response.status === 200) {
        return response.data
      } else {
        // 验证失败后置空 token
        useTokenStore().updatetoken('')
        ElMessage({
          type: 'warning',
          message: `无法获取用户信息，状态码：${response.status}`
        })
      }
    })
    .catch((error) => {
      // 验证失败后置空 token
      useTokenStore().updatetoken('')
      ElMessage({
        type: 'warning',
        message: `无法获取用户信息，错误信息：${error}`
      })
    })
}
