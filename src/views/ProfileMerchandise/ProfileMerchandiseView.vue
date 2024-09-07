<template>
  <div class="product-display">
    <h1 class="title">在售商品</h1>
    <div class="product-grid">
      <!-- 商品卡片展示 -->
      <div class="merchandise-card" v-for="(merchandise_id, id) in products" :key="`${id}`">
        <MerchandiseCard :merchandise_id="merchandise_id.id" />
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { ProductOnsale } from '@/utils/interfaces'
import { getSellerProducts } from '@/apis/product'
import { getImageUrl } from '@/utils/utils'
import { useRoute } from 'vue-router'
import MerchandiseCard from '@/components/MerchandiseCard.vue'

const route = useRoute()

onMounted(async () => {
  console.log(123)
  await fetchProducts()
})

const products = ref<ProductOnsale[]>([])

const fetchProducts = async () => {
  try {
    const response = await getSellerProducts(route.params.id as string)
    console.log(response)
    if (response.status === 200) {
      products.value = response.data.map((item: any) => ({
        id: item.id,
        name: item.name,
        description: item.product_details,
        price: item.price,
        stock: item.inventory,
        productType: item.type,
        cover: getImageUrl(item.cover_image_url),
        sales: item.sales
      }))
      console.log(products.value[0].id)
      console.log(products.value)
    }
  } catch (error) {
    console.error('Error fetching products:', error)
  }
}
</script>

<style scoped>
.product-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 20px;
  font-weight: bold;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); /* 设置列的最小和最大宽度 */
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  justify-items: center; /* 卡片水平居中对齐 */
  align-items: start; /* 卡片顶部对齐 */
  padding: 10px;
  box-sizing: border-box;
}

.merchandise-card {
  background-color: #fff;
  padding: 20px;
  border: 1px solid #ccc; /* 边框缩小，颜色更柔和 */
  border-radius: 8px;
  min-height: 300px; /* 确保卡片高度一致 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: border 0.3s ease;
}

.merchandise-card:hover {
  border: 1px solid #007bff; /* 鼠标悬停时的边框颜色 */
}
</style>
