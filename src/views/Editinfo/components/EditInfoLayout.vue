
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
let selected=""
function submitForm(){
    const person: Newinfos = {
  name: newName,
  sex: newSex,
  address: newAddress
};
  console.log(person);
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
     <button @click="submitForm">Submit</button>

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
</style>