<template>
  <!-- TODO: 待完成 -->
  <h1>退款申请页面（WIP）</h1>
  <div>
    <h1>申请退款</h1>
    <p>订单 ID: {{ orderId }}</p>
    <!-- 退款表单 -->
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const orderId = route.params.id
</script>