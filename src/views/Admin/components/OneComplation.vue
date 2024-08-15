<!-- 投诉 -->
<script lang="ts" setup>
  import type { complationinformation } from './ComplationSection.vue';

  const props=defineProps({
    onecomplationinformation:{
      type:Object as () => complationinformation,
      default:null,
    },
    num:{
      type:Number,
      default:0,
    }
  })

  const emit = defineEmits(['delete'])
  const deleteconfirm = () => {
    emit('delete', props.num);
  }

  function deductpoint(point:number){
    deleteconfirm();
  }
</script>

<template>
  <div class="main">
    <div class="introduce">
      投诉商家：{{ onecomplationinformation.seller }}
    </div>
    <div class="introduce">
      投诉原因：{{ onecomplationinformation.reason }}
    </div>
    <div class="introduce">
      投诉人：{{ onecomplationinformation.complainant }}
    </div>
    <div class="introduce">
      投诉时间：{{ onecomplationinformation.time }}
    </div>
    <div class="introduce">
      信誉分：{{ onecomplationinformation.credibility }}
    </div>
    <div @click="deductpoint(0)" class="button">
      不扣分
    </div>
    <div @click="deductpoint(5)" class="button">
      扣除5分
    </div>
    <div @click="deductpoint(10)" class="button">
      扣除10分
    </div>
  </div>
</template>

<style scoped>
  .main{
    height: 250px; 
    background-color:rgb(246, 246, 246);
    margin-bottom: 10px;
    border: 2px solid #a4a4a4b7;
    border-radius: 15px;
  }

  .introduce{
    font-weight: bold;  
    font-size: 15px; 
    margin-left: 5%;
    margin-top: 1.5%;
  }

  .button{
    width: 100px;
    height: 30px;
    border: 1.5px solid rgb(100, 100, 100);
    background-color: #e9e9e9;;
    color: rgb(0, 0, 0);
    transition: transform 0.3s ease;
    text-align: center;  
    margin-top: 1.5%;
    margin-left: 5%;
    display: inline-block;
  }

  .button:hover{
    transform: scale(1.1);
  }
</style> 