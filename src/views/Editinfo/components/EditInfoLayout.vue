
<script setup lang="ts">
import axios from "axios";

import {onBeforeMount, ref}from 'vue'

interface Newinfos
{
    name:string;
    sex:string;
    address:string;
}

let newName = ''
let newSex = ''
let newAddress = ''
let submit=ref(false)
let transit=ref(true)
let result=ref("")
function close(){
    submit.value=false;
}
const submitForm = async()=>{
    try{
        submit.value=true;
        const response= await axios.post('/api/editInfo',{userName:newName,userSex:newSex,userAddress:newAddress});
        if(response.status===200){
            transit.value=false;
            result.value="成功"
        }
    }catch(error){
        console.log(error)
        transit.value=false;
        result.value="失败"
    }
}
</script>

<template>
    <div class="form">
     <p>名称：</p>
     <input v-model="newName" placeholder="输入新的名称" />
     <p>性别：</p>
     <div class="sex">
        <input type="radio" value="男"v-model=newSex>男
        <input type="radio" value="女"v-model=newSex>女
     </div>
     <p>地址：</p>
     <input v-model="newAddress" placeholder="地址：" />
     <button @click="submitForm">提交</button>
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
                <div v-if="result=='成功'">
                    <p>修改成功</p>
                    <button @click="close">关闭</button>
                </div>
                <div v-else-if="result=='失败'">
                    <p>修改失败，请稍后重试</p>
                    <button @click="close">关闭</button>
                </div>
            </div>
        </div>
      </div>
    </transition>

    </div>

</template>
<style>
.form{
    margin:50px;
    width:40%;
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.sex{
    width:30%;
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
.centre
{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%; /* 居中于视口 */
}
</style>