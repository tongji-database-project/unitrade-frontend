<script setup lang="ts">
import { useTokenStore } from '@/stores/token'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { EditMyinfo } from '@/apis/user'
const logged_in = computed(() => useTokenStore().logged_in)

let newName = ref('')
let newSex = ref('')
let newAddress = ref('')
const router = useRouter()
const ToAccount = () => {
  setTimeout(() => {
    router.push('/account')
  }, 2000) // 延迟时间为 2000 毫秒（2 秒）
}
const submitForm = async () => {
  if (logged_in) {
    const response = await EditMyinfo(newName.value, newSex.value, newAddress.value)
    if (response === 200) {
      //修改成功就延迟2s跳转到个人中心界面
      ToAccount()
    }
  }
}
</script>

<template>
  <div class="form">
    <p>名称：</p>
    <input v-model="newName" placeholder="输入新的名称" />
    <p>性别：</p>
    <div class="sex">
      <input type="radio" value="男" v-model="newSex" />男
      <input type="radio" value="女" v-model="newSex" />女
    </div>
    <p>地址：</p>
    <input v-model="newAddress" placeholder="地址：" />
    <button @click="submitForm">提交</button>
  </div>
</template>
<style>
.form {
  margin: 50px;
  width: 40%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.sex {
  width: 30%;
  display: flex; /* 使用弹性布局 */
  justify-content: space-between; /* 让子元素在容器内水平分布 */
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
