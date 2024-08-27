<script setup lang="ts">
import axios from "axios"
import contentclass from '../MyAccountView.vue'
import {onBeforeMount, ref}from 'vue'
interface MyOrder{
      received:number;
      transit:number;
      uncommand:number;
}
let loading=ref(true)
const orders=ref<[MyOrder]>();
const getMyOrder = async () => {
  await axios
  // .get(`/api/getMyinfo`)
  // 后端部署后将上面部分取消注释
  .get(`/api/getMyOrder`)    //暂时为test，等后端代码部署再修改为`/api/getMyinfo`
  .then(response => {
    if (response.status === 200) {
      orders.value = response.data
      loading.value=(false)
    }
  })
  .catch(function (error) {
    console.log(error)
    loading.value=(false)
    orders.value=[{received:0,transit:0,uncommand:0}]
  });
}
onBeforeMount(()=>
{
  getMyOrder()   
})
</script>

<template>
      <div v-if="loading"class="centre">
       <div class="spinner"></div>
      </div>
      <div v-else class="my-orders">  
        <!-- 显示订单的信息 -->
         <div v-for="(order, index) in orders" :key="index"class="have-received">
          <h>已收货</h>
          <p>{{ order.received }}</p>
         </div>
         <div v-for="(order, index) in orders" :key="index"class="have-received">
          <h>运输中</h>
          <p>{{ order.transit }}</p>
         </div>
         <div v-for="(order, index) in orders" :key="index"class="have-received">
          <h>未评价</h>
          <p>{{ order.uncommand }}</p>
         </div>
      </div>
</template>
<style>
.my-orders{
  border: 2px solid #ccc;
  border-radius: 10px; /* 设置所有四个角的圆角半径为 10px */
  width:100%;
  height: 40%;
  display:flex;
  justify-content: space-between;
  padding:20px;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid #3498db;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  
}
.centre
{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%; 
}
</style>