<script setup lang="ts">
import { ref,computed } from "vue";
import { useTokenStore } from '@/stores/token'
import { EditPassword} from '@/apis/user'
const logged_in = computed(() => useTokenStore().logged_in)

const Originpassword=ref('')
const Newpassword = ref('')
const Confirmpassword = ref('')
let submit=ref(false)
let transit=ref(true)
let result=ref("")
function close(){
    submit.value=false;
}

const submitForm = async () => {
    submit.value=true;
    if(logged_in.value){
        const response = await EditPassword(Originpassword.value,Newpassword.value,Confirmpassword.value)
        if(response.status===200){
            transit.value=false;
            result.value="修改成功";
        }
        else{
            transit.value=false;
            result.value="失败";
        }
    }else{
        transit.value=false;
        result.value="未登录"
    }
}
</script>

<template>
  <form @submit.prevent="submitForm" class="form">
    <p>请输入原密码：</p>
    <div class="input-container">
      <input type="password" v-model="Originpassword" id="Originpassword" placeholder="请输入密码" required />
    </div>
    <p>请输入新密码：</p>
    <div class="input-container">
      <input type="password" v-model="Newpassword" id="Newpassword" placeholder="请输入密码" required />
    </div>
    <p>请确认密码</p>
    <div class="input-container">
      <input
        type="password"
        v-model="Confirmpassword"
        id="Confirmpassword"
        placeholder="请确认密码"
        required
      />
    </div>
    <div>
      <button @click="submitForm">修改密码</button>
    </div>
  </form>
  <transition name="fade">
      <div v-if="submit" class="modal-overlay" >
        <div class="modal-content" @click.stop>
            <div v-if="transit">
                <div class="centre">
                    <div class="spinner"></div>
                </div>
                <p>正在提交修改，请勿关闭当前页面</p>
            </div>
            <div v-else>
                <div v-if="result=='修改成功'">
                    <p>修改成功</p>
                    <button @click="close">关闭</button>
                </div>
                <div v-else-if="result=='失败'">
                    <p>修改失败，请稍后重试</p>
                    <button @click="close">关闭</button>
                </div>
                <div v-else-if="result=='未登录'">
                    <p>当前未登录，请登录用户后再修改</p>
                    <button @click="close">关闭</button>
                </div>
                <div v-else-if="result=='密码错误'">
                    <p>密码输入错误</p>
                    <button @click="close">关闭</button>
                </div>
                <div v-else-if="result=='两次密码不一致'">
                    <p>密码输入错误</p>
                    <button @click="close">关闭</button>
                </div>
            </div>
        </div>
      </div>
    </transition>
</template>

<style scoped>
.form{
    margin:50px;
    width:40%;
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
.centre
{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%; /* 居中于视口 */
}
</style>