
<script setup lang="ts">
import { useTokenStore } from '@/stores/token'
import {  getUserInfo} from '@/apis/user'
import {onBeforeMount, ref,computed}from 'vue'

interface Myinfos
{
  id:string;
  name:string;
  level:number;
  address:string;
  avator:string;
  reputation:number;
  sex:string;
  phone:string;
  email:string;
}
let loading=ref(true)
const infos = ref<[Myinfos]>();
//追踪登录状态
const logged_in = computed(() => useTokenStore().logged_in)

// const getMyinfo = async () => {
//   try{
//     const response= await axios.post('/api/getMyinfo',{userid:id})
//     if (response.status === 200) {
//       infos.value = response.data
//       loading.value=(false)
//     }
//   }catch(error){
//     console.log(error)
//     loading.value=(false)
//     infos.value=[{id:"读取失败",name:"读取失败",level:0,sex:"读取失败",reputation:0,avator:"读取失败",address:"读取失败"}]
//   }
// }
const refreshInfo=async()=>{
  if(logged_in.value){
    const info=await getUserInfo()
    infos.value=[{id:info.id,name:info.name,level:info.level,sex:info.sex,reputation:info.reputation,avator:info.avator,address:info.address,phone:info.phone,email:info.email}]
    loading.value=(false)
  }else{
    loading.value=(false)
    infos.value=[{id:"读取失败",name:"读取失败",level:0,sex:"读取失败",reputation:0,avator:"读取失败",address:"读取失败",phone:"读取失败",email:"读取失败"}]
  }
}
onBeforeMount(async ()=>
{
  refreshInfo()
})
</script>

<template>
  <div v-if="loading"class="centre">
    <div class="spinner">
    </div>    
  </div>
  <div v-else>
    <div class="layout">
       <div v-for="(info, index) in infos" :key="index"class="avator">
        <el-avatar :size="60" :src="info.avator"></el-avatar>
       </div>
      <div class="informations">
        <div v-for="(info, index) in infos" :key="index">
          <p>账号 ID：{{ info.id }}</p>
          <p>账号名字：{{ info.name }}</p>
          <p>权限等级：{{ info.level }}</p>
          <P>信誉值:{{ info.reputation }}</P>
          <p>性别：{{ info.sex }}</p>
          <p>电话：{{ info.phone }}</p>
          <p>邮箱：{{ info.email }}</p>
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

.avator{
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