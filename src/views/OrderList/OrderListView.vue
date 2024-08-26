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
        <span class="header-title" style="flex: 1">地址</span>
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
            <el-table-column prop="address" />
          </el-table>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
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
const tableData = ref(Array.from({ length: 20 }).fill(item))

const handleOrderClick = () => {
  console.log('点击我的订单')
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
</style>
