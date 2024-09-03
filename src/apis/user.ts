import { ElMessage } from 'element-plus'
import { httpInstance } from '@/utils/utils'

// 对于用户登录 API 的二次封装

export const loginAPI = async (isPasswordLogin:boolean, username: string, password: string) => {
  return await httpInstance({
    url: '/oauth/login',
    method: 'POST',
    // data 的字段名与后端接收数据的实体字段名保持一致（这里与后端中的 LoginRequest 实体字段一致），下同
    data: {
      UseVerificationCode: !isPasswordLogin,
      name: username,
      password: password
    }
  })
}

export const userEnrollAPI = async (username: string, password:string, phone:string, email:string, verificationCode:string) => {
  return httpInstance({
    url: '/oauth/register',
    method: 'POST',
    data: {
      name: username,
      password: password,
      //registerType: registerType,
      PhoneNumber: phone,
      Email: email,
      VerificationCode: verificationCode
    }
  })
}

export const resetPasswordAPI = async (username: string, password:string, phone:string, email:string, verificationCode:string) => {
  return await httpInstance({
    url: '/ResetPwd',
    method: 'PATCH',
    data: {
      name: username,
      newPassword: password,
      PhoneNumber: phone,
      Email: email,
      VerificationCode: verificationCode
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
      ElMessage({
        message: `信息修改成功,即将跳转个人中心`
      })
      return response.status
    }
  })
  .catch((error) => {
    if(error.response.status===400){
      if(error.response.data=="无输入")
        {
          ElMessage({
            message: `请输入你要修改的信息`
          })
        }else if(error.response.data=="与原名字相同"){
          ElMessage({
            message: `修改与原名字相同，换个名字再试一下吧`
          })
        }else if(error.response.data=="已存在该名称"){
          ElMessage({
            message: `当前名称已存在，请输入一个新的名称`
          })
        }
    }
    else{
      ElMessage({
        type: 'warning',
        message: `修改失败：${error}`
      })
    }
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
  .then((response) => {
    if (response.status === 200) {
      ElMessage({
        message: `密码修改成功,即将跳转个人中心`
      })
      return response.status
    } 
  })
  .catch((error) => {
    if(error.response.status===400){
      if(error.response.data=="原密码输入错误")
        {
          ElMessage({
            message: `原密码错误，请重新输入`
          })
        }else if(error.response.data=="两次密码不一致"){
          ElMessage({
            message: `两次输入密码不一致，请重新输入`
          })
        }
    }
    else{
      ElMessage({
        type: 'warning',
        message: `修改失败：${error}`
      })
    }
  })
}