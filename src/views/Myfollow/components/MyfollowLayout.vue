<script setup lang="ts">
import {ref,onMounted}from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getMyfollow } from '@/apis/user'
import OnefollowLayout from './OnefollowLayout.vue'
import 'element-plus/dist/index.css'
export type followinformation = {

  seller_name: string
  seller_avator: string
  time: Date
  seller_id:string
}

let followinformations = ref<followinformation[]>([])


let loading=ref(true)
let empty=ref(false)

const deleteconfirm = (index: number) => {
  followinformations.value.splice(index, 1)
  if(followinformations.value.length==0){
        empty.value=true;
  }
}
onMounted(async () => {
  try {
    const response = await getMyfollow()
    if(response.status===200){
        response.data.forEach((oneInfo:any) => {
          let one:followinformation={
            seller_name:oneInfo.seller_name,
            seller_id:oneInfo.seller_id,
            seller_avator:oneInfo.seller_avator,
            time:new Date(oneInfo.follow_time),
          };
          followinformations.value.push(one);
        });
        loading.value=false;
        if(followinformations.value.length==0){
          empty.value=true;
        }
      }
      else{
        ElMessage({
          type:"error",
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
    <div class="spinner" v-if="loading"></div>
    <div class="list" v-else>
      <div class="empty" v-if="empty">无</div>
      <div v-for="(item, index) in followinformations" :key="item.seller_id" class="table" v-else>
        <OnefollowLayout :onefollowinformation="item" :num="index"  @delete="deleteconfirm"/>
      </div>
    </div>
  </div>
</template>
<style>
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
