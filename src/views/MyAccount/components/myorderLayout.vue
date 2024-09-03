<script setup lang="ts">
import axios from "axios"
import { useTokenStore } from '@/stores/token'
import { useRouter } from 'vue-router'
import {  getMyOrder } from '@/apis/user'
import {onBeforeMount, ref,computed}from 'vue'
interface MyOrder{
      all:number;
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
    orders.value=[{received:info.received,transit:info.transit,uncommand:info.uncommand,all:info.all}]
    loading.value=(false)
  }else{
    loading.value=(false)
    orders.value=[{received:0,transit:0,uncommand:0,all:0}]
  }
}
const router = useRouter();
function toOrder(){
  router.push('order')
}
function toReceived(){
  router.push('received')
}
function toTransit(){
  router.push('transit')
}
function toUncommand(){
  router.push('uncommand')
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
        <div v-for="(order, index) in orders" :key="index"class="order">
          <div class="title">
            <h @click="toOrder">所有订单</h>
          </div>
          <p>{{ order.all }}</p>
         </div>
         <div v-for="(order, index) in orders" :key="index"class="order">
          <div class="title">
            <h @click="toReceived">已收货</h>
          </div>
          <p>{{ order.received }}</p>
         </div>
         <div v-for="(order, index) in orders" :key="index"class="order">
          <div class="title">
            <h @click="toTransit">运输中</h>
          </div>
          <p>{{ order.transit }}</p>
         </div>
         <div v-for="(order, index) in orders" :key="index"class="order">
          <div class="title">
            <h @click="toUncommand">未评价</h>
          </div>
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
.order{
  display: grid;
  place-items: center; /* 同时水平和垂直居中 */
}
.title{
  color: hsla(160, 100%, 37%, 1);
}
.title:hover{
  cursor: pointer; 
  background-color: hsla(160, 100%, 37%, 0.2);
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