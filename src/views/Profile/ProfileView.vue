<template>
  <div class="user-profile">
    <UserInfo :user="user" />
    <SalesInfo :sales="sales" />
    <ItemsForSale :items="items" />
    <ChatButton :userId="user.id" />
    <ComplaintButton :userId="user.id" />
  </div>
</template>

<script>
import UserInfo from './components/UserInfo.vue';
import SalesInfo from './components/SalesInfo.vue';
import ItemsForSale from './components/ItemsForSale.vue';
import ChatButton from './components/ChatButton.vue';
import ComplaintButton from './components/ComplaintButton.vue';

export default {
  components: {
    UserInfo,
    SalesInfo,
    ItemsForSale,
    ChatButton,
    ComplaintButton,
  },
  data() {
    return {
      user: {
        id: '123',
        name: '张三',
        reputation: 95,
      },
      sales: [
        { id: '1', name: '商品1', quantity: 10 },
        { id: '2', name: '商品2', quantity: 5 },
      ],
      items: [
        { id: '1', name: '商品1', price: 100 },
        { id: '2', name: '商品2', price: 200 },
      ],
    };
  },
};
</script>

<style scoped>
.user-profile {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}
</style>
