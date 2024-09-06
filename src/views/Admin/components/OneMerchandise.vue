<!-- 下架商品 -->
<script lang="ts" setup>
import type { merchandiseinformation } from './PullMerchandise.vue'
import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import 'element-plus/dist/index.css'

const props = defineProps({
  onemerchandiseinformation: {
    type: Object as () => merchandiseinformation,
    default: null
  },
  num: {
    type: Number,
    default: 0
  }
})

const merchandise_id = props.onemerchandiseinformation.id

const emit = defineEmits(['delete'])
const deleteconfirm = () => {
  emit('delete', props.num)
}

const pullmerchandise = async () => {
  try {
    const response = await axios.post('/api/merchandiseaudit/offshelf', {
        merchandise_id: merchandise_id
    })
    if (response.status === 200) {
      deleteconfirm()
    } else {
      ElMessageBox({
        type: 'error',
        message: `数据错误`
      })
    }
  } catch (error) {
    console.log(error)
    ElMessageBox({
      type: 'error',
      message: `数据库连接失败`
    })
  }
}
</script>

<template>
  <div calss="main">
    <div class="introduce">商品ID：{{ onemerchandiseinformation.id }}</div>
    <div class="introduce">商品名：{{ onemerchandiseinformation.name }}</div>
    <div class="introduce">商品类型：{{ onemerchandiseinformation.type }}</div>
    <div class="introduce">商品价格：{{ onemerchandiseinformation.price }}</div>
    <div class="introduce">商家：{{ onemerchandiseinformation.seller_name }}</div>
    <div class="introduce">商家信誉值：{{ onemerchandiseinformation.reputation }}</div>
    <div class="introduce">评价数量：{{ onemerchandiseinformation.comment_num }}</div>
    <div class="introduce">平均评分：{{ onemerchandiseinformation.average_score }}</div>
    <div @click="pullmerchandise" class="button">下架商品</div>
  </div>
</template>

<style scoped>
.main {
  height: auto;
  background-color: rgb(246, 246, 246);
  margin-bottom: 10px;
  border: 2px solid #a4a4a4b7;
  border-radius: 15px;
}

.introduce {
  font-weight: bold;
  font-size: 15px;
  margin-left: 5%;
  margin-top: 1.5%;
}

.button {
  width: 100px;
  height: 30px;
  border: 2px solid black;
  background-color: rgb(220, 253, 253);
  transition: transform 0.3s ease;
  text-align: center;
  margin-top: 1.5%;
  margin-left: 5%;
  display: inline-block;
  border-radius: 5px;
}

.button:hover {
  transform: scale(1.1);
}
</style>
