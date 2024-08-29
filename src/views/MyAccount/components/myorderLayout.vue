<script setup lang="ts">
import axios from "axios"
import { useTokenStore } from '@/stores/token'
import {  getMyOrder } from '@/apis/user'
import {onBeforeMount, ref,computed}from 'vue'
interface MyOrder{
      received:number;
      transit:number;
      uncommand:number;
}
let loading=ref(true)
const orders=ref<[MyOrder]>()
//追踪登录状态
const logged_in = computed(() => useTokenStore().logged_in)
const refreshOrder = async () => {
  if(logged_in.value){
    const info=await getMyOrder()
    orders.value=[{received:info.received,transit:info.transit,uncommand:info.uncommand}]
    loading.value=(false)
  }else{
    loading.value=(false)
    orders.value=[{received:0,transit:0,uncommand:0}]
  }
  // try{
  //   const response=await axios.post('/api/getMyOrder',{user:id})
  //   if (response.status === 200) {
  //     orders.value = response.data
  //     loading.value=(false)
  //   }
  // }catch(error){
  //   console.log(error)
  //   loading.value=(false)
  //   orders.value=[{received:0,transit:0,uncommand:0}]
  // }
}
onBeforeMount(()=>
{
  refreshOrder()  
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