<template>
  <!-- TODO: 待完成 -->
  <h1>全部订单</h1>
  <el-container class="myOrder" style="height: 500px">
    <el-container>
      <el-header style="text-align: left; font-size: 15px">
        <span class="header-title" style="width: 135px">订单号</span>
        <span class="header-title" style="width: 140px">商品详情</span>
        <span class="header-title" style="width: 140px">订单状态</span>
        <span class="header-title" style="width: 200px">下单时间</span>
        <span class="header-title" style="width: 200px">收获时间</span>
        <span class="header-title" style="width: 180px">地址</span>
      </el-header>
      <el-main>
        <el-scrollbar>
          <el-table :data="tableData">
            <el-table-column prop="order_id" label="订单号" width="150" />
            <el-table-column label="商品详情" width="300">
              <template #default="scope">
                <ul>
                  <li v-for="(item, index) in scope.row.items" :key="index">
                    商品ID: {{ item.id }}, 名称: {{ item.name }}, 数量: {{ item.quantity }}
                  </li>
                </ul>
              </template>
            </el-table-column>
            <el-table-column prop="state" label="订单状态" width="150" />
            <el-table-column prop="order_time" label="下单时间" width="220" />
            <el-table-column prop="receiving_time" label="收获时间" width="220" />
            <el-table-column prop="address" label="地址" />
            <el-table-column width="150">
              <template #default="scope">
                <el-button size="small" type="primary" @click="handleOrderClick(scope.row)"
                  >订单详情</el-button
                >
                <el-button size="small" type="danger" @click="handleRefundClick(scope.row.order_id)"
                  >申请退款</el-button
                >
              </template>
            </el-table-column>
            =======
            <el-table-column prop="address" />
            >>>>>>> fec9bc37a3a67969812a8d11a7b3b20029940903
          </el-table>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 定义包含多个商品的订单数据
const tableData = ref([
  {
    order_id: '123456',
    items: [
      { id: '654321', name: '商品名称示例1', quantity: 2 },
      { id: '654322', name: '商品名称示例2', quantity: 1 }
    ],
    state: '已发货',
    order_time: '2023-07-12 14:30:00',
    receiving_time: '2023-07-15 10:00:00',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    order_id: '123457',
    items: [
      { id: '654323', name: '商品名称示例3', quantity: 3 },
      { id: '654324', name: '商品名称示例4', quantity: 2 }
    ],
    state: '待发货',
    order_time: '2023-07-13 09:00:00',
    receiving_time: '2023-07-16 12:00:00',
    address: 'No. 45, Oak St, San Francisco'
  }
  // 更多订单数据...
])

const handleOrderClick = (order: any) => {
  console.log('点击订单详情，订单号:', order.order_id)
  const encodedOrderData = encodeURIComponent(JSON.stringify(order))
  router.push({
    name: 'OrderDetail',
    params: { id: order.order_id },
    query: { order: encodedOrderData }
  })
}

const handleRefundClick = (orderId: string) => {
  console.log('点击申请退款，订单号:', orderId)
  router.push({ name: 'RefundRequest', params: { id: orderId } })
}
</script>

<style scoped>
.myOrder .el-header {
  display: flex;
  align-items: center;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
  padding: 10px;
  border-bottom: 0px solid var(--el-color-primary-light-5);
}
.myOrder .el-menu {
  border-right: none;
}
.myOrder .el-main {
  padding: 0;
}
.myOrder .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 0px;
}
.myOrder .header-title {
  margin-right: 20px;
  font-weight: bold;
  padding-right: 10px;
}
.button-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
</style>
