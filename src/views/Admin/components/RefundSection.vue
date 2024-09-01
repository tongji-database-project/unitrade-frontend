<!-- 退款 -->
<script lang="ts" setup>
  import { ref, onMounted } from 'vue';  
  import OneRefund from './OneRefund.vue';
  import axios from 'axios';

  let isloading = ref(true);

  export type refundinformation={
    refund_id:string;
    seller_name:string;
    seller_id:string;
    buyer_name:string;
    buyer_id:string;
    commodity:string;
    reason:string;
    time:Date;
  }

  let refundinformations = ref<refundinformation[]>([]);
  refundinformations.value.push({refund_id:"1",seller_name:"商家1",seller_id:"1",buyer_name:"买家1",buyer_id:"1",commodity:"商品1",reason:"1",time:new Date('2023-03-21T14:30:00')});
  refundinformations.value.push({refund_id:"2",seller_name:"商家2",seller_id:"2",buyer_name:"买家2",buyer_id:"2",commodity:"商品2",reason:"2",time:new Date('2023-03-21T14:30:00')});
  refundinformations.value.push({refund_id:"3",seller_name:"商家3",seller_id:"3",buyer_name:"买家3",buyer_id:"3",commodity:"商品3",reason:"3",time:new Date('2023-03-21T14:30:00')});
  refundinformations.value.push({refund_id:"4",seller_name:"商家4",seller_id:"4",buyer_name:"买家4",buyer_id:"4",commodity:"商品4",reason:"4",time:new Date('2023-03-21T14:30:00')});
  
  const deleteconfirm = (index:number) => {
    refundinformations.value.splice(index,1);
  }

  onMounted(async() =>{
    try{
      const refundInfo = await axios.get('/api/refund/query');
      refundInfo.data.forEach((oneInfo:any) => {
        let one:refundinformation={
          refund_id:oneInfo.refund_id,
          seller_name:oneInfo.seller_name,
          seller_id:oneInfo.seller_id,
          buyer_name:oneInfo.buyer_name,
          buyer_id:oneInfo.buyer_id,
          commodity:oneInfo.commodity,
          reason:oneInfo.reason,
          time:new Date(oneInfo.time)
        };
        refundinformations.value.push(one);
      });
    } catch (error) {
      console.log(error)
    }
    isloading.value = false;
  })
</script>

<template>
  <div class="main">
    <div class="spinner" v-if="isloading"></div>
    <div class="list" v-else>
      <div v-for="(item, index) in refundinformations" :key="index" class="table">
        <OneRefund :onerefundinformation="item" :num="index" @delete="deleteconfirm"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .main{
    position: relative;
  }
  .list{
    max-height: 650px;
    overflow-y: auto;
  }
  .table{
    width: 100%;
    background-color: rgb(255, 255, 255);
    margin-bottom: 10px; /* 调整这个数值来增加或减少间距 */
    padding: 10px; /* 可选：添加填充以让表格内容与边界有些距离 */
    border: 2px solid #a4a4a4b7;
    border-radius: 15px; /* 可选：为表格添加圆角 */
  }
  .spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    border-top: 4px solid #3498db;
    width: 80px;
    height: 80px;
    animation: spin 1s linear infinite;
    position: absolute;
    top: 100px; /* 调整spinner与父元素顶部的距离 */  
    left: 50%; /* 水平居中的一部分 */  
    transform: translateX(-50%); /* 向左偏移自身宽度的50%，实现水平居中 */
  }
</style> 