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

    // 获取卖家信息
    const fetchUserInfo = async () => {
      const userId = route.params.id as string // 从路由参数获取ID
      try {
        const response = await getUserInfo(userId)
        userInfo.value = response.data
        userInfo.value.avatar = getImageUrl(userInfo.value.avatar)
      } catch (error) {
        console.error('获取用户信息失败', error)
      }
    }

    // 按钮功能占位符
    const contactSeller = () => {
      console.log('联系卖家功能')
    }

    const viewProducts = () => {
      console.log('查看商品功能')
    }

    const complainSeller = () => {
      console.log('投诉卖家功能')
    }

    const toggleFollow = () => {
      followStatus.value = followStatus.value === '关注' ? '已关注' : '关注'
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
