<!-- 推送 -->
<script lang="ts" setup>
  import { ref } from 'vue';  
  import OneRecommand from './OneRecommand.vue';

  export type pushinformation={
    commodity:string;
    type:string;
    seller:string;
    credibility:number;
    time:Date;
  }

  let pushinformations = ref<pushinformation[]>([]);
  pushinformations.value.push({commodity:"商品1",type:"类型1",seller:"商家1",credibility:100,time:new Date('2023-03-21T14:30:00')});
  pushinformations.value.push({commodity:"商品2",type:"类型2",seller:"商家2",credibility:100,time:new Date('2024-03-21T14:30:00')});
  pushinformations.value.push({commodity:"商品3",type:"类型3",seller:"商家3",credibility:100,time:new Date('2025-03-21T14:30:00')});
  pushinformations.value.push({commodity:"商品4",type:"类型4",seller:"商家4",credibility:100,time:new Date('2026-03-21T14:30:00')});

  const deleteconfirm = (index:number) => {
    pushinformations.value.splice(index,1);
  }
</script>

<template>
  <div class="main">
    <div v-for="(item, index) in pushinformations" :key="index">
      <OneRecommand :onepushinformation="item" :num="index" @delete="deleteconfirm"/>
    </div>
  </div>
</template>

<style scoped>
  .main{
    max-height: 650px; 
    overflow-y: auto;
  }
</style> 