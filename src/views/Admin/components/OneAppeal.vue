<!-- 申诉 -->
<script lang="ts" setup>
import type { appealinformation } from './AppealSection.vue'
import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import 'element-plus/dist/index.css'

const props = defineProps({
  oneappealinformation: {
    type: Object as () => appealinformation,
    default: null
  },
  num: {
    type: Number,
    default: 0
  }
})

const appeal_id = props.oneappealinformation.appeal_id

const emit = defineEmits(['delete'])
const deleteconfirm = () => {
  emit('delete', props.num)
}

const auditappeal = async (isagree: boolean) => {
  try {
    const response = await axios.post('/api/appeal/audit', {
      appeal_id: appeal_id,
      is_agreed: isagree
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
  <div class="main">
    <div class="introduce">申诉编号：{{ oneappealinformation.appeal_id }}</div>
    <div class="introduce">申诉人：{{ oneappealinformation.seller_name }}</div>
    <div class="introduce">申诉人ID：{{ oneappealinformation.seller_id }}</div>
    <div class="introduce">投诉人：{{ oneappealinformation.complainant_name }}</div>
    <div class="introduce">投诉人ID：{{ oneappealinformation.complainant_id }}</div>
    <div class="introduce">申诉原因：{{ oneappealinformation.reason }}</div>
    <div class="introduce">申诉时间：{{ oneappealinformation.time }}</div>
    <div class="introduce">信誉分：{{ oneappealinformation.credibility }}</div>
    <div @click="auditappeal(true)" class="button">同意申诉</div>
    <div @click="auditappeal(false)" class="button">拒绝申诉</div>
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
