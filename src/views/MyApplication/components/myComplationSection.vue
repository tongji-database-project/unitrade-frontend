<!-- 我的投诉 -->
<script lang="ts" setup>
  import { ref, onMounted } from 'vue';  
  import { mycomplation } from '@/apis/user';
  import OneMyComplation from './OneMyComplation.vue';
  import { ElMessage,ElMessageBox } from 'element-plus'
  import 'element-plus/dist/index.css';

  let isloading=ref(true);
  let isempty=ref(false)

  export type mycomplationinformation={
    seller:string;
    reason:string;
    time:Date;
    state:string;
  }

  let mycomplationinformations = ref<mycomplationinformation[]>([]);
  
  onMounted(async () => {  
    //加载数据过程
    try{
      const mycomplationInfo = await mycomplation();
      if(mycomplationInfo.status===200){
        mycomplationInfo.data.forEach((oneInfo:any) => {
          let onestate:string="";
          if(oneInfo.complation_state=="Pen"){
            onestate="待审核";
          }else if(oneInfo.complation_state=="Agr"){
            onestate="已通过";
          }else{
            onestate="未通过";
          }
          let one:mycomplationinformation={
            seller:oneInfo.seller_name,
            reason:oneInfo.complation_reason,
            time:new Date(oneInfo.complation_time),
            state:onestate
          };
          mycomplationinformations.value.push(one);
        });
        isloading.value=false;
        if(mycomplationinformations.value.length==0){
          isempty.value=true;
        }
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
        message: `数据获取失败`
      })
    }
  });
</script>

<template>
  <div class="main">
    <div class="spinner" v-if="isloading"></div>
    <div class="list" v-else>
      <div class="empty" v-if="isempty">无</div>
      <div v-for="(item, index) in mycomplationinformations" :key="index" class="table" v-else>
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

  .empty{
    margin-top: 100px;
    margin-left: 50%;
    font-size: 40px;
    font-weight: bold; 
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