
<script setup lang="ts">
import axios from "axios";

import {onBeforeMount, ref}from 'vue'

interface Myinfos
{
  id:string;
  name:string;
  level:number;
  address:string;
  avator:string;
  reputation:number;
  sex:string;

}
let loading=ref(true)
const infos = ref<[Myinfos]>();

let id=""   /*暂时使用变量来防止报错，等登录功能完善后再修改 */


const getMyinfo = async () => {
  try{
    const response= await axios.post('/api/getMyinfo',{userid:id})
    if (response.status === 200) {
      infos.value = response.data
      loading.value=(false)
    }
  }catch(error){
    console.log(error)
    loading.value=(false)
    infos.value=[{id:"读取失败",name:"读取失败",level:0,sex:"读取失败",reputation:0,avator:"读取失败",address:"读取失败"}]
  }
  // await axios
  // .get(`/api/getMyinfo`)  
  // .then(response => {
  //   if (response.status === 200) {
  //     infos.value = response.data
  //     loading.value=(false)
  //   }
  // })
  // .catch(function (error) {
  //   console.log(error)
  //   loading.value=(false)
  //   infos.value=[{id:"读取失败",name:"读取失败",level:0,sex:"读取失败",reputation:0,avator:"读取失败",address:"读取失败"}]

  // });
}
onBeforeMount(()=>
{
  getMyinfo()   
})
</script>

<template>
  <div v-if="loading"class="centre">
    <div class="spinner">
    </div>    
  </div>
  <div v-else>
    <div class="layout">
       <div v-for="(info, index) in infos" :key="index"class="picture">
        <el-avatar :size="60" :src="info.avator"></el-avatar>
       </div>
      <div class="informations">
        <div v-for="(info, index) in infos" :key="index">
          <p>账号 ID：{{ info.id }}</p>
          <p>账号名字：{{ info.name }}</p>
          <p>权限等级：{{ info.level }}</p>
          <P>信誉值:{{ info.reputation }}</P>
          <p>性别：{{ info.sex }}</p>
        </div>

     </div>
       <div v-for="(info, index) in infos" :key="index"class="address">
        <p>地址：{{ info.address }}</p>
       </div>
      
      </div>
  </div>
      
  

</template>
<style scoped>
.layout{
  width: 100%;
  height: 200px;
  border: 2px solid #ccc;
  border-radius: 10px; 
  display: flex; /* 使用弹性布局 */
  justify-content: space-between; /* 让子元素在容器内水平分布 */
}

.picture{
  display: flex;
  justify-content: center;
  align-items: center;
  width:10%;
  height: 60%; 
}

.informations{
  width:60%;
  margin:20px;

}
.address{
  width:40%;
  padding:20px;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
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
  height: 100%; 
}
</style>

<!-- 以下为旋转动画的代码,在style中使用
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

-->