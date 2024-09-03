<template>
  <div>
    <h1>退款申请</h1>

    <!-- 订单信息 -->
    <div>
      <p>订单 ID: {{ orderId }}</p>
    </div>

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

    <!-- 退款进度显示 -->
    <div v-if="refundStatus">
      <h3>退款进度</h3>
      <p>{{ refundStatus }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

// 订单数据接口
interface OrderItem {
  id: string
  name: string
  quantity: number
  price: number
}

interface Order {
  id: string
  merchandise_id: string
  name: string
  order_quantity: number
  state: string
  order_time: string
  receiving_time: string
  address: string
  items: OrderItem[]
}

// 获取路由参数中的订单 ID
const route = useRoute()
const orderId = route.params.id as string
// 从 query 中获取订单数据
const orderData = route.query.order
  ? JSON.parse(decodeURIComponent(route.query.order as string))
  : null

// 创建状态来存储订单信息
const order = ref<Order | null>(orderData) // 使用传递的数据初始化订单

//当前订单中包含的商品

// 退款理由列表
const refundReasons = ref<string[]>(['商品质量问题', '发错商品/少件', '商品与描述不符', '其他'])

// 选择的退款理由
const selectedReason = ref<string>('')

// 其他理由文本框的内容
const otherReason = ref<string>('')

// 退款进度状态
const refundStatus = ref<string>('')

// 确定理由有效性
const isReasonValid = computed(() => {
  return (
    selectedReason.value !== '' &&
    (selectedReason.value !== '其他' || otherReason.value.trim() !== '')
  )
})

// 模拟申请退款函数
const applyRefund = () => {
  if (!isReasonValid.value) return

  // 模拟一个异步请求
  refundStatus.value = '退款处理中...'
  setTimeout(() => {
    refundStatus.value = '退款已完成！'
  }, 2000)
}

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
