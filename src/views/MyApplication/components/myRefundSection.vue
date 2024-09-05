<!-- 我的退款 -->
<script lang="ts" setup>
  import { ref, onMounted } from 'vue';  
  import { myrefund } from '@/apis/user';
  import OneMyRefund from './OneMyRefund.vue';
  import { ElMessage,ElMessageBox } from 'element-plus'
  import 'element-plus/dist/index.css';

  let isloading=ref(true);
  let isempty=ref(false)

  export type myrefundinformation={
    order_id:string;
    commodity:string;
    reason:string;
    time:Date;
    state:string;
  }

  let myrefundinformations = ref<myrefundinformation[]>([]);
  myrefundinformations.value.push({order_id:"1",commodity:"商品1",reason:"无",time:new Date('2023-03-21T14:30:00'),state:"未处理"});
  myrefundinformations.value.push({order_id:"2",commodity:"商品2",reason:"无",time:new Date('2023-03-21T14:30:00'),state:"未处理"});
  myrefundinformations.value.push({order_id:"3",commodity:"商品3",reason:"无",time:new Date('2023-03-21T14:30:00'),state:"未处理"});
  myrefundinformations.value.push({order_id:"4",commodity:"商品4",reason:"无",time:new Date('2023-03-21T14:30:00'),state:"未处理"});

  onMounted(async () => {  
    //加载数据过程
    try{
      const myrefundInfo = await myrefund();
      if(myrefundInfo.status===200){
        myrefundInfo.data.forEach((oneInfo:any) => {
          let onestate:string="";
          if(oneInfo.refund_state=="Pen"){
            onestate=="待审核";
          }else if(oneInfo.refund_state=="Agr"){
            onestate=="已通过";
          }else{
            onestate=="未通过";
          }
          let one:myrefundinformation={
            order_id:oneInfo.order_id,
            commodity:oneInfo.merchandise_name,
            reason:oneInfo.refund_reason,
            time:new Date(oneInfo.refund_time),
            state:onestate
          };
          myrefundinformations.value.push(one);
        });
        isloading.value=false;
        if(myrefundinformations.value.length==0){
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
      <div v-for="(item, index) in myrefundinformations" :key="index" class="table" v-else>
        <OneMyRefund :onemyrefundinformation="item" :num="index" />
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