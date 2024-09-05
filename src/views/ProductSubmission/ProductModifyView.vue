<template>
  <div>
    <el-form :model="product" label-width="120px" @submit.native.prevent="handleSubmit">
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
        label="商品类型"
        prop="productType"
        :rules="[{ required: true, message: '请输入商品类型', trigger: 'blur' }]"
      >
        <el-input v-model="product.productType"></el-input>
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
          :file-list="coverFileList"
          action="/api/seller/sendCover"
          list-type="picture-card"
          :on-remove="handleCoverRemove"
          :before-upload="beforeCoverUpload"
          :on-success="handleCoverUploadSuccess"
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
          action="/api/seller/sendDetails"
          list-type="picture-card"
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
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue'
import type { UploadFile } from 'element-plus'
import type { Product } from '@/utils/interfaces'
import { submitProduct } from '@/apis/product'
import { getImageUrl } from '@/utils/utils'
import { getModifyProduct } from '@/apis/product'

const route = useRoute()
//route.params.id

const product = ref<Product>({
  name: '',
  description: '',
  price: 0,
  stock: 1,
  productType: '',
  images: [],
  cover: ''
})

const router = useRouter()

const fileList = ref<UploadFile[]>([])
const coverFileList = ref<UploadFile[]>([])
const disabled = ref(false)

onMounted(async () => {
  console.log(route.params.id)
  try {
    const response = await getModifyProduct(route.params.id as string);
    console.log(response)
    if (response.status === 200) {
      product.value.name = response.data.name,
      product.value.description = response.data.product_details,
      product.value.price = response.data.price,
      product.value.stock = response.data.inventory,
      product.value.productType = response.data.type,
      product.value.cover = response.data.cover_image_url
      product.value.images = response.data.product_image_urls
      // 设置封面图片预览
      coverFileList.value = [
        {
          name: '封面图片',
          url: getImageUrl(response.data.cover_image_url),
          status: 'success'
        } as UploadFile
      ]
      // 设置商品详情图片预览
      fileList.value = response.data.product_image_urls.map((url: string) => ({
        name: '商品图片',
        url: getImageUrl(url),
        status: 'success'
      }) as UploadFile)
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }
})

const validatePrice = (rule: any, value: number, callback: (error?: Error) => void) => {
  if (value <= 0) {
    callback(new Error('价格必须为正数'))
  } else {
    callback()
  }
}

const handleSubmit = async () => {
  console.log(product.value);
  await submitProduct(product.value)
    .then((response) => {
      if (response.status === 200) {
        ElMessage.success(response.data.message || '商品发布成功')
        router.push('/onsale') // 发布成功后跳转到其他页面
        return response.data
      } else if (response.status === 400) {
        ElMessage({
          type: 'warning',
          message: `无法获取用户信息状态码：${response.status}`
        })
      }
    })
    .catch((error) => {
      ElMessage({
        type: 'warning',
        message: `无法获取,错误信息：${error}`
      })
    })
}

const handleCancle = async () => {
  router.push('onsale')
}


// 删除商品图片
const handleRemove = (file: UploadFile) => {
  const index = fileList.value.findIndex((f) => f.uid === file.uid)
  if (index > -1) {
    fileList.value.splice(index, 1)
    const urlIndex = product.value.images.indexOf(file.url as string)
    console.log('删除成功')
    console.log(urlIndex)
    console.log(file.url)
    console.log(product.value.images)

    product.value.images.splice(urlIndex, 1)
    // if (urlIndex > -1) {
    //   product.value.images.splice(urlIndex, 1)
    //   // console.log(product)
    // }
    console.log(product)
  }
}

/// 上传商品图片前进行检查
const beforeUpload = (file: any) => {
  const isJPG = file.type === 'image/jpeg'
  const isPNG = file.type === 'image/png'
  const isLt10MB = file.size / 1024 / 1024 < 10
  if (!isJPG && !isPNG) {
    ElMessage.error('只能上传 JPG/PNG 格式的图片')
    return false
  }
  if (!isLt10MB) {
    ElMessage.error('图片大小不能超过 500KB')
    return false
  }
  console.log('检查成功')
  return true
}

// 上传商品图片成功后的回调函数
const handleUploadSuccess = (response: any, file: UploadFile) => {
  if (response && response.url) {
    product.value.images.push(response.url) // 将返回的图片链接保存到商品对象中
    file.url = getImageUrl(response.url) // 设置文件的url
    fileList.value.push(file) // 将文件添加到文件列表中
    console.log('商品图片上传成功')
    ElMessage.success('商品图片上传成功')
  } else {
    console.log('商品图片上传失败')
    ElMessage.error('商品图片上传失败')
  }
}

//删除封面图片
const handleCoverRemove = (file: UploadFile) => {
  coverFileList.value = []
  product.value.cover = ''
  console.log('封面图片删除成功')
}

const beforeCoverUpload = (file: any) => {
  console.log('文件上传检查开始') // 在函数开始时记录日志
  const isJPG = file.type === 'image/jpeg'
  const isPNG = file.type === 'image/png'
  const isLt10MB = file.size / 1024 / 1024 < 10

  if (!isJPG && !isPNG) {
    ElMessage.error('只能上传 JPG/PNG 格式的图片')
    return false
  }
  if (!isLt10MB) {
    ElMessage.error('图片大小不能超过 500KB')
    return false
  }

  console.log('封面图片检查成功') // 确认检查是否通过
  return true
}

//上传封面图片成功后的回调函数
const handleCoverUploadSuccess = (response: any, file: UploadFile) => {
  console.log(response)
  if (response && response.url) {
    product.value.cover = response.url // 将返回的封面图片链接保存到商品对象中
    file.url = getImageUrl(response.url) // 设置文件的url
    coverFileList.value = [file] // 确保只有一个封面图片
    console.log(response.url)
    console.log('封面图片上传成功')
    ElMessage.success('封面图片上传成功')
  } else {
    console.log('封面图片上传失败')
    ElMessage.error('封面图片上传失败')
  }
}
</script>

<style scoped>
.el-form-item {
  margin-bottom: 20px;
}
</style>
