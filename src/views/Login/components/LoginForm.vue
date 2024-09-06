<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useTokenStore } from '@/stores/token'
import { loginAPI, resetPasswordAPI } from '@/apis/user'
import { adminLoginAPI } from '@/apis/admin'
import 'element-plus/dist/index.css'

const TokenStore = useTokenStore()
const cartStore = useCartStore()
const router = useRouter()

const isPasswordLogin = ref(true)
const username = ref('')
const password = ref('')
const phoneOrEmail = ref('')
const verificationCode = ref('')
const loginType = ref('1') // '1' 表示手机号, '2' 表示邮箱
const forgetVisible = ref(false)
const countdown = ref(0) // 倒计时初始为0
const isButtonDisabled = ref(false) // 按钮状态
const param = ref({
  username: '',
  password: '',
  checkPassword: ''
})

const props = defineProps({
  isadmin: {
    type: Boolean,
    default: false
  }
})
const resetButtonState = () => {
  countdown.value = 0
  isButtonDisabled.value = false
}

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
};

const goBackToLogin = () => {
  forgetVisible.value = false
  resetButtonState()
}
const toggleLoginType = () => {
  isPasswordLogin.value = !isPasswordLogin.value
}

const forgetPassword = () => {
  forgetVisible.value = true
  resetButtonState()
}

const resetPassword = async () => {
  if (param.value.password !== param.value.checkPassword) {
    ElMessage({
        type: 'warning',
        message: `两次输入的密码不一致`
    })
    return
  }

  try {
    let response
    if (loginType.value == '1') {
      response = await resetPasswordAPI(
        param.value.username,
        param.value.password,
        phoneOrEmail.value,
        ' ',
        verificationCode.value
      )
    } else {
      response = await resetPasswordAPI(
        param.value.username,
        param.value.password,
        ' ',
        phoneOrEmail.value,
        verificationCode.value
      )
    }
    if (response.status === 200) {
      router.push('/login');
      window.location.reload()
      ElMessage({
        type: 'success',
        message: `密码重置成功`
      })
    } else {
      ElMessage({
        type: 'warning',
        message: `密码重置失败`
      })
    }
  } catch (error) {
    ElMessage({
        type: 'warning',
        message: `密码重置失败，请稍后重试`
    })
  }
}

const validatePhoneNumber = (phone: string) => {
  const phoneRegex = /^1[3-9]\d{9}$/; // 简单的中国手机号正则
  return phoneRegex.test(phone);
};
const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
const sendVerifyCodeFind = async () => {
  if (loginType.value === '1' && !validatePhoneNumber(phoneOrEmail.value)) {
    ElMessage({
        type: 'warning',
        message: `请输入有效的手机号`
    })
    return;
  }
  if (loginType.value === '2' && !validateEmail(phoneOrEmail.value)) {
    ElMessage({
        type: 'warning',
        message: `请输入有效的邮箱地址`
    })
    return;
  }
  try {
    if (loginType.value == '2') {
      await axios.post(`/api/Email?address=${phoneOrEmail.value}&type=findpwd`)
    } else {
      await axios.post(`/api/CellphoneCode?phone=${phoneOrEmail.value}&type=findpwd`)
    }
    ElMessage({
        type: 'success',
        message: `验证码已发送`
    })
    startCountdown()
  } catch (error) {
    ElMessage({
        type: 'warning',
        message: `验证码发送失败，请稍后重试`
    })
    console.error(error)
  }
}

const sendVerifyCodeLogin = async () => {
  if (loginType.value === '1' && !validatePhoneNumber(phoneOrEmail.value)) {
    ElMessage({
        type: 'warning',
        message: `请输入有效的手机号`
    })
    return;
  }
  if (loginType.value === '2' && !validateEmail(phoneOrEmail.value)) {
    ElMessage({
        type: 'warning',
        message: `请输入有效的邮箱地址`
    })
    return;
  }
  try {
    if (loginType.value == '2') {
      // 发送邮箱验证码
      await axios.post(`/api/Email?address=${phoneOrEmail.value}&type=login`)
    } else {
      // 发送手机验证码
      await axios.post(`/api/CellphoneCode?phone=${phoneOrEmail.value}&type=login`)
    }
    ElMessage({
        type: 'success',
        message: `验证码已发送`
    })
    startCountdown()
  } catch (error) {
    ElMessage({
        type: 'warning',
        message: `验证码发送失败，请稍后重试`
    })
    console.error(error)
  }
}

const submitForm = async () => {
  if (props.isadmin == true) {
    //管理员登录
    try {
      const response = await adminLoginAPI(username.value, password.value)
      if (response.status === 200) {
        TokenStore.updatetoken(response.data.token)
        // TODO: 跳转到管理员页面
        router.push('/admin/:' + String(response.data.id))
      } else {
        ElMessageBox.alert('用户名或密码错误')
      }
    } catch (error) {
      console.log(error)
      ElMessageBox.alert('登录失败，请稍后重试')
    }
  } else {
    //用户登录
    try {
      let response
      if (isPasswordLogin.value) {
        response = await loginAPI(isPasswordLogin.value, username.value, password.value)
      } else {
        response = await loginAPI(isPasswordLogin.value, phoneOrEmail.value, verificationCode.value)
      }

      if (response.status === 200) {
        TokenStore.updatetoken(response.data.access_token)
        try {
          await cartStore.loadCart(); // 加载购物车数据
          console.log('购物车数据已成功加载');
        } 
        catch (error) {
          console.error('加载购物车数据失败:', error);
        }
        //跳转到用户页面
        router.replace('/')
      } else {
        ElMessageBox.alert(`登录失败：用户名或密码错误\n${response.status}`)
      }
    } catch (error) {
      console.log(error)
      ElMessageBox.alert(`登录失败，请稍后重试\n${error}`)
    }
  }
}
</script>

<template>
  <form @submit.prevent="submitForm" class="form-container">
    <div v-if="forgetVisible" class="reset-password-container">
      <div class="input-container">
        <select v-model="loginType" id="loginType">
          <option value="1">手机号</option>
          <option value="2">邮箱</option>
        </select>
        <button class="return-button" type="button" @click="goBackToLogin">
          <img src="https://img.tukuppt.com/png_preview/00/15/75/NH1xYlBylA.jpg!/fw/780" alt="Clickable Image" />
        </button>
      </div>
      <div class="input-container">
        <input
          type="text"
          v-model="phoneOrEmail"
          id="phoneOrEmail"
          :placeholder="loginType === '1' ? '请输入手机号' : '请输入邮箱'"
          required
        />
      </div>
      <div class="input-group">
        <input
          type="text"
          v-model="verificationCode"
          id="verificationCode"
          placeholder="请输入验证码"
          required
        />
        <button class="commom-button" type="button" @click="sendVerifyCodeFind" :class="{ 'disabled-button': isButtonDisabled }"  :disabled="isButtonDisabled">
          {{ isButtonDisabled ? `${countdown}秒后重试` : '获取验证码' }}
        </button>

      </div>
      <div class="input-container">
        <input
          type="text"
          v-model="param.username"
          id="username"
          placeholder="请输入用户名"
          required
        />
      </div>
      <div class="input-container">
        <input
          type="password"
          v-model="param.password"
          id="newPassword"
          placeholder="请输入新密码"
          required
        />
      </div>
      <div class="input-container">
        <input
          type="password"
          v-model="param.checkPassword"
          id="checkPassword"
          placeholder="确认新密码"
          required
        />
      </div>
      <button class="commom-button" type="submit" @click="resetPassword">重置密码</button>
    </div>

    <div v-else>
       <h3>欢迎登录</h3>
      <div v-if="isPasswordLogin" class="passwordlogin">
        <div class="input-container">
          <input type="text" v-model="username" id="username" placeholder="请输入用户名" required />
        </div>
        <div class="input-container">
          <input type="password" v-model="password" id="password" placeholder="请输入密码" required />
        </div>
      </div>

      <div v-if="!isPasswordLogin" class="VerifyCodeLogin">
        <div class="input-container">
          <select v-model="loginType" id="loginType">
            <option value="1">手机号</option>
            <option value="2">邮箱</option>
          </select>
        </div>
        <div class="input-container">
          <input
            type="text"
            v-model="phoneOrEmail"
            id="phoneOrEmail"
            :placeholder="loginType === '1' ? '请输入手机号' : '请输入邮箱'"
            required
          />
        </div>
        <div class="input-group">
          <input
            type="text"
            v-model="verificationCode"
            id="verificationCode"
            placeholder="请输入验证码"
            required
          />
          <button type="button" @click="sendVerifyCodeLogin" :class="{ 'disabled-button': isButtonDisabled }" :disabled="isButtonDisabled">
            {{ isButtonDisabled ? `${countdown}秒后重试` : '获取验证码' }}
          </button>
        </div>
      </div>

      <div class="action-buttons">
        <button type="button" @click="toggleLoginType" v-if="!isadmin">
          {{ isPasswordLogin ? '验证码登录' : '账号密码登录' }}
        </button>
        <button type="button" @click="forgetPassword" v-if="!isadmin">忘记密码？</button>
      </div>

      <div>
        <button type="submit">登录</button>
      </div>
    </div>
  </form>
</template>

<style scoped>
.form-container {
  width: 320px;
  height: 400px;
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
  text-align: center;
}
.passwordlogin > *{
  height: 35px;
  margin-bottom: 22px;
}
.VerifyCodeLogin > *{
  height: 35px;
  margin-bottom: 22px;
}
.input-container 
.input-group{
  margin-bottom: 100px;
  height: 35px;
  width: 100%;
  display: block;
}
input{
  outline: medium;
  border: none;
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
  width: 65%;
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
  background-color: #409eff;
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

.action-buttons {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 300px;
  margin-bottom: 20px;
}

.action-buttons button {
  font-size: 12px;
  border: none;
  background: none;
  color: #409eff;
  cursor: pointer;
}

.action-buttons button:hover {
  text-decoration: underline;
}

.reset-password-container > *{
  height: 35px;
  margin-bottom: 15px;
}

.reset-password-container .commom-button {
  height: 35px;
  cursor: pointer;
  border: none;
  background-color: #409eff;
  color: white;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.reset-password-container .commom-button:hover {
  transform: scale(1.03);
  box-shadow: 0 6px 6px rgba(0, 0, 0, 0.3);
}

.return-button {
  float: right; 
  background: none;
  border: none;
  padding: 0;
  cursor: pointer; 
  width: 30px;
  height: 30px;
}

.return-button img {
  display: block;
  width: 100%;
  height: auto;
}

button[type='submit'] {
  width: 280px; 
  background-color: #409eff;
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

.input-group button.disabled-button {
  background-color: #d3d3d3;
  color: #a9a9a9;
  cursor: not-allowed; /* 禁用光标 */
  pointer-events: none; /* 禁用鼠标事件 */
}
</style>
