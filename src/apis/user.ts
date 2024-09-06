import { ElMessage, ElMessageBox } from 'element-plus'
import { httpInstance } from '@/utils/utils'
import { useTokenStore } from '@/stores/token'
import 'element-plus/dist/index.css' //添加el组件的动画效果

// 对于用户登录 API 的二次封装

export const loginAPI = async (isPasswordLogin: boolean, username: string, password: string) => {
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

export const userEnrollAPI = async (
  username: string,
  password: string,
  phone: string,
  email: string,
  verificationCode: string
) => {
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

export const resetPasswordAPI = async (
  username: string,
  password: string,
  phone: string,
  email: string,
  verificationCode: string
) => {
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

export const roleJudgeAPI = async () => {
  return await httpInstance({
    url: '/rolejudge',
    method: 'GET'
  })
    .then((response) => {
      if (response.status === 200) {
        return response.data
      } else {
        return ''
      }
    })
    .catch((error) => {
      ElMessage({
        type: 'warning',
        message: `身份验证失败，错误信息：${error}`
      })
      return ''
    })
}

export const getOtherUserInfo = async (user_id: string) => {
  return await httpInstance({
    url: `/info/others/${user_id}`,
    method: 'GET'
  })
    .then((response) => {
      if (response.status === 200) {
        return response.data
      } else {
        if (response.status === 401) {
          // 验证失败后置空 token
          useTokenStore().updatetoken('')
        }
        ElMessage({
          type: 'warning',
          message: `无法获取用户信息，状态码：${response.status}`
        })
      }
    })
    .catch((error) => {
      ElMessage({
        type: 'warning',
        message: `身份验证失败，错误信息：${error}`
      })
      return ''
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
export const getMyOrder = async () => {
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
export const EditMyinfo = async (username: string, usersex: string, useraddress: string) => {
  return await httpInstance({
    url: '/editMyinfo',
    method: 'POST',
    data: {
      new_name: username,
      new_sex: usersex,
      new_address: useraddress
    }
  })
    .then((response) => {
      if (response.status === 200) {
        ElMessageBox({
          message: `信息修改成功,即将跳转个人中心`,
          type: 'success'
        })
        return response.status
      }
    })
    .catch((error) => {
      if (error.response.status === 400) {
        if (error.response.data == '无输入') {
          ElMessage({
            type: 'error',
            message: '请输入信息'
          })
        } else if (error.response.data == '与原名字相同') {
          ElMessage({
            type: 'error',
            message: `修改与原名字相同，换个名字再试一下吧`
          })
        } else if (error.response.data == '已存在该名称') {
          ElMessage({
            type: 'error',
            message: `当前名称已存在，请输入一个新的名称`
          })
        }
      } else {
        ElMessage({
          type: 'warning',
          message: `修改失败：${error}`
        })
      }
    })
}
export const EditPassword = async (
  OrientPassword: string,
  NewPassword: string,
  ConfirmPassword: string
) => {
  return await httpInstance({
    url: '/editPassword',
    method: 'POST',
    data: {
      ORIGIN_PASSWORD: OrientPassword,
      NEW_PASSWORD: NewPassword,
      CONFIRM_PASSWORD: ConfirmPassword
    }
  })
    .then((response) => {
      if (response.status === 200) {
        ElMessageBox({
          message: `密码修改成功,即将跳转个人中心`,
          type: 'success'
        })
        return response.status
      }
    })
    .catch((error) => {
      if (error.response.status === 400) {
        if (error.response.data == '原密码输入错误') {
          ElMessage({
            type: 'error',
            message: `原密码错误，请重新输入`
          })
        } else if (error.response.data == '两次密码不一致') {
          ElMessage({
            type: 'error',
            message: `两次输入密码不一致，请重新输入`
          })
        }
      } else {
        ElMessage({
          type: 'error',
          message: `修改失败：${error}`
        })
      }
    })
}

export const mycomplation=async()=>{
  return await httpInstance({
    url: '/mycomplation',
    method: 'GET'
  })
}

export const myrefund=async()=>{
  return await httpInstance({
    url: '/myrefund',
    method: 'GET'
  })
}

export const myappeal=async()=>{
  return await httpInstance({
    url: '/myappeal',
    method: 'GET'
  })
}

export const getcomplation=async()=>{
  return await httpInstance({
    url: '/getcomplation',
    method: 'GET'
  })
}
export const cancelUser=async(password:string)=>{
  return await httpInstance({
    url:'/oauth/cancel',
    method:'POST',
    data:{
      password:password
    }
  })
  .then((response) => {
    if (response.status === 200) {
      ElMessageBox({
        message: `账号注销成功`,
        type: 'success'
      })
      return response.status
    }
  })
  .catch((error) => {
    if (error.response.status === 400) {
      if (error.response.data == '密码错误，注销失败') {
        ElMessage({
          type: 'error',
          message: `原密码错误，请重新输入`
        })
      }
    } else {
      ElMessage({
        type: 'error',
        message: `注销失败：${error}`
      })
    }
  })
}
export const getMyfollow=async()=>{
  return await httpInstance({
    url:'/getMyfollow',
    method:'GET',
  })
  // .then((response) => {
  //   if (response.status === 200) {
  //     return response.data
  //   }
  // })
  // .catch((error) => {
  //   console.log(error)
  //   console.log("asdads")
  //   ElMessage({
  //     type: 'error',
  //     message: `数据获取失败`
  //   })
  // })
}
export const denyfollow=async(seller_id:string)=>{
  return await httpInstance({
    url:'/denyfollow',
    method:'POST',
    data:{
      seller_id:seller_id
    }
  }).then((response) => {
    if (response.status === 200) {
      ElMessageBox({
        message: `取消关注成功`,
        type: 'success'
      })
      return response.status
    }
  })
  .catch((error) => {
    ElMessage({
      message:'操作失败',
      type:'error'
    })
  
  })
}