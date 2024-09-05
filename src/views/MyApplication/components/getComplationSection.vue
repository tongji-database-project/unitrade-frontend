<!-- 对我的投诉 -->
<script lang="ts" setup>
  import { ref, onMounted } from 'vue';  
  import { getcomplation } from '@/apis/user' 
  import OneComplation from './OneComplationToMe.vue';
  import { ElMessage,ElMessageBox } from 'element-plus'
  import 'element-plus/dist/index.css';

  let isloading=ref(true);
  let isempty=ref(false)

  export type getcomplationinformation={
    complation_id:string;
    complainant:string;
    reason:string;
    time:Date;
    have_appealed:boolean;
  }

  let getcomplationinformations = ref<getcomplationinformation[]>([]);
  getcomplationinformations.value.push({complation_id:"1",complainant:"用户1",reason:"无",time:new Date('2023-03-21T14:30:00'),have_appealed:true});
  getcomplationinformations.value.push({complation_id:"2",complainant:"用户2",reason:"无",time:new Date('2023-03-21T14:30:00'),have_appealed:false});
  getcomplationinformations.value.push({complation_id:"3",complainant:"用户3",reason:"无",time:new Date('2023-03-21T14:30:00'),have_appealed:false});
  getcomplationinformations.value.push({complation_id:"4",complainant:"用户4",reason:"无",time:new Date('2023-03-21T14:30:00'),have_appealed:false});

  onMounted(async () => {  
    try{
      const getcomplationInfo = await getcomplation();
      if(getcomplationInfo.status===200){
        getcomplationInfo.data.forEach((oneInfo:any) => {
          let one:getcomplationinformation={
            complation_id:oneInfo.complation_id,
            complainant:oneInfo.user_name,
            reason:oneInfo.complation_reason,
            time:new Date(oneInfo.complation_time),
            have_appealed:oneInfo.have_appealed
          };
          getcomplationinformations.value.push(one);
        });
        isloading.value=false;
        if(getcomplationinformations.value.length==0){
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
        message: `数据库连接失败`
      })
    }
  });
</script>

<template>
  <div class="main">
    <div class="spinner" v-if="isloading"></div>
    <div class="list" v-else>
      <div class="empty" v-if="isempty">无</div>
      <div v-for="(item, index) in getcomplationinformations" :key="index" class="table" v-else>
        <OneComplation :onecomplationinformation="item" :num="index" />
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