<!-- 投诉 -->
<script lang="ts" setup>
  import type { mycomplationinformation } from './myComplationSection.vue';
  import 'element-plus/dist/index.css';

  const props=defineProps({
    onemycomplationinformation:{
      type:Object as () => mycomplationinformation,
      default:null,
    },
    num:{
      type:Number,
      default:0,
    }
  })
</script>

<template>
  <div class="main">
    <div class="introduce">
      投诉商家：{{ onemycomplationinformation.seller }}
    </div>
    <div class="introduce">
      投诉原因：{{ onemycomplationinformation.reason }}
    </div>
    <div class="introduce">
      投诉时间：{{ onemycomplationinformation.time }}
    </div>
    <div class="introduce">
      投诉状态：{{ onemycomplationinformation.state }}
    </div>

  </div>
</template>

<style scoped>
  .main{
    height: auto; 
    background-color:rgb(246, 246, 246);
    margin-bottom: 10px;
    border: 2px solid #a4a4a4b7;
    border-radius: 15px;
  }

  .introduce{
    font-weight: bold;  
    font-size: 15px; 
    margin-left: 5%;
    margin-top: 1.5%;
  }
</style> 