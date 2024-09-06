<!-- 申诉 -->
<script lang="ts" setup>
  import type { myappealinformation } from './myAppealSection.vue';
  import 'element-plus/dist/index.css';

  const props=defineProps({
    onemyappealinformation:{
      type:Object as () => myappealinformation,
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
      投诉人：{{ onemyappealinformation.complainant_name}}
    </div>
    <div class="introduce">
      投诉原因：{{onemyappealinformation.complation_reason}}
    </div>
    <div class="introduce">
      申诉原因：{{onemyappealinformation.appeal_reason}}
    </div>
    <div class="introduce">
      申诉时间：{{ onemyappealinformation.time }}
    </div>
    <div class="introduce">
      申诉状态：{{ onemyappealinformation.state }}
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