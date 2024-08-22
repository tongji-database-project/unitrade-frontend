<!-- 申诉 -->
<script lang="ts" setup>
  import type { appealinformation } from './AppealSection.vue';

  const props=defineProps({
    oneappealinformation:{
      type:Object as () => appealinformation,
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

  function appealjudge(isagree:boolean){
    deleteconfirm();
  }
</script>

<template>
  <div class="main">
    <div class="introduce">
      申诉人：{{ oneappealinformation.seller }}
    </div>
    <div class="introduce">
      申诉原因：{{ oneappealinformation.reason }}
    </div>
    <div class="introduce">
      投诉人：{{ oneappealinformation.complainant }}
    </div>
    <div class="introduce">
      申诉时间：{{ oneappealinformation.time }}
    </div>
    <div @click="appealjudge(true)" class="button">
      同意投诉
    </div>
    <div @click="appealjudge(false)" class="button">
      拒绝投诉
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