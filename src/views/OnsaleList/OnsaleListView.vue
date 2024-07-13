//TODO:销量、发布时间、价格、类型、鼠标移到封面显示图片、鼠标悬停效果（边框变色）、双边框
<template>
  <div>
    <div class="onsale-list-header">
      <el-input v-model="searchQuery" placeholder="搜索商品..." class="search-input"></el-input>
      <el-button type="primary" @click="searchProducts" class="search-button">搜索</el-button>
    </div>
    <div class="product-table-header">
      <div class="product-cover">封面</div>
      <div class="product-name">名称</div>
      <div class="product-detail">价格</div>
      <div class="product-detail">库存</div>
      <div class="product-detail">销量</div>
      <div class="product-detail">描述</div>
    </div>
    <el-card v-for="product in products" :key="product.id" class="product-card">
      <OnsaleProduct
        :product_id="product.id"
        :product_name="product.name"
        :product_price="product.price"
        :product_stock="product.stock"
        :product_sales="product.sales"
        :product_description="product.description"
        :product_imageUrl="product.imageUrl"
        @cancled="handleCancle"
      />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import OnsaleProduct from './components/OnsaleProduct.vue'

const router = useRouter()

interface Product {
  id: string
  name: string
  price: number
  stock: number
  sales: number
  description: string
  imageUrl: string
}

const searchQuery = ref('')

const products = ref<Product[]>([
  {
    id: '123',
    name: '铅笔',
    price: 100,
    stock: 50,
    sales: 20,
    description: '商品描述',
    imageUrl: 'http://47.97.215.255/img/avatar.jpg'
  },
  {
    id: '124',
    name: '橡皮',
    price: 150,
    stock: 30,
    sales: 2,
    description: '商品描述',
    imageUrl: 'http://47.97.215.255/img/avatar.jpg'
  }
  // 其他商品数据
])

const handleCancle = async (id: string) => {
  // await axios
  // .get(`/api/test`)
  // .then(response => {
  //   if (response.status === 200) {
  //     infos.value = response.data;
  //   }
  // })
  // .catch(function (error) {
  //   console.log(error);
  // });

  router.push('onsale')
}

const searchProducts = async () => {}
</script>

<style scoped>
.product-table-header {
  display: flex;
}
.product-card {
  margin-bottom: 20px;
}
.product-card-content {
  display: flex;
  align-items: center;
}

.search-input {
  width: 300px;
  margin-bottom: 10px;
}

.search-button {
  margin-left: 10px;
}

.onsale-list-header {
  display: flex;
}
</style>
