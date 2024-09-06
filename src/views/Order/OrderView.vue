<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import type { Order,OrderItem } from '@/utils/interfaces';
import { ElMessage } from 'element-plus';
import { useOrderStore } from '@/stores/orderStore';
// 获取路由参数
const route = useRoute()
const orderId = route.params.id as string // 订单ID
// 从 query 中获取订单数据
const orderData = route.query.order
  ? JSON.parse(decodeURIComponent(route.query.order as string))
  : null

// 创建状态来存储订单信息
const order = ref<Order | null>(orderData); // 使用传递的数据初始化订单
console.log("order:", order.value)
const isDelivered = ref<boolean>(false); // 状态来控制是否已收货
const showReviewBox = ref<boolean>(false)
const reviewText = ref<string>('')

const orderStore = useOrderStore();

onMounted(() => {
  if (!order.value) {
    console.error('订单数据未找到。');
  }else {
    // 检查订单状态，判断是否已收货
    isDelivered.value = order.value.state === 'ysh';
  }
});
const confirmReceipt = () => {
  // 更新订单状态（假设有一个函数 updateOrderStatus 调用 API 更新订单状态）
  order.value!.state = '已收货'; // 更新状态为已收货
  isDelivered.value = true; // 更新本地状态
  showReviewBox.value = true; // 显示评价框
}
// 提交评价
const submitReview = () => {
  if (reviewText.value.trim()) {
    console.log('提交的评价:', reviewText.value);
    // 这里可以添加调用 API 提交评价的逻辑
    // showReviewBox.value = false; // 隐藏评价框
    orderStore.saveReview(orderId,reviewText.value)
    reviewText.value = ''; // 清空评价输入框
    ElMessage.success('评价成功')
  } else {
    ElMessage.error('评价内容不能为空')
    console.warn('评价内容不能为空');
  }
}
const clearReview = () => {
  orderStore.clearReview(orderId);
  reviewText.value = '';
};

</script>

<template>
  <div>
    <h1>订单详情页面</h1>
    <div v-if="order">
      <h2>订单详情</h2>
      <p>订单 ID: {{ orderId }}</p>
      <p>订单状态: {{ order.state}}</p>
      <p>下单时间: {{ order.ordeR_TIME }}</p>
      <p>发货时间: {{ order.receivinG_TIME }}</p>
      <h3>商品列表</h3>
      <table>
        <thead>
          <tr>
            <th>商品ID</th>
            <th>商品名称</th>
            <th>数量</th>
            <th>价格</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in order.items" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.quantity }}</td>
            <td>{{ item.price }}</td>
          </tr>
        </tbody>
      </table>
      <!-- 确认收货按钮 -->
      <button v-if="!isDelivered" @click="confirmReceipt">确认收货</button>

      <!-- 评价输入框 -->
      <div v-if="showReviewBox" class="review-box">
        <h3>评价订单</h3>
        <textarea v-model="reviewText" placeholder="请输入您的评价..." rows="4"></textarea>
        <button @click="submitReview">提交评价</button>
        <button @click="clearReview" class="clear-button">清除评价</button>
    </div>
  </div>
    <div v-else>
      <p>加载中...</p>
    </div>
  </div>
</template>

<style scoped>
h1 {
  color: #333;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
th {
  background-color: #f2f2f2;
}
button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}
button:hover {
  background-color: #45a049;
}
button.clear-button {
  background-color: #f44336; /* 红色背景 */
}
.review-box {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
}
textarea {
  width: 100%;
  margin-bottom: 10px;
}
</style>
