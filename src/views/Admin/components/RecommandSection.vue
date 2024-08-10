<!-- 推送 -->
<script lang="ts" setup>
  import { ref } from 'vue';  
  import OneRecommand from './OneRecommand.vue';

  let items=ref(["商品1","商品2","商品3","商品4","商品5","商品6"]);

  const deleteconfirm = (index:number) => {
    items.value.splice(index,1);
  }
</script>

<template>
  <div class="main">
    <div v-for="(item, index) in items" :key="index">
      <OneRecommand :introduce="item" :num="index" @delete="deleteconfirm"/>
    </div>
  </div>
</template>

<style scoped>
  .main{
    max-height: 600px; 
    overflow-y: auto;
  }
</style> 