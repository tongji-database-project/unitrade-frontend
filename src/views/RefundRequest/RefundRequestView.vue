<template>
  <!-- TODO: 待完成 -->
  <h1>退款申请页面（WIP）</h1>
<<<<<<< HEAD
  <div>
    <h1>申请退款</h1>
    <p>订单 ID: {{ orderId }}</p>
    <!-- 退款表单 -->
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