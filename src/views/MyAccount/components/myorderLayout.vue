<script setup lang="ts">

const received="未读取"
const transit="未读取"
const uncommand="未读取"
</script>

<template>
      <div class="my-orders">  
        <!-- 显示订单的信息 -->
         <div class="have-received">
          <h>已收货</h>
          <p>{{ received }}</p>
         </div>
         <div class="transit">
          <h>运输中</h>
          <p>{{ transit }}</p>
         </div>
         <div class="uncommand">
          <h>未评价</h>
          <p>{{ uncommand }}</p>
         </div>
      </div>
</template>