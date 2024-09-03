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
      <el-button type="primary" @click="router.push('product-sub')" class="search-button">发布商品</el-button>
    </div>
    <div class="product-table-header">
      <div class="product-cover">封面</div>
      <div class="product-name">名称</div>
      <div
        class="product-price"
        :class="{ 'arrow-up': priceSortOrder === 'asc', 'arrow-down': priceSortOrder === 'desc' }"
        @click="sortProductsByPrice"
      >
        价格
      </div>
      <div class="product-stock">库存</div>
      <div class="product-sales">销量</div>
      <div class="product-description">描述</div>
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
const priceSortOrder = ref('')
const selectMethod = ref([])

const props = {
  expandTrigger: 'hover' as const
}

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
    value: 'price',
    label: '按价格排序',
    children: sortOrder
  },
  {
    value: 'price',
    label: '按价格排序',
    children: sortOrder
  },
  {
    value: 'price',
    label: '按价格排序',
    children: sortOrder
  },
  {
    value: 'price',
    label: '按价格排序',
    children: sortOrder
  }
]

const selectChange = (value: any[]) => {
  console.log(value)
}

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

const sortProductsByPrice = () => {
  if (priceSortOrder.value === 'asc') {
    priceSortOrder.value = 'desc'
    products.value.sort((a, b) => b.price - a.price)
  } else if (priceSortOrder.value === 'desc') {
    priceSortOrder.value = ''
    products.value.sort((a, b) => a.id.localeCompare(b.id)) // 重置为初始排序
  } else {
    priceSortOrder.value = 'asc'
    products.value.sort((a, b) => a.price - b.price)
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

.arrow-up::after {
  content: '▲';
  margin-left: 5px;
  color: #008b45;
}

.arrow-down::after {
  content: '▼';
  margin-left: 5px;
  color: #008b45;
}
</style>
