import { httpInstance } from '@/utils/utils'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import type { Message } from '@/utils/interfaces'

const router = useRouter()

export const getContactingUser = async () => {
  return await httpInstance({
    url: '/message/get_contacting_user',
    method: 'GET'
  })
    .then((response) => {
      if (response.status === 200) {
        return response.data
      } else {
        ElMessage({
          type: 'error',
          message: `获取用户列表失败：${response.status}`
        })
        router.push('/')
      }
    })
    .catch((error) => {
      ElMessage({
        type: 'error',
        message: `网页出现错误，错误信息：${error}`
      })
      router.push('/')
    })
}

export const getLatestMessage = async (user_id: string) => {
  return await httpInstance({
    url: '/message/get_latest_message',
    method: 'GET',
    params: {
      user_id: user_id
    }
  })
    .then((response) => {
      if (response.status === 200) {
        return response.data
      } else {
        ElMessage({
          type: 'error',
          message: `获取最新消息失败：${response.status}`
        })
        router.push('/')
      }
    })
    .catch((error) => {
      ElMessage({
        type: 'error',
        message: `网页出现错误，错误信息：${error}`
      })
      router.push('/')
    })
}

export const getMessages = async (user_id: string) => {
  return await httpInstance({
    url: '/message/get_messages',
    method: 'GET',
    params: {
      user_id: user_id
    }
  })
    .then((response) => {
      if (response.status === 200) {
        return response.data
      } else {
        ElMessage({
          type: 'error',
          message: `获取聊天信息失败：${response.status}`
        })
        router.push('/')
      }
    })
    .catch((error) => {
      ElMessage({
        type: 'error',
        message: `网页出现错误，错误信息：${error}`
      })
      router.push('/')
    })
}

export const sendMessage = async (message: Message) => {
  return await httpInstance({
    url: '/message/send_message',
    method: 'POST',
    data: message
  })
    .then((response) => {
      if (response.status === 200) {
        return true
      } else {
        ElMessage({
          type: 'error',
          message: `消息发送失败：${response.status}`
        })
        return false
      }
    })
    .catch((error) => {
      ElMessage({
        type: 'error',
        message: `网页出现错误，错误信息：${error}`
      })
      return false
    })
}
