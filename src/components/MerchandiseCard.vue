<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, reactive, onMounted } from 'vue'
import { getImageUrl } from '@/utils/utils'
import {getMerchandiseCardAPI} from '@/apis/home'

const props = defineProps({
  merchandise_id: { type: String, required: true }
})

const data = reactive({})

const router = useRouter()

// 根据 merchandise_id 去数据库中调取商品元信息
const cover = ref<string>()
const name = ref<string>()
const price = ref<number>()

// const info_list = [
//   { id: '1', name: '杯子', price: 99.0 },
//   { id: '2', name: '衣服', price: 99.0 },
//   { id: '3', name: 'Image 1', price: 99.0 },
//   { id: '4', name: 'Image 1', price: 99.0 },
//   { id: '5', name: 'Image 1', price: 99.0 },
//   { id: '6', name: 'Image 1', price: 99.0 },
//   { id: '7', name: 'Image 1', price: 99.0 },
//   { id: '8', name: 'Image 1', price: 99.0 }
//   // Add more images as needed
// ]

const loadInfo = async () => {
  const info= await getMerchandiseCardAPI(props.merchandise_id)
  console.log(info)
  cover.value = getImageUrl(info.image)
  name.value = info.name
  price.value = info.price/100

}

onMounted(() => {
  // 调取数据的代码
  loadInfo()

  // cover.value = getImageUrl('cola.jpg')
  // info_list.forEach((item) => {
  //   if (item.id === props.merchandise_id) {
  //     name.value = item.name
  //     price.value = item.price
  //   }
  // })
})
</script>

<template>
  <!-- <div class="flex-col justify-start items-start page" @click="router.push('/merchandise/234234')"> -->
  <div class="merchandise-card-item" @click="router.push(`/merchandise/${props.merchandise_id}`)">
    <div class="merchandise-card-image">
      <el-image class="merchandise-card-cover" :src="cover" fit="cover" />
    </div>
    <div class="merchandise-card-name">{{ name }}</div>
    <div class="merchandise-card-info">
      <span class="merchandise-card-price">￥{{ price?.toFixed(2) }}</span>
      <span class="merchandise-card-sales">已售 1,000</span>
    </div>
  </div>
</template>

<style scoped>
.merchandise-card-item {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  background-color: #f7f7f7;
  border: solid 1px rgb(223, 223, 223);
  border-radius: 0.3rem;
  padding: 0.4rem;

  width: 175px;
  height: 220px;


  overflow: hidden; /* 隐藏溢出内容 */
  white-space: nowrap; /* 不允许换行 */
  text-overflow: ellipsis; /* 溢出部分显示省略号 */

  &:hover {
        background: #b4f0ce;
      }
}

.merchandise-card-cover {
  width: 160px;
  height: 120px;
  border-radius: 0.3rem;
}

.merchandise-card-name {
  font-size: large;
}

.merchandise-card-info {
  margin-top: 0.3rem;

  .merchandise-card-price {
    font-size: x-large;
    color: #d41919;
  }

  .merchandise-card-sales {
    margin-left: 0.4rem;
  }
}
</style>
