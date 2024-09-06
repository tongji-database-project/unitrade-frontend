<script setup lang="ts">
import { ref } from 'vue'
import { cancelUser } from '@/apis/user'
import { useTokenStore } from '@/stores/token'
import { useRouter } from 'vue-router'

const password = ref('')
const is_cancel=ref(false)
const router=useRouter()
const TokenStore = useTokenStore()
function submitForm(){
    is_cancel.value=true
    
}
function deny_cancel(){
    is_cancel.value=false

}
const confirm_cancel=async()=>{
    const response=await cancelUser(password.value)
    if(response!=200){
      is_cancel.value=false
    }
    else{  
      TokenStore.deletetoken()
      router.push('/')
    }
}
</script>

<template>
  <form @submit.prevent="submitForm" class="form">
    <p>为保证用户安全，请输入原密码：</p>
    <div class="input-container">
      <input
        type="password"
        v-model="password"
        id="Originpassword"
        placeholder="请输入原密码"
        required
      />
    </div>
    <div>
      <button type="submit">注销账户</button>
    </div>
  </form>
  <transition name="fade">
      <div v-if="is_cancel" class="modal-overlay" >
        <div class="modal-content" @click.stop>
          <div calss="remind-info">
            <p>此操作不可逆，确定要注销账户吗？</p>
            <div class="choices">
              <button @click="confirm_cancel">确定</button>
              <button @click="deny_cancel">取消</button>
            </div>
          </div>
        </div>
      </div>
  </transition>
</template>

<style scoped>
.form {
  margin: 50px;
  width: 40%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.form-container div {
  margin-bottom: 10px;
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
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  text-align: center;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid #3498db;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}
.centre {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%; /* 居中于视口 */
}
</style>