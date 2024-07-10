<!-- src/views/OrderManagement.vue -->
<template>
    <div class="order-management">
      <h1>Order Management</h1>
      <el-table :data="orders" style="width: 100%">
        <el-table-column prop="id" label="Order ID" width="180"></el-table-column>
        <el-table-column prop="customer" label="Customer" width="180"></el-table-column>
        <el-table-column prop="amount" label="Amount" width="180"></el-table-column>
        <el-table-column label="Actions">
          <template v-slot="scope">
            <el-button @click="() => viewOrder(scope.row)">View</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </template>
  
  <script setup lang="ts">
  import { reactive } from 'vue'
  
  interface Order {
    id: string
    customer: string
    amount: number
  }
  
  const orders = reactive<Order[]>([
    { id: '001', customer: 'Alice', amount: 300 },
    { id: '002', customer: 'Bob', amount: 450 }
  ])
  
  const viewOrder = (order: Order) => {
    console.log('View order', order)
  }
  </script>
  
  <style scoped>
  .order-management {
    padding: 20px;
  }
  </style>
  