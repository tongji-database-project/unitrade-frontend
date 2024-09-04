<!-- 投诉 -->
<script lang="ts" setup>
  import { ref, onMounted } from 'vue';  
  import axios from 'axios';
  import OneComplation from './OneComplation.vue';
  import { ElMessage,ElMessageBox } from 'element-plus'
  import 'element-plus/dist/index.css';

  let isloading=ref(true);

  export type complationinformation={
    complation_id:string;
    seller:string;
    credibility:number;
    reason:string;
    complainant:string;
    time:Date;
  }

  let complationinformations = ref<complationinformation[]>([]);
  complationinformations.value.push({complation_id:'1',seller:"商家1",credibility:100,reason:"无",complainant:"用户1",time:new Date('2023-03-21T14:30:00')});
  complationinformations.value.push({complation_id:'1',seller:"商家2",credibility:100,reason:"无",complainant:"用户2",time:new Date('2024-03-21T14:30:00')});
  complationinformations.value.push({complation_id:'1',seller:"商家3",credibility:100,reason:"无",complainant:"用户3",time:new Date('2025-03-21T14:30:00')});
  complationinformations.value.push({complation_id:'1',seller:"商家4",credibility:100,reason:"无",complainant:"用户4",time:new Date('2026-03-21T14:30:00')});

  const deleteconfirm = (index:number) => {
    complationinformations.value.splice(index,1);
  }

  onMounted(async () => {  
    //加载数据过程
    try{
      const complationInfo = await axios.get('/api/complationAudit/getInfo');
      if(complationInfo.status===200){
        complationInfo.data.forEach((oneInfo:any) => {
          let one:complationinformation={
            complation_id:oneInfo.complation_id,
            seller:oneInfo.seller_name,
            credibility:oneInfo.reputation,
            reason:oneInfo.compaltion_reason,
            complainant:oneInfo.customer_name,
            time:new Date(oneInfo.complation_time)
          };
          complationinformations.value.push(one);
        });
        isloading.value=false;
      }
      else{
        ElMessage({
          type:"error",
          message: `数据获取失败`
        })
      }
    } catch (error) {
      console.log(error);
      ElMessage({
        type:"error",
        message: `数据库连接失败`
      })
    }
  });
</script>

<template>
  <div class="main">
    <div class="spinner" v-if="isloading"></div>
    <div class="list" v-else>
      <div v-for="(item, index) in complationinformations" :key="index" class="table">
        <OneComplation :onecomplationinformation="item" :num="index" @delete="deleteconfirm"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .main{
    position: relative;
  }

  .list{
    max-height: 650px;
    overflow-y: auto;
  }

  .table{
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