<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus'
import { useTokenStore } from '@/stores/token'
import { useCartStore } from '@/stores/cartStore'
import { loginAPI, adminLoginAPI, resetPasswordAPI } from '@/apis/user'

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

const toggleLoginType = () => {
  isPasswordLogin.value = !isPasswordLogin.value
}

const forgetPassword = () => {
  forgetVisible.value = true
}

const resetPassword = async () => {
  if (param.value.password !== param.value.checkPassword) {
    ElMessageBox.alert('两次输入的密码不一致')
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
      //router.push('/login');
      window.location.reload()
      alert('密码重置成功')
    } else {
      ElMessageBox.alert('密码重置失败')
    }
  } catch (error) {
    ElMessageBox.alert('重置密码失败，请稍后重试')
  }
}

const sendVerifyCodeFind = async () => {
  try {
    if (loginType.value == '2') {
      await axios.post(`/api/Email?address=${phoneOrEmail.value}&type=findpwd`)
    } else {
      await axios.post(`/api/CellphoneCode/86${phoneOrEmail.value}&type=findpwd`)
    }
  } catch (error) {
    ElMessageBox.alert('验证码发送失败，请稍后重试')
    console.error(error)
  }
}

const sendVerifyCodeLogin = async () => {
  try {
    if (loginType.value == '2') {
      // 发送邮箱验证码
      await axios.post(`/api/Email?address=${phoneOrEmail.value}&type=login`)
    } else {
      // 发送手机验证码
      await axios.post(`/api/CellphoneCode?phone=86${phoneOrEmail.value}&type=login`)
    }
  } catch (error) {
    ElMessageBox.alert('验证码发送失败，请稍后重试')
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
        <button type="button" @click="sendVerifyCodeFind">获取验证码</button>
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
      <button type="submit" @click="resetPassword">重置密码</button>
    </div>

    <div v-else>
      <!-- Original Login Form -->
      <div v-if="isPasswordLogin" class="input-container">
        <input type="text" v-model="username" id="username" placeholder="请输入用户名" required />
      </div>
      <div v-if="isPasswordLogin" class="input-container">
        <input type="password" v-model="password" id="password" placeholder="请输入密码" required />
      </div>

      <div v-if="!isPasswordLogin">
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
          <button type="button" @click="sendVerifyCodeLogin">获取验证码</button>
        </div>
      </div>

      <div class="action-buttons">
        <button type="button" @click="toggleLoginType">
          {{ isPasswordLogin ? '验证码登录' : '账号密码登录' }}
        </button>
        <button type="button" @click="forgetPassword">忘记密码？</button>
      </div>

      <div>
        <button type="submit">登录</button>
      </div>
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
}

.input-container input,
.input-group input {
  width: 300px;
  height: 30px;
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

.reset-password-container button {
  width: 200px;
  height: 30px;
  cursor: pointer;
  border: none;
  background-color: #409eff;
  color: white;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.reset-password-container button:hover {
  transform: scale(1.1);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

button[type='submit'] {
  width: 200px;
  height: 30px;
  cursor: pointer;
  border: none;
  background-color: #409eff;
  color: white;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

button[type='submit']:hover {
  transform: scale(1.1);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}
</style>
