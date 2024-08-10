<!-- 推送 -->
<script lang="ts" setup>
  const props=defineProps({
    introduce:{
      type:String,
      default:"",
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
</script>

<template>
  <div class="main">
    <div class="introduce">
      {{ introduce }}
    </div>
    <div @click="deleteconfirm" class="button">
      同意推送
    </div>
    <div @click="deleteconfirm" class="button">
      拒绝推送
    </div>
  </div>
</template>

<style scoped>
  .main{
    height: 200px; 
    background-color:antiquewhite;
    margin-bottom: 20px;
  }

  .introduce{
    font-weight: bold;  
    font-size: 20px; 
    margin-left: 7%;
    margin-top: 2%;
  }

  .button{
    width: 100px;
    height: 30px;
    border: 2px solid black;
    background-color: aqua;
    transition: transform 0.3s ease;
    text-align: center;  
    margin-top: 3%;
    margin-left: 5%;
  }

  .button:hover{
    transform: scale(1.1);
  }
</style> 