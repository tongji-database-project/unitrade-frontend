<script lang="ts" setup>
  import { ref } from 'vue';
  import 'element-plus/dist/index.css';
  import myComplationSection from './components/myComplationSection.vue';
  import myRefundSection from './components/myRefundSection.vue';
  import myAppealSection from './components/myAppealSection.vue';
  import getComplationSection from './components/getComplationSection.vue';

  let contentclass=ref("myComplation");

  function chooseMyComplation(){
    contentclass.value="myComplation";
  }
  function chooseMyRefund(){
    contentclass.value="myRefund";
  }
  function chooseMyAppeal(){
    contentclass.value="myAppeal";
  }
  function chooseGetComplation(){
    contentclass.value="getComplation";
  }
</script>

<template>
  <div class="main">
    <div class="list">
      <p @click='chooseMyComplation'>我的投诉</p>
      <p @click='chooseMyRefund'>我的退款</p>
      <p @click='chooseMyAppeal'>我的申诉</p>
      <p @click='chooseGetComplation'>收到的投诉</p>
    </div>
    <div class="content">
      <myComplationSection v-if="contentclass=='myComplation'" />
      <myRefundSection v-else-if="contentclass=='myRefund'" />
      <myAppealSection v-else-if="contentclass=='myAppeal'" />
      <getComplationSection v-else />
    </div>
  </div>
</template>

<style scoped>
  .main{
    width: 70%;
    margin: auto;
    margin-top: 50px;
  }

  .list{
    width: 15%;
    margin-top: 5%;
    float: left;
  }

  .list p{
    display: block;
    width: 100%;
    height: 80px;
    background-color:hsla(160, 100%, 37%, 1);
    color: white;
    text-decoration: none;
    text-align: center;
    line-height: 80px;
    font-size: 18px;
  }

  .list p:hover{
    background-color: #608dd9;
  }

  .content{
    float: right;
    width: 80%;
  }

  .content > * {
    width: 100%;
  }
</style> 

