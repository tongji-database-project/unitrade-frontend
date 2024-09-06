<template>
  <div class="profile-view">
    <div class="header">
      <h1>个人主页</h1>
    </div>
    <UserInfo :user="user" :avatar="user.avatar" />
    <div class="button-container">
      <button class="action-button" style="background-color: #ffcccb" @click="goToItemsForSale">
        在售商品
      </button>
      <button class="action-button" style="background-color: #add8e6" @click="goToChat">
        联系卖家
      </button>
      <button class="action-button" style="background-color: #ffd9b3" @click="goToComplaint">
        投诉卖家
      </button>
      <button class="action-button" :style="followButtonStyle" @click="toggleFollow" :disabled="isProcessing">
        {{ followButtonText }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import UserInfo from './components/UserInfo.vue'
import { defineComponent, ref, onMounted } from 'vue'
import { followSeller, unfollowSeller, isFollowing } from '@/apis/follow'
import { ElMessage } from 'element-plus'
import { getProfile } from '@/apis/profile' // 导入新的 API 调用

export default defineComponent({
  name: 'ProfileView',
  components: {
    UserInfo
  },
  data() {
    return {
      userId: this.$route.params.id as string, // 确保 id 是 string 类型
      user: {
        avatar: '',
        name: '',
        reputation: 0
      },
      isFollowing: false,
      isProcessing: false
    }
  },
  computed: {
    followButtonText() {
      return this.isFollowing ? '已关注' : '关注'
    },
    followButtonStyle() {
      return {
        backgroundColor: this.isFollowing ? '#e6e6fa' : '#ffcccb'
      }
    }
  },
  methods: {
    async fetchUserProfile() {
      try {
        const response = await getProfile(this.userId)
        this.user = response.data
      } catch (error) {
        console.error('获取用户信息时出错:', error)
        ElMessage.error('无法加载用户信息')
      }
    },
    goToItemsForSale() {
      alert('跳转到在售商品页面')
    },
    goToChat() {
      this.$router.push({ name: 'chat', params: { user_id: this.userId } })
    },
    goToComplaint() {
      this.$router.push({ name: 'complaintsubmission', params: { seller_id: this.userId } })
    },
    async toggleFollow() {
      if (this.isProcessing) return;
      this.isProcessing = true;

      try {
        if (this.isFollowing) {
          await unfollowSeller(this.userId)
          this.isFollowing = false
          ElMessage.success('已取消关注')
        } else {
          await followSeller(this.userId)
          this.isFollowing = true
          ElMessage.success('已关注')
        }
      } catch (error) {
        console.error('关注操作时出错:', error)
        ElMessage.error('操作失败，请稍后重试')
      } finally {
        this.isProcessing = false;
      }
    },
    async checkFollowStatus() {
      try {
        this.isFollowing = await isFollowing(this.userId);
      } catch (error) {
        console.error('检查关注状态时出错:', error)
      }
    }
  },
  mounted() {
    this.fetchUserProfile() // 页面加载时获取用户信息
    this.checkFollowStatus() // 页面加载时检查关注状态
  }
})
</script>

<style scoped>
.profile-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.button-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 20px;
  width: 100%;
  height: 400px; /* 调整高度以填满页面 */
  margin-top: 20px;
}

.action-button {
  border: none;
  color: white;
  padding: 20px;
  font-size: 20px; /* 放大字体 */
  cursor: pointer;
  width: 100%;
  height: 100%;
  text-align: center;
  box-sizing: border-box;
  transition: border-color 0.3s;
}

.action-button:hover {
  border: 2px solid grey; /* 鼠标悬停时边框颜色 */
}

.action-button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}
</style>
