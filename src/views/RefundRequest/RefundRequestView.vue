<template>
  <div>
    <h1>退款申请</h1>

    <!-- 订单信息 -->
    
      <p>订单 ID: {{ orderId }}</p>
      <p>订单状态: {{order?.state }}</p>
      <p>下单时间: {{order?.ordeR_TIME }}</p>
      <p>商品ID: {{ order?.merchandisE_ID}}</p>
      <p>地址: {{ order.userAddress}}</p>
      
    

    <!-- 退款理由选择 -->
    <div>
      <label for="refundReason">选择退款理由:</label>
      <select v-model="selectedReason" id="refundReason">
        <option disabled value="">请选择理由</option>
        <option v-for="reason in refundReasons" :key="reason" :value="reason">
          {{ reason }}
        </option>
      </select>
    </div>

    <!-- “其他”理由输入框 -->
    <div v-if="selectedReason === '其他'">
      <label for="otherReason">请输入其他理由:</label>
      <input type="text" id="otherReason" v-model="otherReason" placeholder="请输入详细理由" />
    </div>

    <!-- 申请退款按钮 -->
    <button @click="applyRefund" :disabled="!isReasonValid">申请退款</button>

    
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { requestRefund } from '@/apis/order';
import { ElMessage } from 'element-plus';
import type { Order } from '@/utils/interfaces';

// 获取路由参数中的订单 ID
const route = useRoute()
const orderId = route.params.id as string
// 从 query 中获取订单数据
const orderData = route.query.order
  ? JSON.parse(decodeURIComponent(route.query.order as string))
  : null

// 创建状态来存储订单信息
const order = ref<any | null>(orderData) // 使用传递的数据初始化订单

// 退款理由列表
const refundReasons = ref<string[]>(['商品质量问题', '发错商品/少件', '商品与描述不符', '其他'])

// 选择的退款理由
const selectedReason = ref<string>('')

// 其他理由文本框的内容
const otherReason = ref<string>('')


// 确定理由有效性
const isReasonValid = computed(() => {
  return (
    selectedReason.value !== '' &&
    (selectedReason.value !== '其他' || otherReason.value.trim() !== '')
  )
})

// 模拟申请退款函数
const applyRefund = async () => {
  // 检查订单是否存在
  if (!order.value) {
    ElMessage.error('订单数据未找到。');
    return;
  }

  // 检查是否选择了退款理由
  if (!isReasonValid.value) {
    ElMessage.error('请选择退款理由或输入其他理由。');
    return;
  }

  // 确定退款理由，如果选择的是“其他”，则使用用户输入的内容
  const reason = selectedReason.value === '其他' ? otherReason.value.trim() : selectedReason.value;

  try {
    // 调用申请退款 API
    await requestRefund(
      orderId,
      reason,
      'fb'
    );
    // 更新订单状态，模拟将订单状态更新为“已申请退款”
    if (order.value) {
      order.value.state = '已拒收'; // 更新订单状态为“已申请退款”
    }
  } catch (error) {
    // 处理错误情况
    ElMessage.error(`退款申请失败，错误信息：${(error as Error).message}`);
  }
};

onMounted(() => {
  if (!order.value) {
    console.error('订单数据未找到。')
  }
})
</script>

<style scoped>
/* 使用 Flexbox 将内容居中 */
.container {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  height: 100vh; /* 视窗高度，确保居中 */
  background-color: #f9f9f9;
}

.refund-application {
  text-align: center; /* 文本居中 */
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
h1 {
  font-size: 36px;
  justify-content: center;
  padding-top: 20px;
  padding-left: 660px;
}
h3 {
  font-size: 24px;
  margin-bottom: 16px;
}

p,
label,
select,
input {
  font-size: 18px;
  margin-bottom: 12px;
}

input {
  padding: 8px;
  margin-top: 10px;
  width: 300px;
}

button {
  margin-top: 10px;
  padding: 10px 20px;
  font-size: 18px;
  background-color: #409eff;
  color: #fff;
  border: none;
  cursor: pointer;
}

button:disabled {
  background-color: #c0c4cc;
  cursor: not-allowed;
}
</style>
