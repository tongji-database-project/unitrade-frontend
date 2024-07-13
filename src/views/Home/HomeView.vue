<script setup lang="ts">
import { getImageUrl } from '@/utils/utils';

const List = [
  { id:1, name: '杯子', price: '99.00' },
  { id:2, name: '衣服', price: 'Description for Image 2' },
  { id:3, name: 'Image 1', price: 'Description for Image 1' },
  { id:4, name: 'Image 1', price: 'Description for Image 1' },
  { id:5, name: 'Image 1', price: 'Description for Image 1' },
  { id:6, name: 'Image 1', price: 'Description for Image 1' },
  { id:7, name: 'Image 1', price: 'Description for Image 1' },
  { id:8, name: 'Image 1', price: 'Description for Image 1' },
  // Add more images as needed
];
</script>

<template>
  <HomePanel title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
    <el-row :gutter="20">
      <el-col :span="6" v-for="item in List" :key="item.id">
      <div class="goods-list">
          <RouterLink to="/merchandise/idtest">
            <img :src="getImageUrl('avatar.jpg')">
            <p class="name">{{ item.name }}</p>
            <p class="price">&yen;{{ item.price }}</p>
          </RouterLink>
        </div>
      </el-col>
    </el-row>   
  </HomePanel>
</template>


<style scoped>

.goods-list {
  display: flex;
  justify-content: space-between;
  width: 130px;
  height: 200px;

  li {
    width: 500px;
    height: 406px;

    background: #f0f9f4;
    transition: all .5s;

    &:hover {
      transform: translate3d(0, -3px, 0);
      box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
    }

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .price {
      color: #d12121;
    }
  }
}
</style>















<!-- <template>
  <h1>主页面（WIP）</h1>

  <div class="waterfall-container">
    <div class="waterfall">
    <el-row :gutter="20">
      <el-col
        :span="6"
        v-for="(item, index) in images"
        :key="index"
      >
        <el-card class="card">
          <img :src="getImageUrl()" class="card-img" alt="Image">
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
</style> -->
