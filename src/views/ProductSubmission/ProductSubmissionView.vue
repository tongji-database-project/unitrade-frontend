<template>
  <div>
    <el-form
      :model="product"
      label-width="120px"
      @submit.native.prevent="handleSubmit"
    >
      <el-form-item
        label="商品名称"
        prop="name"
        :rules="[{ required: true, message: '请输入商品名称', trigger: 'blur' }]"
      >
        <el-input v-model="product.name"></el-input>
      </el-form-item>

      <el-form-item
        label="价格"
        prop="price"
        :rules="[{ required: true, validator: validatePrice, trigger: 'blur' }]"
      >
        <el-input v-model.number="product.price" type="number"></el-input>
      </el-form-item>

      <el-form-item
        label="库存数量"
        prop="stock"
        :rules="[{ required: true, message: '请输入库存数量', trigger: 'blur' }]"
      >
        <el-input-number v-model="product.stock" :min="0"></el-input-number>
      </el-form-item>

      <el-form-item
        label="商品描述"
        prop="description"
        :rules="[{ required: true, message: '请输入商品描述', trigger: 'blur' }]"
      >
        <el-input type="textarea" v-model="product.description"></el-input>
      </el-form-item>

      <el-form-item label="上传封面图片">
        <el-upload
          action="#"
          list-type="picture-card"
          :auto-upload="false"
          :on-remove="handleCoverRemove"
          :before-upload="beforeCoverUpload"
          :on-success="handleCoverUploadSuccess"
          :file-list="coverFileList"
        >
          <el-icon><Plus /></el-icon>
          <template #file="{ file }">
            <div>
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
              <span class="el-upload-list__item-actions">
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleCoverRemove(file)"
                >
                  <el-icon><Delete /></el-icon>
                </span>
              </span>
            </div>
          </template>
        </el-upload>
      </el-form-item>

      <el-form-item label="上传商品图片">
        <el-upload
          action="#"
          list-type="picture-card"
          :auto-upload="false"
          :on-remove="handleRemove"
          :before-upload="beforeUpload"
          :on-success="handleUploadSuccess"
          :file-list="fileList"
        >
          <el-icon><Plus /></el-icon>
          <template #file="{ file }">
            <div>
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
              <span class="el-upload-list__item-actions">
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <el-icon><Delete /></el-icon>
                </span>
              </span>
            </div>
          </template>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
        <el-button type="primary" @click="handleCancle">取消</el-button>
      </el-form-item>
    </el-form>
    <br />
    <br />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue'
import type { UploadFile } from 'element-plus'
import type { Product } from '@/utils/interfaces'
import {submitProduct} from '@/apis/product'

const route = useRoute()

//route.params.id



const product = ref<Product>({
  name: '',
  description: '',
  price: 0,
  stock: 0,
  imageUrls: [],
  coverUrl: ''
})

const router = useRouter()

const validatePrice = (rule: any, value: number, callback: (error?: Error) => void) => {
  if (value <= 0) {
    callback(new Error('价格必须为正数'))
  } else {
    callback()
  }
}

const handleSubmit = async () => {

  await submitProduct(product.value);
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

const fileList = ref<UploadFile[]>([])
const coverFileList = ref<UploadFile[]>([])
const disabled = ref(false)

//删除照片
const handleRemove = (file: UploadFile) => {
  const index = fileList.value.findIndex((f) => f.uid === file.uid)
  if (index > -1) {
    fileList.value.splice(index, 1)
    const urlIndex = product.value.imageUrls.indexOf(file.url as string)
    console.log('删除成功')
    if (urlIndex > -1) {
      product.value.imageUrls.splice(urlIndex, 1)
    }
  }
}

//上传照片前进行检查
const beforeUpload = (file: any) => {
  const isJPG = file.type === 'image/jpeg'
  const isPNG = file.type === 'image/png'
  const isLt500KB = file.size / 1024 < 500
  console.log('检查成功')
  if (!isJPG && !isPNG) {
    ElMessage.error('只能上传 JPG/PNG 格式的图片')
    return false
  }
  if (!isLt500KB) {
    ElMessage.error('图片大小不能超过 500KB')
    return false
  }
  return true
}

//上传照片成功后的回调函数
const handleUploadSuccess = (response: any, file: UploadFile) => {
  if (response && response.status === 200 && response.data.url) {
    product.value.imageUrls.push(response.data.url) // 将返回的图片链接保存到商品对象中
    file.url = response.data.url // 设置文件的url
    console.log('上传成功')
    // ElMessage.success('图片上传成功')
  } else {
    // ElMessage.error('图片上传失败')
  }
}

//删除封面图片
const handleCoverRemove = (file: UploadFile) => {
  coverFileList.value = []
  product.value.coverUrl = ''
  console.log('封面图片删除成功')
}

//上传封面图片前进行检查
const beforeCoverUpload = (file: any) => {
  const isJPG = file.type === 'image/jpeg'
  const isPNG = file.type === 'image/png'
  const isLt500KB = file.size / 1024 < 500
  console.log('封面图片检查成功')
  if (!isJPG && !isPNG) {
    ElMessage.error('只能上传 JPG/PNG 格式的图片')
    return false
  }
  if (!isLt500KB) {
    ElMessage.error('图片大小不能超过 500KB')
    return false
  }
  return true
}

//上传封面图片成功后的回调函数
const handleCoverUploadSuccess = (response: any, file: UploadFile) => {
  if (response && response.status === 200 && response.data.url) {
    product.value.coverUrl = response.data.url // 将返回的封面图片链接保存到商品对象中
    file.url = response.data.url // 设置文件的url
    coverFileList.value = [file] // 确保只有一个封面图片
    console.log('封面图片上传成功')
    // ElMessage.success('封面图片上传成功')
  } else {
    // ElMessage.error('封面图片上传失败')
  }
}
</script>

<style scoped>
.el-form-item {
  margin-bottom: 20px;
}
</style>
