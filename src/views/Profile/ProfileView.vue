<template>
  <div class="user-profile">
    <UserInfo :user="user" />
    <SalesInfo :sales="sales" />
    <div class="items-section">
      <h3>在售商品</h3>
      <ItemsForSale :items="items" />
    </div>
    <div class="buttons-section">
      <ActionButton :userId="user.id" buttonText="联系卖家" action="chat" />
      <ActionButton :userId="user.id" buttonText="投诉卖家" action="complaint" />
    </div>
  </div>
</template>

<script>
import UserInfo from './components/UserInfo.vue';
import SalesInfo from './components/SalesInfo.vue';
import ItemsForSale from './components/ItemsForSale.vue';
import ActionButton from './components/ActioButton.vue';

export default {
  components: {
    UserInfo,
    SalesInfo,
    ItemsForSale,
    ActionButton,
  },
  data() {
    return {
      user: {
        id: '123',
        name: '张三',
        reputation: 95,
        salesCount: 10,
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
  min-height: 100vh;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  background-color: #ffe4e1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.user-info img {
  border-radius: 50%;
  width: 100px;
  height: 100px;
  margin-right: 20px;
}

.sales-info, .items-section, .buttons-section {
  width: 80%;
  max-width: 600px;
  margin-bottom: 20px;
}

.items-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.items-section h3 {
  align-self: flex-start;
}

.items-for-sale {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.buttons-section {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}
</style>
