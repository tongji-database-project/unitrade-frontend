<!-- <template>
  <h1>商品上架信息填写页面（WIP）</h1>
  <div v-for="i in 30" :key="i" style="padding-top: 1rem;">
    填充内容，用于拉长页面长度
  </div>
</template> -->

<!-- <template>
  <div>
    <h1>商品上架信息填写页面</h1>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">商品名称:</label>
        <input type="text" id="name" v-model="product.name" required>
      </div>

      <div class="form-group">
        <label for="description">商品描述:</label>
        <textarea id="description" v-model="product.description" required></textarea>
      </div>

      <div class="form-group">
        <label for="price">价格:</label>
        <input type="number" id="price" v-model.number="product.price" required>
      </div>

      <div class="form-group">
        <label for="stock">库存数量:</label>
        <input type="number" id="stock" v-model.number="product.stock" required>
      </div>

      <button type="submit">提交</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

interface Product {
  name: string;
  description: string;
  price: number;
  stock: number;
}

const product = ref<Product>({
  name: '',
  description: '',
  price: 0,
  stock: 0,
});

const router = useRouter();

const handleSubmit = async () => {
  router.push('/onsale');
  try {
    const response = await axios.post('/api/products', product.value);
    if (response.status === 200) {
      console.log('商品信息提交成功:', response.data);
    }
  } catch (error) {
    console.error('商品信息提交失败:', error);
  }
};
</script>

<style scoped>
.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

input, textarea {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
}

button {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style> -->


<template>
  <div>
    <el-form :model="product" ref="productForm" label-width="120px" @submit.native.prevent="handleSubmit">
      <el-form-item label="商品名称" prop="name" :rules="[{ required: true, message: '请输入商品名称', trigger: 'blur' }]">
        <el-input v-model="product.name"></el-input>
      </el-form-item>

      <el-form-item label="价格" prop="price" :rules="[{ required: true, validator: validatePrice, trigger: 'blur' }]">
        <el-input v-model.number="product.price" type="number"></el-input>
      </el-form-item>

      <el-form-item label="库存数量" prop="stock" :rules="[{ required: true, message: '请输入库存数量', trigger: 'blur' }]">
        <el-input-number v-model="product.stock" :min="0"></el-input-number>
      </el-form-item>

      <el-form-item label="商品描述" prop="description" :rules="[{ required: true, message: '请输入商品描述', trigger: 'blur' }]">
        <el-input type="textarea" v-model="product.description"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { ElMessage } from 'element-plus';

interface Product {
  name: string;
  description: string;
  price: number;
  stock: number;
}

const product = ref<Product>({
  name: '',
  description: '',
  price: 0,
  stock: 0,
});

const productForm = ref(null);
const router = useRouter();

const validatePrice = (rule: any, value: number, callback: (error?: Error) => void) => {
  if (value <= 0) {
    callback(new Error('价格必须为正数'));
  } else {
    callback();
  }
};

const handleSubmit = async () => {
  if (!productForm.value) return;


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

  router.push("onsale");

}
</script>

<style scoped>
.el-form-item {
  margin-bottom: 20px;
}
</style>
