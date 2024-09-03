<template>
  <div class="profile-view">
    <div class="header">
      <h1>个人主页</h1>
    </div>
    <UserInfo :user="user" :avatar="avatar" />
    <div class="button-container">
      <button class="action-button" style="background-color: #ffcccb;" @click="goToItemsForSale">在售商品</button>
      <button class="action-button" style="background-color: #add8e6;" @click="goToChat">联系卖家</button>
      <button class="action-button" style="background-color: #ffd9b3;" @click="goToComplaint">投诉卖家</button>
      <button class="action-button" style="background-color: #e6e6fa;" @click="goToOther">其他</button>
    </div>
  </div>
</template>

<script lang="ts">
import UserInfo from './components/UserInfo.vue';
import avatarImage from './images/gclt.jpg'; // 更新路径到 images 目录

export default {
  name: 'ProfileView',
  components: {
    UserInfo,
  },
  data() {
    return {
      userId: '12345',
      user: {
        name: '张颖',
        reputation: 10
      },
      avatar: avatarImage,
    };
  },
  methods: {
    goToItemsForSale() {
      alert('跳转到在售商品页面');
    },
    goToChat() {
      alert('跳转到联系卖家页面');
    },
    goToComplaint() {
      this.$router.push({ name: 'complaintsubmission', params: { seller_id: this.userId } });
    },
    goToOther() {
      alert('跳转到其他页面');
    }
  }
};
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
</style>
