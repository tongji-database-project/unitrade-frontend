<template>
  <div>
    <h1>购物车</h1>
    <el-table :data="cartItems" style="width: 100%" v-loading="loading">
      <el-table-column label="商品图片">
        <template #default="{ row }">
          <el-image style="width: 50px; height: 50px" :src="row.picture" fit="cover"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="merchandise_name" label="商品名称"></el-table-column>
      <el-table-column prop="price" label="单价"></el-table-column>
      <el-table-column label="数量">
        <template #default="{ row }">
          <el-input-number
            v-model="row.quantity"
            @change="() => updateQuantity(row)"
            :min="1"
          ></el-input-number>
        </template>
      </el-table-column>
      <el-table-column label="小计">
        <template #default="{ row }">
          {{ (row.price * row.quantity).toFixed(2) }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button size="mini" @click="removeItem(row)">移除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="total-price">总价: {{ total.toFixed(2) }}</div>
    <el-button type="primary" @click="goToCheckout">结算</el-button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios'; // 直接导入axios
import { ElTable, ElTableColumn, ElInputNumber, ElButton, ElImage } from 'element-plus';

const cartItems = ref([]);
const total = ref(0);
const loading = ref(false);

const fetchCartItems = async () => {
  loading.value = true;
  try {
    const { data } = await axios.get('/api/cart');
    cartItems.value = data;
    calculateTotal();
  } catch (error) {
    console.error('Failed to fetch cart items:', error);
  } finally {
    loading.value = false;
  }
};

const updateQuantity = async (item) => {
  try {
    await axios.post(`/api/update-cart`, { merchandiseId: item.merchandise_id, quantity: item.quantity });
    calculateTotal();
  } catch (error) {
    console.error('Failed to update item quantity:', error);
  }
};

const removeItem = async (item) => {
  try {
    const index = cartItems.value.indexOf(item);
    if (index !== -1) {
      cartItems.value.splice(index, 1);
      await axios.post(`/api/remove-item`, { merchandiseId: item.merchandise_id });
      calculateTotal();
    }
  } catch (error) {
    console.error('Failed to remove item:', error);
  }
};

const calculateTotal = () => {
  total.value = cartItems.value.reduce((acc, item) => acc + item.price * item.quantity, 0);
};

const router = useRouter();
const goToCheckout = () => {
  router.push('/checkout').catch(err => {
    console.error('Failed to navigate:', err);
  });
};

onMounted(fetchCartItems);
</script>
