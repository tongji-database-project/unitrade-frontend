<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";

const username = ref("")
const password = ref("")

const submitForm = async () => {
  try{
    const response = await axios.post('/api/aouth/login', {username:username.value, password:password.value})
    if(response.status === 200){
      localStorage.setItem('token', response.data);
      // 获取 token 从 LocalStorage
      // const token = localStorage.getItem('token');
      //跳转到用户或者管理员页面
    }
    else{
      alert("用户名或密码错误");
    }
  }catch (error){
    console.log(error)
    alert("登录失败，请稍后重试");
    
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
        <button type="submit">提交</button>
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