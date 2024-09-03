<template>
  <div class="checkout-container">
    <h1>结算</h1>
    <el-table :data="orderItems" style="width: 100%">
      <el-table-column prop="merchandise_name" label="商品名称"></el-table-column>
      <el-table-column prop="price" label="单价"></el-table-column>
      <el-table-column prop="quantity" label="数量"></el-table-column>
      <el-table-column label="小计">
        <template #default="{ row }">
          {{ (row.price * row.quantity).toFixed(2) }}
        </template>
      </el-table-column>
    </el-table>
    <div class="total-price">总价: {{ totalPrice.toFixed(2) }}</div>
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="地址">
        <el-input v-model="form.address" readonly></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="form.phone" readonly></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="confirmOrder">确认订单</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { ElTable, ElTableColumn, ElForm, ElFormItem, ElInput, ElButton } from 'element-plus';

const orderItems = ref([]);
const totalPrice = ref(0);
const form = ref({
  address: '',
  phone: ''
});
const router = useRouter();

const fetchOrderDetails = async () => {
  try {
    const response = await axios.get('/api/order-details');
    orderItems.value = response.data.items;
    totalPrice.value = orderItems.value.reduce((sum: number, item: { price: number, quantity: number }) => sum + item.price * item.quantity, 0);

    const customerDetails = await axios.get('/api/customer-details');
    form.value.address = customerDetails.data.address;
    form.value.phone = customerDetails.data.phone;
  } catch (error) {
    console.error('Failed to fetch order details:', error);
  }
};

const confirmOrder = async () => {
  try {
    const orderConfirmation = await axios.post('/api/confirm-order', {
      items: orderItems.value,
      total: totalPrice.value,
      address: form.value.address,
      phone: form.value.phone
    });
    if (orderConfirmation.status === 200) {
      router.push('/payment');
    }
  } catch (error) {
    console.error('Failed to confirm order:', error);
  }
};

onMounted(fetchOrderDetails);
</script>
