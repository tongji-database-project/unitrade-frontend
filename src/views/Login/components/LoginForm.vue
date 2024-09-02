<script setup lang="ts">
import { ref } from 'vue'
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus'
import { useTokenStore } from '@/stores/token'
import { loginAPI, adminLoginAPI } from '@/apis/user'

const TokenStore = useTokenStore()
const router = useRouter()

const username = ref('')
const password = ref('')

const props = defineProps({
  isadmin: {
    type: Boolean,
    default: false
  }
})

const submitForm = async () => {
  if (props.isadmin == true) {
    //管理员登录
    try {
      const response = await adminLoginAPI(username.value, password.value)
      if (response.status === 200) {
        TokenStore.updatetoken(response.data)
        // TODO: 跳转到管理员页面
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
      const response = await loginAPI(username.value, password.value)
      if (response.status === 200) {
        TokenStore.updatetoken(response.data)
        //跳转到用户页面
        router.replace('/')
      } else {
        ElMessageBox.alert(`用户名或密码错误\n${response.status}`)
      }
    } catch (error) {
      console.log(error)
      ElMessageBox.alert(`登录失败，请稍后重试\n${error}`)
    }
  }
}
</script>

<template>
  <!-- TODO: 参考 ElementPlus 组件用法，美化登录界面，增加输入提示 -->
  <form @submit.prevent="submitForm" class="form-container">
    <div class="input-container">
      <input type="text" v-model="username" id="username" placeholder="请输入用户名" required />
    </div>
    <div class="input-container">
      <input type="password" v-model="password" id="password" placeholder="请输入密码" required />
    </div>
    <div>
      <button type="submit">登录</button>
    </div>
  </form>
</template>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.form-container div {
  margin-bottom: 20px;
}
.input-container input {
  width: 300px;
  height: 30px;
}
button[type='submit'] {
  width: 200px;
  height: 30px;
  cursor: pointer;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}
button[type='submit']:hover {
  transform: scale(1.1);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}
</style>
