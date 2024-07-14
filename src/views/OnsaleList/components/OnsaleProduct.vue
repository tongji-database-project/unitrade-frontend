<template>
    <div class="product-card-content">
      <img class="product-image" :src="product_imageUrl" alt="Product Image" />
      <div class="product-details">
        <div class="product-name">
          {{ product_name }}
        </div>
        <div class="product-detail">{{ product_price }}</div>
        <div class="product-detail">{{ product_stock }}</div>
        <div class="product-detail">{{ product_sales }}</div>
        <div class="product-description">{{ product_description }}</div>
      </div>
      <div class="button-container">
        <el-button class="handle-button" type="primary" @click="handleModify">修改信息</el-button>
        <el-button class="handle-button" @click="handleCancle">取消发布</el-button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  const props = defineProps({
    product_id: { type: String, required: true },
    product_name: { type: String, required: true },
    product_price: { type: Number, required: true },
    product_stock: { type: Number, required: true },
    product_sales: { type: Number, required: true },
    product_description: { type: String, required: true },
    product_imageUrl: { type: String, required: true }
  })
  
  const emit = defineEmits(['cancled'])
  
  const handleModify = () => {
    router.push(`product-sub/${props.product_id}`)
  }
  
  const handleCancle = () => {
    emit('cancled', props.product_id)
  }
  </script>
  
  <style scoped>
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
    border-radius: 1rem;
  }
  .product-details {
    display: flex;
  }
  
  .product-name {
    margin: 80px;
    font-weight: bold;
    font-size: 30px;
  }
  
  .product-detail {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 80px;
    font-size: 15px;
  }

  .product-description {
    margin: 100px;
    font-size: 15px;
  }
  
  .button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    
    margin-left: 30px;
  }
  
  
  </style>
  