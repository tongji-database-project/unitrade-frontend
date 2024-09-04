<script lang="ts" setup>
import { ref, onMounted } from 'vue'
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

// 获取路由参数
const route = useRoute()
const orderId = route.params.id as string // 订单ID
// 从 query 中获取订单数据
const orderData = route.query.order
  ? JSON.parse(decodeURIComponent(route.query.order as string))
  : null

// 创建状态来存储订单信息
const order = ref<Order | null>(orderData) // 使用传递的数据初始化订单

onMounted(() => {
  if (!order.value) {
    console.error('订单数据未找到。')
  }
})
</script>

<template>
  <div>
    <h1>订单详情页面</h1>
    <div v-if="order">
      <h2>订单详情</h2>
      <p>订单 ID: {{ orderId }}</p>
      <p>订单状态: {{ order.state }}</p>
      <p>下单时间: {{ order.order_time }}</p>
      <p>发货时间: {{ order.receiving_time }}</p>
      <p>地址: {{ order.address }}</p>
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
</style>
