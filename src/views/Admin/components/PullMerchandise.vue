<!-- 商品下架 -->
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import OneMerchandise from './OneMerchandise.vue'
import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import 'element-plus/dist/index.css'

let isloading = ref(true)
let isempty=ref(false)

export type merchandiseinformation = {
  id: string
  name: string
  type:string
  price:number
  seller_name: string
  reputation:number
  comment_num:number
  average_score:number
}

let merchandiseinformations = ref<merchandiseinformation[]>([])

const deleteconfirm = (index: number) => {
  merchandiseinformations.value.splice(index, 1)
  if(merchandiseinformations.value.length==0){
        isempty.value=true;
  }
}

onMounted(async () => {
  try {
    const merchandiseInfo = await axios.get('/api/merchandiseaudit/query')
    if (merchandiseInfo.status === 200) {
        merchandiseInfo.data.forEach((oneInfo: any) => {
        let one: merchandiseinformation = {
          id: oneInfo.merchandise_id,
          name:oneInfo.merchandise_name,
          type:oneInfo.merchandise_type,
          price: oneInfo.merchandise_price,
          seller_name: oneInfo.seller_name,
          reputation:oneInfo.reputation,
          comment_num:oneInfo.commit_sum,
          average_score:oneInfo.average_point
        }
        merchandiseinformations.value.push(one)
      })
      isloading.value = false
      if(merchandiseinformations.value.length==0){
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
      <div v-for="(item, index) in merchandiseinformations" :key="item.id" class="table" v-else>
        <OneMerchandise :onemerchandiseinformation="item" :num="index" @delete="deleteconfirm" />
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
