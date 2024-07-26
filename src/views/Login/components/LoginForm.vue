<script setup lang="ts">
import { ref } from "vue";
import { defineProps } from 'vue'
import axios from "axios";
import { useTokenStore } from "@/stores/token";
import { useRouter } from 'vue-router'; 
const TokenStore=useTokenStore()
const router = useRouter();
const username = ref("")
const password = ref("")

const props=defineProps({
  isadmin:{
    type:Boolean,
    default:false,
  },
})

const submitForm = async () => {
  if(props.isadmin==true){
    //管理员登录
    try{
    const response = await axios.post('/api/adminlogin', {username:username.value, password:password.value})
    if(response.status === 200){
      TokenStore.updatetoken(response.data.token)
      //跳转到管理员页面
      router.push('/admin/:'+response.data.id)
    }
    else{
      alert("用户名或密码错误");
    }
    }catch (error){
    console.log(error)
    alert("登录失败，请稍后重试"); 
    }
  }
  else{
    //用户登录
    try{
    const response = await axios.post('/api/aouth/login', {username:username.value, password:password.value})
    if(response.status === 200){
      TokenStore.updatetoken(response.data.token)
      //跳转到用户页面
      router.push('/')
    }
    else{
      alert("用户名或密码错误");
    }
    }catch (error){
    console.log(error)
    alert("登录失败，请稍后重试"); 
    }
  }
}
</script>

<template>
  <form @submit.prevent="submitForm" class="form-container">
      <div class="input-container">
        <input type="text" v-model="username" id="username" placeholder="请输入用户名" required>
      </div>
      <div class="input-container">
        <input type="password" v-model="password" id="password" placeholder="请输入密码" required>
      </div>
      <div>
        <button type="submit">登录</button>
      </div>
    </form>
</template>

<style scoped>
  .form-container{
    display: flex;
    flex-direction: column;
    align-items: center; 
  } 
  .form-container div { 
    margin-bottom: 20px;
  }
  .input-container input{
    width: 300px;
    height: 30px;
  }
  button[type="submit"] {
    width: 200px;
    height: 30px;
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  button[type="submit"]:hover {
    transform: scale(1.1); 
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3); 
  }
</style>