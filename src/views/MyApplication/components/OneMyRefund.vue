<!-- 投诉 -->
<script lang="ts" setup>
  import type { myrefundinformation } from './myRefundSection.vue';
  import 'element-plus/dist/index.css';

  const props=defineProps({
    onemyrefundinformation:{
      type:Object as () => myrefundinformation,
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
      订单编号：{{ onemyrefundinformation.order_id }}
    </div>
    <div class="introduce">
      商品名：{{ onemyrefundinformation.commodity }}
    </div>
    <div class="introduce">
      退款原因：{{ onemyrefundinformation.reason }}
    </div>
    <div class="introduce">
      退款时间：{{ onemyrefundinformation.time }}
    </div>
    <div class="introduce">
      退款状态：{{ onemyrefundinformation.state }}
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