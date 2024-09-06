<script setup lang="ts">
// import { getBannerAPI } from '@/apis/home'
import { onMounted, ref } from 'vue'
import { getImageUrl } from '@/utils/utils'

const banner_pictures = [
  {img:getImageUrl('banner/banner0.png')},
  {img:getImageUrl('banner/banner1.png')},
  {img:getImageUrl('banner/banner2.png')},
]


// const bannerList = ref([])

// const getBanner = async () => {
//   const res = await getBannerAPI()
//   console.log(res)
//   bannerList.value = res.result
// }

// onMounted(() => getBanner())
</script>

<!-- <template>
  <div class="home-banner">
    <el-carousel height="500px">
      <el-carousel-item v-for="item in bannerList" :key="item.id">
        <img :src="item.imgUrl" alt="">
      </el-carousel-item>
    </el-carousel>
  </div>
</template> -->

<template>
  <div class="home-banner">
    <el-carousel height="500px">
      <el-carousel-item v-for="item in 3" :key="item">
        <img :src="banner_pictures[item-1].img" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>


banner/banner0.png


<style scoped>
.home-banner {
  width: 1000px;
  height: 500px;
  /* position: absolute;
  left: 0;
  top: 0;*/
  z-index: 98;

  flex: 1;

  /* margin-left: -200px; */
  position: relative;

  img {
    width: 100%;
    height: 500px;
  }
}
</style>
