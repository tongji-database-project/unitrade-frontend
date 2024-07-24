<template>
  <div>
    <h2>结算页面</h2>
    <div>总金额: {{ total }}</div>
    <el-button type="success" @click="processPayment">支付</el-button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ElButton } from 'element-plus';

const total = ref(0); // 应从前端存储或API获取真实数据

const processPayment = () => {
  // 处理支付逻辑
  this.$router.replace('/Payment');
  console.log('支付成功!');
  // 跳转到订单完成或支付确认页面
  this.$router.replace('/order-confirmation');
};
</script>
