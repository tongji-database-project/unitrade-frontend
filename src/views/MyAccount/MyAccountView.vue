<script setup lang="ts">
import ItemsForSale from "../Profile/components/ItemsForSale.vue";
import ImfoLayout from "./components/ImfoLayout.vue"
import myorderLayout from "./components/myorderLayout.vue";
const categories = [ 
  {
    name: '首页',
    path: '/'
  },
  {
    name: '我的购物车',
    path: '/cart'
  },
  {
    name: "我的订单",
    path: "/order",        
  },
  {
    name: '我的收藏',
    path: '/' /*未设置 */
  },
  {
    name: '我的主页',
    path: '/' /*未设置 */
  },
  {
    name:"个人设置(进行密码修改等)",
    path:"/",       /*未设置 */
  },
  {
    name:"我的消息",
    paht:"/message",
  }
]

</script>

<template>
  <div class="container">
    <div class="my-navigator">
      <div class="header-category" v-for="({ name, path }, index) in categories" :key="index">
        <RouterLink :to="path">{{ name }}</RouterLink>
      </div>
    </div>
    <div class="my-informations">
      <ImfoLayout />
      <myorderLayout />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex; /* 使用弹性布局 */
  justify-content: space-between; /* 让子元素在容器内水平分布 */
}
.my-navigator {
  width: 25%;
  height: 400px;
  align-items: center; /* 垂直居中对齐 */
  border: 2px solid #ccc;
  border-radius: 10px; /* 设置所有四个角的圆角半径为 10px */
  padding: 30px;
}

.my-informations {
  width:100%;
}
</style>
