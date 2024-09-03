<template>
  <h1>已收货货物清单</h1>
  <el-container class="myOrder" style="height: 500px">
    <el-container>
      <el-header style="text-align: left; font-size: 15px">
        <span class="header-title" style="width: 135px">订单号</span>
        <span class="header-title" style="width: 140px">商品ID</span>
        <span class="header-title" style="width: 140px">商品名称</span>
        <span class="header-title" style="width: 110px">商品数量</span>
        <span class="header-title" style="width: 140px">订单状态</span>
        <span class="header-title" style="width: 200px">下单时间</span>
        <span class="header-title" style="width: 200px">收获时间</span>
        <span class="header-title" style="flex: 1">地址</span>
      </el-header>
      <el-main>
        <el-scrollbar>
          <el-table :data="tableData">
            <el-table-column prop="order_id" width="150" />
            <el-table-column prop="merchandise_id" width="150" />
            <el-table-column prop="name" width="190" />
            <el-table-column prop="order_quantity" width="120" />
            <el-table-column prop="state" width="150" />
            <el-table-column prop="order_time" width="220" />
            <el-table-column prop="receiving_time" width="220" />
            <el-table-column prop="address" />
          </el-table>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const item = {
  order_id: '123456',
  merchandise_id: '654321',
  name: '商品名称示例',
  order_quantity: 2,
  state: '已发货',
  order_time: '2023-07-12 14:30:00',
  receiving_time: '2023-07-15 10:00:00',
  address: 'No. 189, Grove St, Los Angeles'
}
const tableData = ref(Array.from({ length: 20 }).fill(item))

const handleOrderClick = () => {
  console.log('点击我的订单')
}
</script>

<style scoped>
.myOrder .el-header {
  display: flex;
  align-items: center;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
  padding: 10px;
  border-bottom: 0px solid var(--el-color-primary-light-5);
}
.myOrder .el-menu {
  border-right: none;
}
.myOrder .el-main {
  padding: 0;
}
.myOrder .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 0px;
}
.myOrder .header-title {
  margin-right: 20px;
  font-weight: bold;
  padding-right: 10px; /* 添加右边距使其间距一致 */
}
</style>
<!--  以下为备用版本
 <script setup lang="ts">
import {onBeforeMount, ref,computed}from 'vue'
import { useTokenStore } from '@/stores/token'
import { useRouter } from 'vue-router';
import ReceivedlistLayout from './components/ReceivedlistLayout.vue';

const logged_in = computed(() => useTokenStore().logged_in)
let hint_login=ref(true);
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
    name:"我的消息",
    path:"/message",
  },
  {
    name:"个人信息修改",
    path:"/Editinfo",
  }
]
const router = useRouter();
function Tologin() {
  router.push('/login');
}
onBeforeMount(()=>{
  hint_login.value=false;
})
</script>
<template>
   <div class="container">
    <div class="my-navigator">
      <div class="header-category" v-for="({ name, path }, index) in categories" :key="index">
        <RouterLink :to="path">{{ name }}</RouterLink>
      </div>
    </div>
    <div class="content">
      <ReceivedlistLayout/>
    </div>
    <div v-if="hint_login==true">
      <transition name="fade">
      <div class="modal-overlay">
        <div class="modal-content" @click="Tologin">
          <p>当前未登录，请先进行登录</p>
          <p>点击弹窗跳转到登录页面</p>
        </div>
      </div>
    </transition>
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
.content {
  width:100%;
  padding:20px;
  background-color: rgb(241, 238, 238);
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
  </style> -->