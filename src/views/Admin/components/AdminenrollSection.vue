<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import { useRouter } from 'vue-router'; 

const router = useRouter();

const adminname = ref("")
const password = ref("")
const confirmpassword = ref("")
const adminlevel = ref("1")


const submitForm = async () => {
  if (adminname.value === '' || password.value === '' || confirmpassword.value === '') {
      alert('请填写所有必填字段');
      return;
  }
  if (password.value !== confirmpassword.value) {
      alert('密码和确认密码不匹配');
      return;
  }
  try {
      const response = await axios.post('/api/adminenroll', {
          adminname: adminname.value,
          password: password.value,
          adminlevel: adminlevel.value
      });
      if(response.status === 200){
          alert('注册成功');
          router.push('/adminlogin'); // 跳转到管理员登录页面
      }
  } catch (error) {
      // 处理错误响应
      console.error('注册失败:', error);
      alert('注册失败，请重试');
  }
}
</script>

<template>
  <div class="main">
    <h1>
      adminenroll
    </h1>
  </div>
  <header class="head">
        <!-- TODO: logo 待替换 -->
        <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="50" height="50" />
  </header>
  <div class="input-container">
    <div>
      <input type="text" v-model="adminname" id="adminname" placeholder="请输入用户名" required>
    </div>
    <div>
      <input type="password" v-model="password" id="password" placeholder="请输入密码" required>
    </div>
    <div>
      <input type="password" v-model="confirmpassword" id="confirmpassword" placeholder="请确认密码" required>
    </div>
    <div>
      <select v-model="adminlevel" id="adminlevel">
            <option value="1">等级1</option>
            <option value="2">等级2</option>
            <option value="3">等级3</option>
      </select>
    </div>
    <div>
      <button @click="submitForm">
        <h3>注册</h3>
      </button>
    </div>
  </div>
</template>

<style scoped>
 .main{
    height: 110px;
    display: flex;
    justify-content: center;
    align-items: center; 
    font-size:40px;
    /* background-color: lightblue; */
  }
  .main h1 {
      font-size: 36px;
      color: #007bff; /* 蓝色 */
      margin: 0;
  }
  .head {
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
  }
  .head img {
      width: 50px;
      height: 50px;
  }
  .input-container {
      display: flex;
      flex-direction: column;
      align-items: center; 
  }
  .input-container div {
      margin-bottom: 20px;
  }
  .input-container input,
  .input-container select {
      width: 300px;
      height: 40px;
      padding: 0 10px;
      border: 1px solid #ced4da;
      border-radius: 5px;
      font-size: 16px;
      box-sizing: border-box;
  }
  .input-container input:focus,
  .input-container select:focus {
      border-color:#0056b3;
      outline: none;
  }
  .input-container button{
      width: 300px;
      height: 40px;
      cursor: pointer;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      background-color: lightblue;
  }
  .input-container button:hover {
      transform: scale(1.1); 
      background-color: #0056b3;
  }
</style>