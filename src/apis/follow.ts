import { httpInstance } from '@/utils/utils'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()

// 关注卖家
export const followSeller = async (sellerId: string): Promise<void> => {
  return httpInstance({
    url: '/FollowController/follow',
    method: 'POST',
    data: {
      sellerId: sellerId
    }
  })
    .then((response) => {
      if (response.status === 200) {
        ElMessage.success(response.data || '关注成功')
      } else {
        ElMessage.error(`关注失败，状态码：${response.status}`)
      }
    })
    .catch((error) => {
      ElMessage.error(`关注失败，错误信息：${error}`)
    })
}

// 取消关注卖家
export const unfollowSeller = async (sellerId: string): Promise<void> => {
  return httpInstance({
    url: '/FollowController/unfollow',
    method: 'POST',
    data: {
      sellerId: sellerId
    }
  })
    .then((response) => {
      if (response.status === 200) {
        ElMessage.success(response.data || '取消关注成功')
      } else {
        ElMessage.error(`取消关注失败，状态码：${response.status}`)
      }
    })
    .catch((error) => {
      ElMessage.error(`取消关注失败，错误信息：${error}`)
    })
}

// 检查是否已关注卖家
export const isFollowing = async (sellerId: string): Promise<boolean> => {
  return httpInstance({
    url: `/FollowController/isFollowing/${sellerId}`,
    method: 'GET'
  })
    .then((response) => {
      if (response.status === 200) {
        return response.data.isFollowing
      } else {
        ElMessage.error(`检查失败，状态码：${response.status}`)
        return false
      }
    })
    .catch((error) => {
      ElMessage.error(`检查失败，错误信息：${error}`)
      return false
    })
}
