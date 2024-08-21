<template>
  <!-- TODO: 待完成 -->
  <h1>订单详情页面（WIP）</h1>
<<<<<<< HEAD
  <div>
  <h1>订单详情</h1>
    <p>订单 ID: {{ orderId }}</p>
    <!-- 其他订单详情 -->
  </div>
=======
  <div v-for="i in 30" :key="i" style="padding-top: 1rem">填充内容，用于拉长页面长度</div>
>>>>>>> fec9bc37a3a67969812a8d11a7b3b20029940903
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const orderId = route.params.id
</script>