<!-- 退款 -->
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import OneRefund from './OneRefund.vue'
import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import 'element-plus/dist/index.css'

let isloading = ref(true)
let isempty=ref(false)

export type refundinformation = {
  refund_id: string
  seller_name: string
  seller_id: string
  buyer_name: string
  buyer_id: string
  commodity: string
  reason: string
  time: Date
}

let refundinformations = ref<refundinformation[]>([])

const deleteconfirm = (index: number) => {
  refundinformations.value.splice(index, 1)
  if(refundinformations.value.length==0){
        isempty.value=true;
  }
}

onMounted(async () => {
  try {
    const refundInfo = await axios.get('/api/refund/query')
    if (refundInfo.status === 200) {
      refundInfo.data.forEach((oneInfo: any) => {
        let one: refundinformation = {
          refund_id: oneInfo.refund_id,
          seller_name: oneInfo.seller_name,
          seller_id: oneInfo.seller_id,
          buyer_name: oneInfo.buyer_name,
          buyer_id: oneInfo.buyer_id,
          commodity: oneInfo.merchandise_name,
          reason: oneInfo.reason,
          time: new Date(oneInfo.time)
        }
        refundinformations.value.push(one)
      })
      isloading.value = false
      if(refundinformations.value.length==0){
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
      <div v-for="(item, index) in refundinformations" :key="item.refund_id" class="table" v-else>
        <OneRefund :onerefundinformation="item" :num="index" @delete="deleteconfirm" />
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
  width: 100%;
  background-color: rgb(255, 255, 255);
  margin-bottom: 10px; /* 调整这个数值来增加或减少间距 */
  padding: 10px; /* 可选：添加填充以让表格内容与边界有些距离 */
  border: 2px solid #a4a4a4b7;
  border-radius: 15px; /* 可选：为表格添加圆角 */
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
