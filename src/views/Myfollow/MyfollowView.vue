<script setup lang="ts">
import { onBeforeMount, ref, computed } from 'vue'
import { useTokenStore } from '@/stores/token'
import { useRouter } from 'vue-router'
import MyfollowLayout from './components/MyfollowLayout.vue'
const logged_in = computed(() => useTokenStore().logged_in)
let hint_login = ref(true)
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
    name: '我的订单',
    path: '/order'
  },
  {
    name: '我的主页',
    path: '/profile/:id' 
  },
  {
    name: '个人中心',
    path: '/account' 
  },
  {
    name: '我的消息',
    path: '/message'
  },
  {
    name: '我的申请',
    path: '/myapplication'
  },
  {
    name: '个人设置',
    path: '/Editinfo'
  }
]
const router = useRouter()


onBeforeMount(() => {
  if(logged_in.value){
  hint_login.value = false
  }
})
</script>

<template>
  <div class="container">
    <div class="my-navigator">
      <div class="header-category" v-for="({ name, path }, index) in categories" :key="index">
        <RouterLink :to="path">{{ name }}</RouterLink>
      </div>
    </div>
    <div class="my-info">
        <p class="header">我的收藏</p>
        <MyfollowLayout/>
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
.my-info {
  width: 100%;
  padding: 20px;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  text-align: center;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.header{
    font-size: 20px;
}
</style>
