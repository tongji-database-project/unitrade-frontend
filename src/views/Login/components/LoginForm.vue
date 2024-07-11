<script setup lang="ts">
function submitForm(){
  
}
</script>

<template>
  <form @submit.prevent="submitForm" class="form-container">
      <div class="input-container">
        <input type="text" id="username" placeholder="请输入用户名" required>
      </div>
      <div class="input-container">
        <input type="password" id="password" placeholder="请输入密码" required>
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