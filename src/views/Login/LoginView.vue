<script lang="ts" setup>
import { ref } from 'vue';
import LoginForm from './components/LoginForm.vue'
import EnrollForm from './components/EnrollForm.vue'

let isLogin=ref(true)
function chooseLogin(){
  isLogin.value=true
}
function chooseEnroll(){
  isLogin.value=false
}
</script>

<template>
  <header class="head">
    <RouterLink class="logo" to="/">
        <!-- TODO: logo 待替换 -->
        <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="50" height="50" />
    </RouterLink>
  </header>
 
  <main class="main-container">
    <div>
      <LoginForm v-if="isLogin" />
      <EnrollForm v-else />
    </div>
    <div>
      <el-space class="container" spacer="|">
        <p class="login-container" @click="chooseLogin">登录</p>
        <p class="enroll-container" @click="chooseEnroll">注册</p>
    </el-space>
    </div>
  </main>
</template>

<style scoped>
  .head{
    display: flex;
    position: absolute;
    top: 10px;
    left: 10px;
  }
  .main-container{
    display: flex;
    flex-direction: column;
    align-items: center; 
    justify-content: center;
    height: 100vh;
  }
  .main-container div { 
    margin-bottom: 10px;
  }
  .container{
    flex-direction: row;
    padding: 0.5rem;
  }
  .login-container, .enroll-container{
    cursor: pointer;
    transition: transform 0.3s ease;
  }
  .login-container:hover , .enroll-container:hover {
    transform: scale(1.25); 
  }
</style> 
