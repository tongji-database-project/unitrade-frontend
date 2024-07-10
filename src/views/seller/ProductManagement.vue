<!-- src/views/ProductManagement.vue -->
<template>
    <div class="product-management">
      <h1>Product Management</h1>
      <el-button type="primary" @click="addProduct">Add Product</el-button>
      <el-table :data="products" style="width: 100%">
        <el-table-column prop="name" label="Product Name" width="180"></el-table-column>
        <el-table-column prop="price" label="Price" width="180"></el-table-column>
        <el-table-column label="Actions">
          <template v-slot="scope">
            <el-button @click="() => editProduct(scope.row)">Edit</el-button>
            <el-button type="danger" @click="() => deleteProduct(scope.row)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </template>
  
  <script setup lang="ts">
  import { reactive } from 'vue'
  
  interface Product {
    name: string
    price: number
  }
  
  const products = reactive<Product[]>([
    { name: 'Product 1', price: 100 },
    { name: 'Product 2', price: 200 }
  ])
  
  const addProduct = () => {
    console.log('Add product')
  }
  
  const editProduct = (product: Product) => {
    console.log('Edit product', product)
  }
  
  const deleteProduct = (product: Product) => {
    const index = products.indexOf(product)
    if (index > -1) {
      products.splice(index, 1)
    }
  }
  </script>
  
  <style scoped>
  .product-management {
    padding: 20px;
  }
  </style>
  