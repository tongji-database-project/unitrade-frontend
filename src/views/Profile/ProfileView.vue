<template>
  <div class="profile-view">
    <div class="header">
      <h1>个人主页</h1>
    </div>
    <UserInfo :user="user" :avatar="avatar" />
    <div class="items-container">
      <ItemsForSale :items="products" />
    </div>
    <div class="actions">
      <ActionButton :userId="userId" buttonText="联系卖家" action="chat" />
      <ActionButton :userId="userId" buttonText="投诉卖家" action="complaint" />
    </div>
  </div>
</template>

<script lang="ts">
import UserInfo from './components/UserInfo.vue'
import ItemsForSale from './components/ItemsForSale.vue'
import ActionButton from './components/ActionButton.vue'
import { getImageUrl } from '@/utils/utils'

export default {
  name: 'ProfileView',
  components: {
    UserInfo,
    ItemsForSale,
    ActionButton
  },
  data() {
    return {
      userId: '12345',
      user: {
        name: '张颖',
        reputation: 10
      },
      avatar: getImageUrl('/gclt.jpg'),
      products: [
        { id: 1, name: '商品1', price: '¥100', image: getImageUrl('/cola.jpg') },
        { id: 2, name: '商品2', price: '¥200', image: getImageUrl('/cola.jpg') },
        { id: 3, name: '商品3', price: '¥300', image: getImageUrl('/cola.jpg') },
        { id: 4, name: '商品4', price: '¥400', image: getImageUrl('/cola.jpg') },
        { id: 5, name: '商品5', price: '¥500', image: getImageUrl('/cola.jpg') },
        { id: 6, name: '商品6', price: '¥600', image: getImageUrl('/cola.jpg') },
        { id: 7, name: '商品7', price: '¥700', image: getImageUrl('/cola.jpg') },
        { id: 8, name: '商品8', price: '¥800', image: getImageUrl('/cola.jpg') }
      ]
    }
  }
}
</script>

<style scoped>
.profile-view {
  background-color: white;
  padding: 20px;
}

.header {
  background-color: lightblue;
  padding: 10px;
  margin-bottom: 20px;
}

.header h1 {
  margin: 0;
  font-weight: bold;
}

.items-container {
  border: 2px solid green;
  padding: 10px;
  margin-bottom: 20px;
}

.actions {
  display: flex;
  gap: 10px;
}
</style>
