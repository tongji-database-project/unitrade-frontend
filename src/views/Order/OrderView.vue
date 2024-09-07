<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import type { Order,OrderItem } from '@/utils/interfaces';
import { ElMessage } from 'element-plus';
import { useOrderStore } from '@/stores/orderStore';
import { addComment } from '@/apis/order';
import { confirmReceipt as apiConfirmReceipt } from '@/apis/order'; // 确保正确导入
// 获取路由参数
const route = useRoute()
const orderId = route.params.id as string // 订单ID
// 从 query 中获取订单数据
const orderData = route.query.order
  ? JSON.parse(decodeURIComponent(route.query.order as string))
  : null

// 创建状态来存储订单信息
const order = ref<any | null>(orderData); // 使用传递的数据初始化订单
console.log("order:", order.value)
const isDelivered = ref<boolean>(false); // 状态来控制是否已收货
const showReviewBox = ref<boolean>(false)
const reviewText = ref<string>('')

// 评分相关状态
const quality_rating = ref<number>(0);
const attitude_rating = ref<number>(0);
const price_rating = ref<number>(0);
const logistic_speed_rating = ref<number>(0);
const conformity_rating = ref<number>(0);

const orderStore = useOrderStore();

onMounted(() => {
  if (!order.value) {
    console.error('订单数据未找到。');
  }else {
    // 检查订单状态，判断是否已收货
    isDelivered.value = order.value.state === 'ysh';
  }
});
const confirmReceipt = async () => {
  if (!order.value || !order.value.ordeR_ID || !order.value.merchandisE_ID) {
    ElMessage.error('订单或商品信息不完整');
    return;
  }

  try {
    // 调用确认收货 API
    await apiConfirmReceipt(
      orderId,        // 确保传递了正确的参数
      order.value.merchandisE_ID
    );

    // 更新本地状态和显示评价框
    order.value.state = '已收货';             // 更新状态为已收货
    isDelivered.value = true;             // 更新本地状态
    showReviewBox.value = true;           // 显示评价框
    
  } catch (error) {
    console.error('收货确认失败', error);
    ElMessage.error('收货确认失败，请稍后重试');
  }
};

const submitReview = async () => {
  if (reviewText.value.trim()) {
    try {
      await addComment(
        orderId,
        order.value.merchandisE_ID,
        reviewText.value,
        'T',
        quality_rating.value,
        attitude_rating.value,
        price_rating.value,
        logistic_speed_rating.value,
        conformity_rating.value
      )
      reviewText.value = ''; // 清空评价输入框
      quality_rating.value = 0;
      attitude_rating.value = 0;
      price_rating.value = 0;
      logistic_speed_rating.value = 0;
      conformity_rating.value = 0;
    } catch (error) {
      console.error('评价提交失败', error);
      ElMessage.error('提交评价失败，请稍后重试');
    }
  } else {
    ElMessage.error('评价内容不能为空');
  }
};

const clearReview = () => {
  orderStore.clearReview(orderId);
  reviewText.value = '';
  quality_rating.value = 0;
  attitude_rating.value = 0;
  price_rating.value = 0;
  logistic_speed_rating.value = 0;
  conformity_rating.value = 0;
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
      <p>收货时间: {{ order.receivinG_TIME }}</p>
      <p>商品ID:   {{ order.merchandisE_ID }}</p>
      <p>地址: {{ order.userAddress }}</p>
      <!-- 确认收货按钮 -->
      <button v-if="!isDelivered" @click="confirmReceipt">确认收货</button>

      <!-- 评价输入框 -->
      <div v-if="showReviewBox" class="review-box">
        <h3>评价订单</h3>
        <div>
            <label>商品质量评分:</label>
            <el-rate v-model="quality_rating" :max="5"></el-rate>
          </div>
          <div>
            <label>服务态度评分:</label>
            <el-rate v-model="attitude_rating" :max="5"></el-rate>
          </div>
          <div>
            <label>价格评分:</label>
            <el-rate v-model="price_rating" :max="5"></el-rate>
          </div>
          <div>
            <label>物流速度评分:</label>
            <el-rate v-model="logistic_speed_rating" :max="5"></el-rate>
          </div>
          <div>
            <label>描述相符评分:</label>
            <el-rate v-model="conformity_rating" :max="5"></el-rate>
          </div>
          
        <textarea v-model="reviewText" placeholder="请输入您的评价..." rows="4"></textarea>
        <button @click="submitReview">提交评价</button>
        <button @click="clearReview" class="clear-button">清除评价</button>
    </div>
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
.rating-box {
  margin-top: 100px; /* 与上方其他元素的间距 */
  margin-bottom: 100px; /* 与评论框的间距 */
  padding: 10px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
}
</style>
