<!-- <template>
  <h1>商品上架页面（WIP）</h1>
  <div v-for="i in 30" :key="i" style="padding-top: 1rem;">
    填充内容，用于拉长页面长度
  </div>
</template> -->

<template>
  <div>
    <el-card v-for="product in products" :key="product.id" class="product-card">
      <div class="product-card-content">
        <img class="product-image" :src="product.imageUrl" alt="Product Image" />
        <div class="product-details">
          <div class="product-name">
            {{ product.name }}
          </div>
          <p class="product-detail">价格: {{ product.price }}</p>
          <p class="product-detail">库存: {{ product.stock }}</p>
          <p class="product-detail">描述: {{ product.description }}</p>
        </div>
        <div class="button-container">
          <el-button class="handle-button" type="primary" @click="handleModify">修改信息</el-button>
          <el-button class="handle-button" type="primary" @click="handleCancle">取消发布</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

interface Product {
  id: number
  name: string
  price: number
  stock: number
  description: string
  imageUrl: string
}

const products = ref<Product[]>([
  {
    id: 1,
    name: '铅笔',
    price: 100,
    stock: 50,
    description: '商品描述',
    imageUrl: 'http://47.97.215.255/img/avatar.jpg'
  },
  {
    id: 2,
    name: '橡皮',
    price: 150,
    stock: 30,
    description: '商品描述',
    imageUrl: 'http://47.97.215.255/img/avatar.jpg'
  }
  // 其他商品数据
])

const handleModify = async () => {
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

const handleCancle = async () => {
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
</script>

<style scoped>
.product-card {
  margin-bottom: 20px;
}
.product-card-content {
  display: flex;
  align-items: center;
}
.product-image {
  width: 150px;
  height: 150px;
  object-fit: cover;
  margin-left: 50px;
  margin-right: 50px;
}
.product-details {
  flex: 1;
}

.product-name {
  font-weight: bold;
  font-size: 30px;
  color: #008b45;
}

.product-detail {
  font-size: 15px;
  color: #008b45;
}

.button-container {
  
  flex-direction: column;
  margin-left: 20px;
}

.handle-button {
  margin-bottom: 10px; /* 按钮之间的间距 */
}
</style>
