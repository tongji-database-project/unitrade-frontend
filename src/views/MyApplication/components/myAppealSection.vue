<!-- 我的申诉 -->
<script lang="ts" setup>
  import { ref, onMounted } from 'vue';  
  import { myappeal } from '@/apis/user';
  import OneMyAppeal from './OneMyAppeal.vue';
  import { ElMessage,ElMessageBox } from 'element-plus'
  import 'element-plus/dist/index.css';

  let isloading=ref(true);
  let isempty=ref(false)

  export type myappealinformation={
    complainant_name:string;
    complation_reason:string;
    appeal_reason:string;
    time:Date;
    state:string;
  }

  let myappealinformations = ref<myappealinformation[]>([]);
  myappealinformations.value.push({complainant_name:"用户1",complation_reason:"无",appeal_reason:"无",time:new Date('2023-03-21T14:30:00'),state:"未处理"});
  myappealinformations.value.push({complainant_name:"用户2",complation_reason:"无",appeal_reason:"无",time:new Date('2023-03-21T14:30:00'),state:"未处理"});
  myappealinformations.value.push({complainant_name:"用户3",complation_reason:"无",appeal_reason:"无",time:new Date('2023-03-21T14:30:00'),state:"未处理"});
  myappealinformations.value.push({complainant_name:"用户4",complation_reason:"无",appeal_reason:"无",time:new Date('2023-03-21T14:30:00'),state:"未处理"});

  onMounted(async () => {  
    //加载数据过程
    try{
      const myappealInfo = await myappeal();
      if(myappealInfo.status===200){
        myappealInfo.data.forEach((oneInfo:any) => {
          let onestate:string="";
          if(oneInfo.appeal_state=="Pen"){
            onestate="待审核";
          }else if(oneInfo.appeal_state=="Agr"){
            onestate="已通过";
          }else{
            onestate="未通过";
          }
          let one:myappealinformation={
            complainant_name:oneInfo.user_name,
            complation_reason:oneInfo.complation_reason,
            appeal_reason:oneInfo.appeal_reason,
            time:new Date(oneInfo.appeal_time),
            state:onestate
          };
          myappealinformations.value.push(one);
        });
        isloading.value=false;
        if(myappealinformations.value.length==0){
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
      <div v-for="(item, index) in myappealinformations" :key="index" class="table" v-else>
        <OneMyAppeal :onemyappealinformation="item" :num="index" />
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