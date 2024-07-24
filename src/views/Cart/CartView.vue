<template>
  <div>
    <el-table :data="cartItems" style="width: 100%">
      <el-table-column label="商品图片">
        <template #default="{ row }">
          <el-image style="width: 50px; height: 50px" :src="row.picture" fit="cover"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="merchandise_name" label="商品名称"></el-table-column>
      <el-table-column prop="price" label="单价"></el-table-column>
      <el-table-column label="数量">
        <template #default="{ row }">
          <el-input-number v-model="row.quantity" @change="() => updateQuantity(row)" :min="1"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button size="mini" @click="removeItem(row)">移除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="total-price">总价: {{ total }}</div>
    <el-button type="primary" @click="goToCheckout">结算</el-button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ElTable, ElTableColumn, ElInputNumber, ElButton, ElImage } from 'element-plus';

const cartItems = ref([]);

const fetchCartItems = async () => {
  // 假设 '/api/cart' 是获取购物车数据的API
  const response = await fetch('/api/cart');
  const data = await response.json();
  cartItems.value = data;
  calculateTotal();
};

const updateQuantity = async (item) => {
  // 更新数据库中的商品数量
  await fetch('/api/update-cart', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ merchandiseId: item.merchandise_id, quantity: item.quantity })
  });
  calculateTotal();
};

const removeItem = async (item) => {
  const index = cartItems.value.indexOf(item);
  cartItems.value.splice(index, 1);
  // 假设 '/api/remove-item' 是从购物车删除商品的API
  await fetch('/api/remove-item', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ merchandiseId: item.merchandise_id })
  });
  calculateTotal();
};

const total = ref(0);
const calculateTotal = () => {
  total.value = cartItems.value.reduce((acc, item) => acc + item.price * item.quantity, 0);
};

const goToCheckout = () => {
  router.push('/checkout').catch(err => {
    console.error('Failed to navigate:', err);
  });
};

onMounted(fetchCartItems);
</script>
