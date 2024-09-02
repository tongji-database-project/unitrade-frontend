import { ElMessage } from 'element-plus'
import { httpInstance } from '@/utils/utils'

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

export const adminJudgeAPI = async () => {
  return await httpInstance({
    url: '/adminjudge',
    method: 'GET'
  })
    .then((response) => {
      if (response.status === 200) {
        return response.data
      } else {
        ElMessage({
          type: 'warning',
          message: `管理员验证失败，状态码：${response.status}`
        })
        return false;
      }
    })
    .catch((error) => {
      ElMessage({
        type: 'warning',
        message: `管理员验证失败，错误信息：${error}`
      })
      return false;
    })
}

export const AdminEnroll = async (adminname: string,password:string,adminlevel:string) => {
  return await httpInstance({
    url: '/adminenroll',
    method: 'POST',
    data: {
      name: adminname,
      password: password,
      level:adminlevel,
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
      } else {
        ElMessage({
          type: 'warning',
          message: `无法获取管理员信息，状态码：${response.status}`
        })
      }
    })
    .catch((error) => {
      ElMessage({
        type: 'warning',
        message: `无法获取管理员信息，错误信息：${error}`
      })
    })
}

export const getUserInfo = async () => {
  return await httpInstance({
    url: '/getMyinfo',
    method: 'GET'
  })
    .then((response) => {
      if (response.status === 200) {
        return response.data
      } else {
        ElMessage({
          type: 'warning',
          message: `无法获取用户信息，状态码：${response.status}`
        })
      }
    })
    .catch((error) => {
      ElMessage({
        type: 'warning',
        message: `无法获取用户信息，错误信息：${error}`
      })
    })
}
export const getMyOrder=async()=>{
  return await httpInstance({
    url: '/getMyOrder',
    method: 'GET'
  })
  .then((response) => {
    if (response.status === 200) {
      return response.data
    } else {
      ElMessage({
        type: 'warning',
        message: `无法获取用户信息，状态码：${response.status}`
      })
    }
  })
  .catch((error) => {
    ElMessage({
      type: 'warning',
      message: `无法获取用户信息，错误信息：${error}`
    })
  })
}
export const EditMyinfo = async (username: string,usersex:string,useraddress:string) => {
  return await httpInstance({
    url: '/editMyinfo',
    method: 'POST',
    data: {
      new_name: username,
      new_sex: usersex,
      new_address:useraddress,
    }
  })
  .then((response) => {
    if (response.status === 200) {
      return response.data
    } else {
      ElMessage({
        type: 'warning',
        message: `无法获取用户信息，状态码：${response.status}`
      })
    }
  })
  .catch((error) => {
    ElMessage({
      type: 'warning',
      message: `无法获取用户信息，错误信息：${error}`
    })
  })
}
export const EditPassword = async (OrientPassword:string,NewPassword:string,ConfirmPassword:string) => {
  return await httpInstance({
    url: '/editPassword',
    method: 'POST',
    data: {
      ORIGIN_PASSWORD:OrientPassword,
      NEW_PASSWORD: NewPassword,
      CONFIRM_PASSWORD: ConfirmPassword,
    }
  })
}
