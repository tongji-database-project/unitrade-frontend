import { ref } from 'vue'
import { defineStore } from 'pinia'
import { httpInstance } from '@/utils/utils'
import { ElMessage } from 'element-plus'

export const getSellerInfoAPI = async (merchandiseId: string) => {
  return await httpInstance({
    url: `/sellerInfo/${merchandiseId}`,
    method: 'GET',
  })
    .then((response) => {
      if (response.status === 200) {
        return response.data
      } else {
        ElMessage({
          type: 'warning',
          message: `无法获取商家信息：${response.status}`
        })
      }
    })
    .catch((error) => {
      ElMessage({
        type: 'warning',
        message: `无法获取商家信息：${error}`
      })
  })
}


  export const getCommentIdAPI = async (merchandiseId: string) => {
    return await httpInstance({
      url: `/commentId/${merchandiseId}`,
      method: 'GET'
    })
      .then((response) => {
        if (response.status === 200) {
          return response.data
        } else {
          ElMessage({
            type: 'warning',
            message: `无法获取评论id：${response.status}`
          })
        }
      })
      .catch((error) => {
        ElMessage({
          type: 'warning',
          message: `无法获取评论id：${error}`
        })
      })
  }

  export const getCommentCardAPI = async (commentId: string) => {
    return await httpInstance({
      url: `/commentCard/${commentId}`,
      method: 'GET'
    })
      .then((response) => {
        if (response.status === 200) {
          return response.data
        } else {
          ElMessage({
            type: 'warning',
            message: `无法获取评论信息：${response.status}`
          })
        }
      })
      .catch((error) => {
        ElMessage({
          type: 'warning',
          message: `无法获取评论信息：${error}`
        })
      })
  }
