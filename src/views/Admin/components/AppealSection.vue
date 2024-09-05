<!-- 申诉 -->
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import OneAppeal from './OneAppeal.vue'
import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import 'element-plus/dist/index.css'

let isloading = ref(true)
let isempty=ref(false)

export type appealinformation = {
  appeal_id: string
  seller_name: string
  seller_id: string
  complainant_name: string
  complainant_id: string
  credibility: number
  reason: string
  time: Date
}

let appealinformations = ref<appealinformation[]>([])


const deleteconfirm = (index: number) => {
  appealinformations.value.splice(index, 1)
  if(appealinformations.value.length==0){
        isempty.value=true;
  }
}

onMounted(async () => {
  try {
    const appealInfo = await axios.get('/api/appeal/query')
    if (appealInfo.status === 200) {
      appealInfo.data.forEach((oneInfo: any) => {
        let one: appealinformation = {
          appeal_id: oneInfo.appeal_id,
          seller_name: oneInfo.seller_name,
          seller_id: oneInfo.seller_id,
          complainant_name: oneInfo.complainant_name,
          complainant_id: oneInfo.complainant_id,
          credibility: oneInfo.credibility,
          reason: oneInfo.reason,
          time: new Date(oneInfo.time)
        }
        appealinformations.value.push(one)
      })
      isloading.value = false
      if(appealinformations.value.length==0){
        isempty.value=true;
      }
    } else {
      ElMessage({
        type: 'error',
        message: `数据获取失败`
      })
    }
  } catch (error) {
    console.log(error)
    ElMessage({
      type: 'error',
      message: `数据库连接失败`
    })
  }
})
</script>

<template>
  <div class="main">
    <div class="spinner" v-if="isloading"></div>
    <div class="list" v-else>
      <div class="empty" v-if="isempty">无</div>
      <div v-for="(item, index) in appealinformations" :key="item.appeal_id" class="table" v-else>
        <OneAppeal :oneappealinformation="item" :num="index" @delete="deleteconfirm" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.main {
  position: relative;
}
.list {
  max-height: 650px;
  overflow-y: auto;
}
.empty{
  margin-top: 100px;
  margin-left: 50%;
  font-size: 40px;
  font-weight: bold; 
}
.table {
  background-color: rgb(255, 255, 255);
  width: 100%;
}
.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid #3498db;
  width: 80px;
  height: 80px;
  animation: spin 1s linear infinite;
  position: absolute;
  top: 100px; /* 调整spinner与父元素顶部的距离 */
  left: 50%; /* 水平居中的一部分 */
  transform: translateX(-50%); /* 向左偏移自身宽度的50%，实现水平居中 */
}
</style>
