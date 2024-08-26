<script setup lang="ts">
import MerchandiseCard from '@/components/MerchandiseCard.vue'
import { ref } from 'vue'
const merchandise_list = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '1'
  // Add more images as needed
]

const input = ref('')
</script>

<template>
  <div class="home-page">
    <div class="home-header">
      <div class="logo">
        <el-image class="logo-image" src="http://47.97.215.255/img/avatar.jpg" fit="cover" />
      </div>
      <div class="input-box">
        <el-input v-model="input" placeholder="请输入商品">
          <template #append>搜素</template>ss
        </el-input>
      </div>
    </div>
    <div class="home-body">
      <div class="merchandise-card" v-for="id in merchandise_list" :key="id">
        <MerchandiseCard :merchandise_id="id" />
      </div>
    </div>
  </div>
</template>

<!-- <template>
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
</template> -->

<style scoped>
.home-page {
  display: flex;
  padding: 0 3rem;
  flex-direction: column;
}

.home-body {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: flex-start;
  padding: 10px;
  box-sizing: border-box;
}

.home-header {
  display: flex;
  flex-direction: row;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}

.logo {
  width: 50px;
  height: 50px;
}

.input-box {
  width: 500px;
  margin: 0 auto; /* 水平居中 */
}

.goods-list {
  display: flex;
  justify-content: space-between;
  width: 130px;
  height: 200px;

  /* li {
    width: 500px;
    height: 406px;

    background: #f0f9f4;
    transition: all 0.5s;

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
  } */
}
</style>
