<template>
  <div class="profile-view">
    <header class="header">
      <h1>个人主页</h1>
    </header>
    <UserInfo :user="user" />
    <ItemsForSale :items="items" />
  </div>
</template>

<script>
import UserInfo from './components/UserInfo.vue';
import ItemsForSale from './components/ItemsForSale.vue';
import avatar from './images/gclt.jpg';
import colaImage from './images/cola.jpg';

export default {
  name: 'ProfileView',
  components: {
    UserInfo,
    ItemsForSale,
  },
  data() {
    return {
      user: {
        id: 'user123',
        name: '张三',
        reputationScore: 4.5,
        avatar: avatar,
      },
      items: [
        { image: colaImage, name: '商品1', price: '￥10' },
        { image: colaImage, name: '商品2', price: '￥20' },
        { image: colaImage, name: '商品3', price: '￥30' },
        { image: colaImage, name: '商品4', price: '￥40' },
        { image: colaImage, name: '商品5', price: '￥50' },
        { image: colaImage, name: '商品6', price: '￥60' },
        { image: colaImage, name: '商品7', price: '￥70' },
        { image: colaImage, name: '商品8', price: '￥80' },
        { image: colaImage, name: '商品9', price: '￥90' },
        { image: colaImage, name: '商品10', price: '￥100' },
      ],
    };
  },
};
</script>

<style scoped>
.profile-view {
  background-color: white;
  padding: 16px;
}

.header {
  background-color: lightblue;
  padding: 16px;
  text-align: left;
}

.header h1 {
  margin: 0;
  font-size: 24px;
  font-weight: bold;
}
</style>
