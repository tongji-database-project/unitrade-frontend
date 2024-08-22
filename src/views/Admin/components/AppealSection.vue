<!-- 投诉 -->
<script lang="ts" setup>
  import { ref } from 'vue';  
  import OneAppeal from './OneAppeal.vue';

  export type appealinformation={
    seller:string;
    credibility:number;
    reason:string;
    complainant:string;
    time:Date;
  }

  let appealinformations = ref<appealinformation[]>([]);
  appealinformations.value.push({seller:"商家1",credibility:100,reason:"无",complainant:"用户1",time:new Date('2023-03-21T14:30:00')});
  appealinformations.value.push({seller:"商家2",credibility:100,reason:"无",complainant:"用户2",time:new Date('2024-03-21T14:30:00')});
  appealinformations.value.push({seller:"商家3",credibility:100,reason:"无",complainant:"用户3",time:new Date('2025-03-21T14:30:00')});
  appealinformations.value.push({seller:"商家4",credibility:100,reason:"无",complainant:"用户4",time:new Date('2026-03-21T14:30:00')});

  const deleteconfirm = (index:number) => {
    appealinformations.value.splice(index,1);
  }
</script>

<template>
  <div class="main">
    <div v-for="(item, index) in appealinformations" :key="index" class="table">
      <OneAppeal :oneappealinformation="item" :num="index" @delete="deleteconfirm"/>
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
  }
</style> 