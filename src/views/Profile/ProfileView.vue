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
      <ActionButton :userId="userId" buttonText="投诉卖家" action="complaint" @click="toggleComplaintForm" />
    </div>
    <ComplaintForm v-if="showComplaintForm" :userId="userId" />
  </div>
</template>

<script lang="ts">
import UserInfo from './components/UserInfo.vue'
import ItemsForSale from './components/ItemsForSale.vue'
import ActionButton from './components/ActionButton.vue'
import ComplaintForm from './components/ComplaintForm.vue'
import { getImageUrl } from '@/utils/utils'

export default {
  name: 'ProfileView',
  components: {
    UserInfo,
    ItemsForSale,
    ActionButton,
    ComplaintForm
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
      ],
      showComplaintForm: false
    }
  },
  methods: {
    toggleComplaintForm() {
      this.showComplaintForm = !this.showComplaintForm;
    }
  }
}
</script>

<style scoped>
/* 这里省略了之前已有的样式代码 */
</style>
