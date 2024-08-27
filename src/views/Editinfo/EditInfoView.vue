<script setup lang="ts">
import{ref}from 'vue'
import EditAvatorLayout from './components/EditAvatorLayout.vue';
import EditInfoLayout from './components/EditInfoLayout.vue';
const categories = [ 
  {
    name: '首页',
    path: '/'
  },
  {
    name: '我的购物车',
    path: '/cart'
  },
  {
    name: "我的订单",
    path: "/order",        
  },
  {
    name: '我的收藏',
    path: '/' /*未设置 */
  },
  {
    name: '我的主页',
    path: '/' /*未设置 */
  },
  {
    name:"我的消息",
    path:"/message",
  },
  {
    name:"个人中心",
    path:"/account",
  }
]
let contentclass=ref("Editinfo")
function chooseInfo(){
    contentclass.value="Editinfo";
}
function chooseAvator(){
    contentclass.value="EditAvator";
}
</script>
<template>
<div class="container">
    <div class="my-navigator">
      <div class="header-category" v-for="({ name, path }, index) in categories" :key="index">
        <RouterLink :to="path">{{ name }}</RouterLink>
      </div>
    </div>
    <div class="editform">
        <div class="mode">
            <div v-if="contentclass=='Editinfo'" class="chooseInfo">
                <p @click="chooseInfo"> 基本信息</p>
            </div>
            <div v-else class="chooseInfo_not_choose">
                <p @click="chooseInfo"> 基本信息</p>
            </div>
            <div v-if="contentclass=='EditAvator'"class="chooseAvator">
                <p @click="chooseAvator">头像修改</p>
            </div>
            <div v-else class="chooseAvator_not_choose">
                <p @click="chooseAvator">头像修改</p>
            </div>            
        </div>
        <div class="content">
            <EditInfoLayout v-if="contentclass=='Editinfo'"/>
            <EditAvatorLayout v-else-if="contentclass=='EditAvator'"/>
        </div>
    </div>
  </div>
</template>

<style>
.container {
  display: flex; /* 使用弹性布局 */
  justify-content: space-between; /* 让子元素在容器内水平分布 */
}
.my-navigator {
  width: 25%;
  height: 400px;
  align-items: center; /* 垂直居中对齐 */
  border: 2px solid #ccc;
  border-radius: 10px; /* 设置所有四个角的圆角半径为 10px */
  padding: 30px;
}
.editform{
 width:100%;
 background-color: rgb(241, 238, 238);
}
.mode{
    height: 10%;
    margin-top: 10px;
    margin-left:20px;
    gap:20px;
    display: flex;
    flex-direction: row; 
}
.chooseInfo{
    color:red;
    text-decoration: underline;
}
.chooseInfo_not_choose{
    color:black;
}
.chooseInfo:hover{
    cursor: pointer; 
}
.chooseInfo_not_choose{
    cursor: pointer; 
}
.chooseAvator{
    color:red;
    text-decoration: underline;
}
.chooseAvator_not_choose{
    color:black;
}
.chooseAvator_not_choose:hover{
    cursor: pointer; 
}
.chooseAvator:hover{
    cursor: pointer; 
}
</style>