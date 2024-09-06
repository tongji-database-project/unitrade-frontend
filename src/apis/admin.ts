import { ElMessage, ElMessageBox } from 'element-plus'
import { httpInstance } from '@/utils/utils'
import { useTokenStore } from '@/stores/token'
import 'element-plus/dist/index.css' //添加el组件的动画效果

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

export const AdminEnroll = async (adminname: string, password: string, adminlevel: string) => {
  return await httpInstance({
    url: '/adminenroll',
    method: 'POST',
    data: {
      name: adminname,
      password: password,
      level: adminlevel
    }
  })
}

export const getAdminInfo = async () => {
  return await httpInstance({
    url: '/admininfo',
    method: 'GET'
  })
    .then((response) => {
      if (response.status === 200) {
        return response.data
      }
    })
    .catch((error) => {
      ElMessage({
        type: 'warning',
        message: `无法获取管理员信息，错误信息：${error}`
      })
    })
}