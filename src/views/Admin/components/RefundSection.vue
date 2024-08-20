<!-- 退款 -->
<script lang="ts" setup>
  import { ref } from 'vue';  
  import OneRefund from './OneRefund.vue';

  export type refundinformation={
    seller:string;
    buyer:string;
    commodity:string;
    time:Date;
  }

  let refundinformations = ref<refundinformation[]>([]);
  refundinformations.value.push({seller:"商家1",buyer:"买家1",commodity:"商品1",time:new Date('2023-03-21T14:30:00')});
  refundinformations.value.push({seller:"商家2",buyer:"买家2",commodity:"商品2",time:new Date('2024-03-21T14:30:00')});
  refundinformations.value.push({seller:"商家3",buyer:"买家3",commodity:"商品3",time:new Date('2025-03-21T14:30:00')});
  refundinformations.value.push({seller:"商家4",buyer:"买家4",commodity:"商品4",time:new Date('2026-03-21T14:30:00')});

  const deleteconfirm = (index:number) => {
    refundinformations.value.splice(index,1);
  }
</script>

<template>
  <div class="main">
    <div v-for="(item, index) in refundinformations" :key="index" class="table">
      <OneRefund :onerefundinformation="item" :num="index" @delete="deleteconfirm"/>
    </div>
  </div>
</template>

<style scoped>
  .main{
    max-height: 650px; 
    overflow-y: auto;
  }
  .table{
    background-color: rgb(255, 255, 255);
    margin-bottom: 15px; /* 调整这个数值来增加或减少间距 */
    padding: 10px; /* 可选：添加填充以让表格内容与边界有些距离 */
    border: 1px solid #ddd; /* 可选：为表格添加边框 */
    border-radius: 5px; /* 可选：为表格添加圆角 */
  }
</style> 