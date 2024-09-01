<template>
  <!-- TODO: 待完成 -->
  <h1>全部订单</h1>
  <el-container class="myOrder" style="height: 500px">
    <el-container>
      <el-header style="text-align: left; font-size: 15px">
        <span class="header-title" style="width: 135px">订单号</span>
        <span class="header-title" style="width: 140px">商品ID</span>
        <span class="header-title" style="width: 140px">商品名称</span>
        <span class="header-title" style="width: 110px">商品数量</span>
        <span class="header-title" style="width: 140px">订单状态</span>
        <span class="header-title" style="width: 200px">下单时间</span>
        <span class="header-title" style="width: 200px">收获时间</span>
        <span class="header-title" style="width: 180px">地址</span>
      </el-header>
      <el-main>
        <el-scrollbar>
          <el-table :data="tableData">
            <el-table-column prop="order_id" width="150" />
            <el-table-column prop="merchandise_id" width="150" />
            <el-table-column prop="name" width="190" />
            <el-table-column prop="order_quantity" width="120" />
            <el-table-column prop="state" width="150" />
            <el-table-column prop="order_time" width="220" />
            <el-table-column prop="receiving_time" width="220" />
<<<<<<< HEAD
            <el-table-column prop="address"/>
            <el-table-column width="150">
              <template #default="scope">
                <el-button size="small" type="primary" @click="handleOrderClick(scope.row.order_id)">订单详情</el-button>
                <el-button size="small" type="danger" @click="handleRefundClick(scope.row.order_id)">申请退款</el-button>
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
const item = {
  order_id: '123456',
  merchandise_id: '654321',
  name: '商品名称示例',
  order_quantity: 2,
  state: '已发货',
  order_time: '2023-07-12 14:30:00',
  receiving_time: '2023-07-15 10:00:00',
  address: 'No. 189, Grove St, Los Angeles'
}
const tableData = ref(Array.from({ length: 5 }).fill(item))

const handleOrderClick = (orderId: string) => {
  console.log('点击订单详情，订单号:', orderId)
  router.push(`/order-detail/${orderId}`)
}
const handleRefundClick = (orderId: string) => {
  console.log('点击申请退款，订单号:', orderId)
  router.push(`/refund/${orderId}`)
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
  padding-right: 10px; /* 添加右边距使其间距一致 */
}
.button-container {
  display: flex;
  justify-content: space-between; /* 确保按钮水平分布 */
  width: 100%; /* 确保容器宽度为100% */
}
</style>
