<script lang="ts" setup>
  import { ref } from 'vue';
  import axios from "axios";
  import PersonalinformationSection from './components/PersonalinformationSection.vue';
  import ComplationSection from './components/ComplationSection.vue';
  import RefundSection from './components/RefundSection.vue';
  import AppealSection from './components/AppealSection.vue';
  import AdminenrollSection from './components/AdminenrollSection.vue';

  let contentclass=ref("personalinformation");

  //选择不同内容的函数
  function choosePersonalinformation(){
    contentclass.value="personalinformation";
  }
  function chooseComplation(){
    contentclass.value="complation";
  }
  function chooseRefund(){
    contentclass.value="refund";
  }
  function chooseAppeal(){
    contentclass.value="appeal";
  }
  function chooseAdminenroll(){
    contentclass.value="adminenroll";
  }
</script>

<template>
  <div class="main">
    <div class="list">
      <p @click='choosePersonalinformation'>个人信息</p>
      <p @click='chooseComplation'>投诉</p>
      <p @click='chooseRefund'>退款</p>
      <p @click='chooseAppeal'>申诉</p>
      <p @click='chooseAdminenroll'>管理员注册</p>
    </div>
    <div class="content">
      <PersonalinformationSection v-if="contentclass=='personalinformation'" />
      <ComplationSection v-else-if="contentclass=='complation'" />
      <RefundSection v-else-if="contentclass=='refund'" />
      <AppealSection v-else-if="contentclass=='appeal'" />
      <AdminenrollSection v-else />
    </div>
  </div>
</template>

<style scoped>
  .main{
    width: 70%;
    margin: auto;
  }

  .list{
    width: 15%;
    float: left;
  }

  .list p{
    display: block;
    height: 80px;
    background-color: #3064bb;
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
