
<script setup lang="ts">
import axios from "axios";

import {onBeforeMount, onMounted, ref}from 'vue'

interface Myinfos
{
  id:string;
  name:string;
  level:number;
  // address:string;
  // picture_url:string;
  // 等后端部署后再加上
}
var address="0"
var picture_url="0"

const infos = ref<[Myinfos]>();





const getMyinfo = async () => {
  await axios
  .get(`/api/test`)    //暂时为test，等后端代码部署再修改为`/api/getMyinfo`
  .then(response => {
    if (response.status === 200) {
      infos.value = response.data;
    }
  })
  .catch(function (error) {
    console.log(error)
    infos.value?.push({id:"读取失败",name:"读取失败",level:0})
  });
}
const setup=()=>
{
  address="未读取"  
  picture_url="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
   //等相关信息表部署完成后再进行修改

}
const change_picture=()=>
{
  console.log("ASDadsa")
}
onBeforeMount(()=>
{
  setup()
  getMyinfo()   
})
</script>

<template>
    <div class="my-informations">
      <div class="informations">
        <div class="picture">
          <el-avatar :size="60" :src="picture_url"></el-avatar>
        </div>
        <div class="basic-informations">
          <div v-for="(info, index) in infos" :key="index">
          <p>账号 ID：{{ info.id }}</p>
          <p>账号名字：{{ info.name }}</p>
          <p>权限等级：{{ info.level }}</p>
        </div>

        </div>
        <div class="address">
          <p>地址：{{ address }}</p>
        </div>
      
      </div>
    </div>

</template>
<style scoped>

.informations{
  width:100%;
  height:60%;
  display:flex;
  padding: 30px;
}
.picture{
  width:10%;
  height:100%;
}

.basic-informations{
  width:50%;
  height:100%;

}
</style>

