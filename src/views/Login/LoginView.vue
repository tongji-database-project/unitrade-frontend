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
  <main>
    <LoginForm v-if="isLogin" />
    <EnrollForm v-else />
    <p @click="chooseLogin">登录</p>
    <p @click="chooseEnroll">注册</p>
  </main>
</template>

<style scoped>

</style>