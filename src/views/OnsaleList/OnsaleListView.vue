//TODO:销量、发布时间、价格、类型、鼠标移到封面显示图片、鼠标悬停效果（边框变色）、双边框
<template>
  <div>
    <div class="onsale-list-header">
      <el-input v-model="searchQuery" placeholder="搜索商品..." class="search-input"></el-input>
      <el-button type="primary" @click="searchProducts" class="search-button">搜索</el-button>
      <el-cascader
        v-model="selectMethod"
        :options="selectOptions"
        :props="props"
        @change="selectChange"
        class="select-sort"
      />
      <el-button type="primary" @click="router.push('product-sub')" class="search-button"
        >发布商品</el-button
      >
    </div>
    <div class="product-table-header">
      <div class="product-cover">封面</div>
      <div class="product-name">名称</div>
      <div class="product-price">价格</div>
      <div class="product-stock">类型</div>
      <div class="product-stock">库存</div>
      <div class="product-sales">销量</div>
      <div class="product-description">描述</div>
    </div>
    <el-card v-for="product in products" :key="product.id" class="product-card">
      <OnsaleProduct
        :product_id="product.id"
        :product_name="product.name"
        :product_price="product.price"
        :product_type="product.productType"
        :product_stock="product.stock"
        :product_sales="product.sales"
        :product_description="product.description"
        :product_imageUrl="product.cover"
        @cancled="handleCancle"
      />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref , onMounted } from 'vue'
import { useRouter } from 'vue-router'
import OnsaleProduct from './components/OnsaleProduct.vue'
import type { ProductOnsale } from '@/utils/interfaces'
import { getUserProducts } from '@/apis/product'
import { getImageUrl } from '@/utils/utils'
import { seekUserProducts } from '@/apis/product'

const router = useRouter()
const priceSortOrder = ref('')
const selectMethod = ref([])

const props = {
  expandTrigger: 'hover' as const
}

const searchQuery = ref('')

const products = ref<ProductOnsale[]>([])

onMounted(async () => {
  await fetchProducts();
})

const fetchProducts = async () => {
  try {
    const response = await getUserProducts();
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
        sales: item.sales,
      }));
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};


const sortOrder = [
  {
    value: 'desc',
    label: '降序'
  },
  {
    value: 'asc',
    label: '升序'
  }
]

const selectOptions = [
  {
  value: 'sortDefault',
    label: '默认排序',
  },
  {
    value: 'price',
    label: '按价格排序',
    children: sortOrder
  },
  {
    value: 'stock',
    label: '按库存排序',
    children: sortOrder
  },
  {
    value: 'sales',
    label: '按销量排序',
    children: sortOrder
  },
]

const selectChange = (value: any[]) => {
  if (value[0] === 'sortDefault'){
    sortProductsByDefaultOrder();
  }else if (value[0] === 'price') {
    sortProductsByPrice();
  } else if (value[0] === 'stock') {
    console.log("库存")
    sortProductsByStock();
  } else if (value[0] === 'sales') {
    console.log("销量")
    sortProductsBySales();
  }
}

const handleCancle = async (id: string) => {
  products.value = products.value.filter(product => product.id !== id)
}

const searchProducts = async () => {
  console.log(searchQuery.value)
  try {
    const response = await seekUserProducts(searchQuery.value);
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
        sales: item.sales,
      }));
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

const sortProductsByDefaultOrder = async () => {
  try {
    const response = await getUserProducts();
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
        sales: item.sales,
      }));
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

const sortProductsByPrice = () => {
  if (priceSortOrder.value === 'asc') {
    priceSortOrder.value = 'desc';
    products.value.sort((a, b) => b.price - a.price);
  } else {
    priceSortOrder.value = 'asc';
    products.value.sort((a, b) => a.price - b.price);
  }
}

const sortProductsByStock = () => {
  if (priceSortOrder.value === 'asc') {
    priceSortOrder.value = 'desc';
    products.value.sort((a, b) => b.stock - a.stock);
  } else {
    priceSortOrder.value = 'asc';
    products.value.sort((a, b) => a.stock - b.stock);
  }
}

const sortProductsBySales = () => {
  if (priceSortOrder.value === 'asc') {
    priceSortOrder.value = 'desc';
    products.value.sort((a, b) => b.sales - a.sales);
  } else {
    priceSortOrder.value = 'asc';
    products.value.sort((a, b) => a.sales - b.sales);
  }
}
</script>

<style scoped>
.product-table-header {
  display: flex;
  margin-bottom: 10px;
  padding: 10px;
  background-color: #f5f5f5;
}
.product-card {
  margin-bottom: 20px;
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

.product-cover {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 122px;
  margin-right: 122px;
  font-size: 18px;
}

.product-name {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 83px;
  margin-right: 83px;
  font-size: 18px;
}

.product-price {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 92px;
  margin-right: 92px;
  font-size: 18px;
}

.product-stock {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 55px;
  margin-right: 55px;
  font-size: 18px;
}

.product-sales {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 84px;
  margin-right: 84px;
  font-size: 18px;
}

.product-description {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
  font-size: 18px;
}

</style>
