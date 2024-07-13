<script setup lang="ts">
import { getImageUrl } from '@/utils/utils';

const images = [
  { url: 'image1.jpg', title: 'Image 1', description: 'Description for Image 1' },
  { url: 'image2.jpg', title: 'Image 2', description: 'Description for Image 2' },
  { url: 'image1.jpg', title: 'Image 1', description: 'Description for Image 1' },
  { url: 'image1.jpg', title: 'Image 1', description: 'Description for Image 1' },
  { url: 'image1.jpg', title: 'Image 1', description: 'Description for Image 1' },
  { url: 'image1.jpg', title: 'Image 1', description: 'Description for Image 1' },
  { url: 'image1.jpg', title: 'Image 1', description: 'Description for Image 1' },
  { url: 'image1.jpg', title: 'Image 1', description: 'Description for Image 1' },
  // Add more images as needed
];
</script>

<template>
  <!-- TODO: 待完成 -->
  <h1>主页面（WIP）</h1>
  <!-- <div v-for="i in 30" :key="i" style="padding-top: 1rem;">
    填充内容，用于拉长页面长度
  </div> -->

  <div class="waterfall-container">
    <div class="waterfall">
    <el-row :gutter="20">
      <el-col
        :span="6"
        v-for="(item, index) in images"
        :key="index"
      >
        <el-card class="card">
          <img :src="getImageUrl(item.url)" class="card-img" alt="Image">
          <div class="text">
            <span>{{ item.title }}</span>
            <p>{{ item.description }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    </div>
  </div>
</template>

<style scoped>
.waterfall-container {
  padding: 20px;
}

.card-item {
  margin-bottom: 20px;
}

.card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

.card-title {
  font-size: 16px;
  font-weight: bold;
}

.card-description {
  font-size: 14px;
  color: #666;
}
</style>
