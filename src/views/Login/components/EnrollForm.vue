<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { userEnrollAPI } from '@/apis/user'
import { ElMessageBox } from 'element-plus'

const router = useRouter()

const userName = ref('')
const password = ref('')
const checkPassword = ref('')
const phone = ref('')
const email = ref('')
const verificationCode = ref('') // 输入验证码
const registerType = ref('1') // '1' 表示手机号, '2' 表示邮箱
const countdown = ref(0) // 倒计时初始为0
const isButtonDisabled = ref(false) // 按钮状态

const validatePhoneNumber = (phone: string) => {
  const phoneRegex = /^1[3-9]\d{9}$/; // 简单的中国手机号正则
  return phoneRegex.test(phone);
};

const startCountdown = () => {
  countdown.value = 60;
  isButtonDisabled.value = true;
  
  const timer = setInterval(() => {
    countdown.value--;
    if (countdown.value <= 0) {
      clearInterval(timer);
      isButtonDisabled.value = false;
    }
  }, 1000); // 每秒更新一次
}

const sendVerifyCode = async () => {
  if (registerType.value === '1' && !validatePhoneNumber(phone.value)) {
    ElMessageBox.alert('请输入有效的手机号');
    return;
  }
  try {
    if (registerType.value == '2') {
      await axios.post(`/api/Email?address=${email.value}&type=register`)
    } else {
      await axios.post(`/api/CellphoneCode?phone=${phone.value}&type=register`)
    }
    alert('验证码已发送')
    startCountdown()
  } catch (error) {
    console.error('发送验证码失败', error)
    alert('发送验证码失败，请稍后重试')
  }
}

const submitForm = async () => {
  if (password.value !== checkPassword.value) {
    alert('两次输入的密码不一致')
    return
  }

  try {
    let response = await userEnrollAPI(
      userName.value,
      password.value,
      phone.value,
      email.value,
      verificationCode.value
    )

    if (response.status === 200) {
      router.push('/login')
      window.location.reload()
      alert('注册成功')
    } else {
      alert(`${response.status} : 注册失败，请稍后重试`)
    }
  } catch {
    alert('500 : 注册失败，请稍后重试')
  }
}
</script>

<template>
  <form @submit.prevent="submitForm" class="form-container">
    <h3>欢迎注册</h3>
    <div class="enroll">
      <div class="input-container">
        <input type="userName" v-model="userName" id="userName" placeholder="请输入用户名" required />
      </div>
      <div class="input-container">
        <input type="password" v-model="password" id="password" placeholder="请输入密码" required />
      </div>
      <div class="input-container">
        <input
          type="password"
          v-model="checkPassword"
          id="confirmpassword"
          placeholder="请确认密码"
          required/>
      </div>
      <div class="input-container">
        <input type="text" v-model="phone" id="phoneNumber" placeholder="请输入手机号" />
      </div>
      <div class="input-container">
        <input type="email" v-model="email" id="email" placeholder="请输入邮箱" />
      </div>
      <div class="select-container">
        <label> <input type="radio" v-model="registerType" value="1" /> 手机号验证 </label>
        <label> <input type="radio" v-model="registerType" value="2" /> 邮箱验证 </label>
      </div>
      <div class="input-group">
        <input
          type="text"
          v-model="verificationCode"
          id="verificationCode"
          placeholder="请输入验证码"
          required/>
        <button class="commom-button" type="button" @click="sendVerifyCode" :disabled="isButtonDisabled">
          {{ isButtonDisabled ? `${countdown}秒后重试` : '获取验证码' }}
        </button>
      </div>
    </div>
    <div class="action-button">
      <button type="submit">注册</button>
    </div>
  </form>
</template>

<style scoped>
.form-container {
  width: 320px;
  height: 450px;
  padding: 20px;
  border-radius: 12px;
  background: #f5f5f5;
  margin: 30px auto;
  display: flex;
  flex-direction: column;
  align-items: center; 
}

h3{
  height: 60px;
  font-size: 23px;
  line-height: 43px;
  text-align:center
}

.enroll > *{
  height: 22px;
  /* background-color: red; */
  margin-bottom: 22px;
}

.input-container 
.input-group{
  margin-bottom: 100px;
  /* padding-bottom: 22px; */
  height: 35px;
  width: 100%;
  display: block;
}

input{
  outline: medium;
  border: none;
  /* width: 100%; 让输入框宽度自适应父容器 */
}

.input-container input{
  padding: 8px;
  flex: 1;
  height: 35px;
  width: 100%;
  box-sizing: border-box;
  border-radius: 3px;
  color: #333;
  font-size: 12px;
  border: 1px solid #e0e0e0;
}
.input-group input {
  padding: 8px;
  flex: 1;
  height: 35px;
  width: 63%;
  box-sizing: border-box;
  border-radius: 3px;
  color: #333;
  font-size: 12px;
  border: 1px solid #e0e0e0;
} 
.input-group button {
  margin-left: 15px;
  flex: 1;
  height: 35px;
  cursor: pointer;
  border: none;
  box-sizing: border-box;
  border-radius: 3px;
  background-color: #bdcefc;
  color: white;
  padding: 0 10px;
  font-size: 12px;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.input-group button:hover {
  transform: scale(1.03);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.3);
}

.select-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
}

.radio-label {
  display: block;
  width: 48%; /* 占据一行的48%，两个按钮刚好分开 */
  box-sizing: border-box;
}

.left-label {
  text-align: left;
}

.right-label {
  text-align: right;
}

.action-button {
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 300px;
  margin-top: 25px;  
  margin-bottom: 20px;
}
/*
.action-buttons button {
  width: 200px;
  height: 30px;
  cursor: pointer;
  border: none;
  background-color: #409eff;
  color: white;
  font-size: 14px;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.action-buttons button:hover {
  transform: scale(1.1);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
} */

button[type='submit'] {

  width: 280px; 
  background-color: #bdcefc;
  height: 40px;
  cursor: pointer;
  border: none;
  border-radius: 20px;
  color: white;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

button[type='submit']:hover {
  transform: scale(1.03);
  box-shadow: 0 6px 6px rgba(0, 0, 0, 0.3);
}
</style>
