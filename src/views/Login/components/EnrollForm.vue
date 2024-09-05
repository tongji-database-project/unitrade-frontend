<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { userEnrollAPI } from '@/apis/user'

const router = useRouter()

const userName = ref('')
const password = ref('')
const checkPassword = ref('')
const phone = ref('')
const email = ref('')
const verificationCode = ref('') // 输入验证码
const registerType = ref('1') // '1' 表示手机号, '2' 表示邮箱

const sendVerifyCode = async () => {
  try {
    if (registerType.value == '2') {
      await axios.post(`/api/Email?address=${email.value}&type=register`)
    } else {
      await axios.post(`/api/CellphoneCode?phone=${phone.value}&type=register`)
    }
    alert('验证码已发送')
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
        required
      />
    </div>

    <!-- 新增：手机号输入框 -->
    <div class="input-container">
      <input type="text" v-model="phone" id="phoneNumber" placeholder="请输入手机号" />
    </div>

    <!-- 新增：邮箱输入框 -->
    <div class="input-container">
      <input type="email" v-model="email" id="email" placeholder="请输入邮箱" />
    </div>

    <!-- 新增：选择验证方式 -->
    <div class="input-container">
      <label> <input type="radio" v-model="registerType" value="1" /> 手机号验证 </label>
      <label> <input type="radio" v-model="registerType" value="2" /> 邮箱验证 </label>
    </div>

    <div class="input-container">
      <input
        type="text"
        v-model="verificationCode"
        id="verificationCode"
        placeholder="请输入验证码"
        required
      />
      <button type="button" @click="sendVerifyCode" class="verify_button">获取验证码</button>
    </div>

    <div class="action-buttons">
      <button type="submit">注册</button>
    </div>
  </form>
</template>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input-container {
  margin-bottom: 20px;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中，适用于设置固定高度的父容器 */
}

.input-container input,
.input-group input {
  width: 300px;
  height: 30px;
  display: flex;
  justify-content: center;
}

.input-group {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.input-group input {
  flex: 1;
}

.input-group button {
  margin-left: 10px;
  height: 34px;
  cursor: pointer;
  border: none;
  background-color: #409eff;
  color: white;
  padding: 0 10px;
  font-size: 14px;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.input-group button:hover {
  transform: scale(1.1);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

.action-buttons {
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 300px;
  margin-bottom: 20px;
}

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
}
</style>
