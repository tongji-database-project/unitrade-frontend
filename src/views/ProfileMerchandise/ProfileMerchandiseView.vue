<template>
  <div class="product-display">
    <h1 class="title">在售商品</h1>
    <div class="product-grid">
      <!-- 商品卡片将会展示在这里 -->
      <div class="merchandise-card" v-for="(merchandise_id, id) in products" :key="`${id}`">
        <MerchandiseCard :merchandise_id = "merchandise_id.id" />
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
import { seekUserProducts } from '@/apis/product'
import { id } from 'element-plus/es/locales.mjs'
import { useRouter, useRoute } from 'vue-router'
import MerchandiseCard from '@/components/MerchandiseCard.vue'
// export default {
//   name: "ProductDisplay",
// };

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
  /*display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  justify-items: center;
  align-items: center;*/
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: flex-start;
  padding: 10px;
  box-sizing: border-box;
}

.product-grid::before {
  content: " ";
  display: block;
  padding-top: 10px;
}
</style>
