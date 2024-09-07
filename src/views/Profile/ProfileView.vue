<template>
  <div class="profile-page">
    <!-- 用户信息显示区域 -->
    <div class="user-info">
      <img :src="userInfo.avatar" alt="用户头像" class="avatar" />
      <h2>{{ userInfo.name }}</h2>
      <p>信誉评分: {{ userInfo.reputation }}</p>
    </div>

    <!-- 四个大按钮区域 -->
    <div class="button-grid">
      <button @click="contactSeller" class="grid-button" style="background-color: lightorange;">
        联系卖家
      </button>
      <button @click="viewProducts" class="grid-button">
        在售商品
      </button>
      <button @click="complainSeller" class="grid-button">
        投诉卖家
      </button>
      <button @click="toggleFollow" class="grid-button">
        {{ followStatus }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getUserInfo } from '@/apis/profile' // 调用封装的API
import { followSeller, unfollowSeller, isFollowing } from '@/apis/follow' // 关注和取消关注API
import { getImageUrl } from '@/utils/utils'

export default defineComponent({
  setup() {
    const route = useRoute()
    const router = useRouter()
    const userInfo = ref({
      avatar: '',
      name: '',
      reputation: 0
    })
    const followStatus = ref('关注')
    const userId = ref('')

    // 获取卖家信息
    const fetchUserInfo = async () => {
      userId.value = route.params.id as string // 从路由参数获取ID
      try {
        const response = await getUserInfo(userId.value)
        userInfo.value = response.data
        userInfo.value.avatar = getImageUrl(userInfo.value.avatar)
        await checkFollowStatus() // 获取卖家信息后检查是否已关注
      } catch (error) {
        console.error('获取用户信息失败', error)
      }
    }

    // 检查是否已关注卖家
    const checkFollowStatus = async () => {
      try {
        const following = await isFollowing(userId.value)
        followStatus.value = following ? '已关注' : '关注'
      } catch (error) {
        console.error('检查关注状态失败', error)
      }
    }

    // 按钮功能占位符
    const contactSeller = () => {
      router.push({
        name: 'chat',
        params: { user_id: userId.value }
      })
    }

    const viewProducts = () => {
      router.push({
        name: 'profilemerchandise',
        params: { id: userId.value }
      })
    }

    const complainSeller = () => {
      router.push({
        name: 'complaintsubmission',
        params: { seller_id: userId.value }
      })
    }

    // 切换关注与取消关注
    const toggleFollow = async () => {
      try {
        if (followStatus.value === '关注') {
          await followSeller(userId.value)
          followStatus.value = '已关注'
        } else {
          await unfollowSeller(userId.value)
          followStatus.value = '关注'
        }
      } catch (error) {
        console.error('切换关注状态失败', error)
      }
    }

    onMounted(fetchUserInfo) // 页面挂载时调用获取用户信息

    return {
      userInfo,
      followStatus,
      contactSeller,
      viewProducts,
      complainSeller,
      toggleFollow
    }
  }
})
</script>

<style scoped>
.profile-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.user-info {
  text-align: center;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.button-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 20px;
}

.grid-button {
  width: 200px;
  height: 100px;
  font-size: 18px;
  cursor: pointer;
  border: 2px solid transparent;
}

.grid-button:hover {
  border-color: #000; /* 鼠标悬停时出现边框 */
}
</style>
