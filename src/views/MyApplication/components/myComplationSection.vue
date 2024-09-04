<!-- 我的投诉 -->
<script lang="ts" setup>
  import { ref, onMounted } from 'vue';  
  import axios from 'axios';
  import OneMyComplation from './OneMyComplation.vue';
  import { ElMessage,ElMessageBox } from 'element-plus'
  import 'element-plus/dist/index.css';

  let isloading=ref(true);

  export type mycomplationinformation={
    seller:string;
    reason:string;
    time:Date;
    state:string;
  }

  let mycomplationinformations = ref<mycomplationinformation[]>([]);
  mycomplationinformations.value.push({seller:"商家1",reason:"无",time:new Date('2023-03-21T14:30:00'),state:"未处理"});
  mycomplationinformations.value.push({seller:"商家2",reason:"无",time:new Date('2023-03-21T14:30:00'),state:"未处理"});
  mycomplationinformations.value.push({seller:"商家3",reason:"无",time:new Date('2023-03-21T14:30:00'),state:"未处理"});
  mycomplationinformations.value.push({seller:"商家4",reason:"无",time:new Date('2023-03-21T14:30:00'),state:"未处理"});

  onMounted(async () => {  
    //加载数据过程
    try{
      const mycomplationInfo = await axios.get('/api/mycomplation');
      if(mycomplationInfo.status===200){
        mycomplationInfo.data.forEach((oneInfo:any) => {
          let one:mycomplationinformation={
            seller:oneInfo.seller_name,
            reason:oneInfo.compaltion_reason,
            time:new Date(oneInfo.complation_time),
            state:oneInfo.complation_state
          };
          mycomplationinformations.value.push(one);
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
      isloading.value=false;
    }
  });
</script>

<template>
  <div class="main">
    <div class="spinner" v-if="isloading"></div>
    <div class="list" v-else>
      <div v-for="(item, index) in mycomplationinformations" :key="index" class="table">
        <OneMyComplation :onemycomplationinformation="item" :num="index" />
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