<!-- 投诉 -->
<script lang="ts" setup>
import type { complationinformation } from './ComplationSection.vue'
import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import 'element-plus/dist/index.css'

const props = defineProps({
  onecomplationinformation: {
    type: Object as () => complationinformation,
    default: null
  },
  num: {
    type: Number,
    default: 0
  }
})

const complation_id = props.onecomplationinformation.complation_id

const emit = defineEmits(['delete'])
const deleteconfirm = () => {
  emit('delete', props.num)
}

const deductpoint = async (point: number) => {
  try {
    const response = await axios.post('/api/complationAudit/audit', {
      complation_id: complation_id,
      is_passed: point > 0 ? true : false
    })
    if (response.status === 200) {
      deleteconfirm()
    } else {
      ElMessageBox({
        type: 'error',
        message: `数据获取失败`
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
  <div class="main">
    <div class="introduce">投诉商家：{{ onecomplationinformation.seller }}</div>
    <div class="introduce">投诉原因：{{ onecomplationinformation.reason }}</div>
    <div class="introduce">投诉人：{{ onecomplationinformation.complainant }}</div>
    <div class="introduce">投诉时间：{{ onecomplationinformation.time }}</div>
    <div class="introduce">信誉分：{{ onecomplationinformation.credibility }}</div>
    <div @click="deductpoint(0)" class="button">不扣分</div>
    <div @click="deductpoint(5)" class="button">扣除5分</div>
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
