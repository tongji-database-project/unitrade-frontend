<template>
  <!-- TODO: 待完成 -->
  <h1>订单详情页面（WIP）</h1>
  <div>
  <h1>订单详情</h1>
    <p>订单 ID: {{ orderId }}</p>
    <!-- 其他订单详情 -->
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const orderId = route.params.id
</script>