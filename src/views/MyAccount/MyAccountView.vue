<script setup lang="ts">
const categories = [ 
  {
    name: "首页",
    path: "/",
  },
  {
    name: "我的购物车",
    path: "/cart",
  },
  {
    name: "我的订单",
    path: "/",        /*未设置 */
  },
  {
    name: "我的收藏",
    path: "/",      /*未设置 */
  },
  {
    name:"我的主页",
    path:"/",       /*未设置 */
  },
  {
    name:"个人设置(进行密码修改等)",
    path:"/",       /*未设置 */
  }
]
const infos=[
  {
    id: "未读取",
    name: "未读取",
    level: "未读取",
  }
]
const address="未读取"
const received="未读取"
const transit="未读取"
const uncommand="未读取"
</script>



<template>
  <div class="container">
    <div class="my-navigator">
      <div
        class="header-category"
        v-for="({name, path}, index) in categories"
        :key="index"
      >
        <RouterLink :to="path">{{ name }}</RouterLink>
      </div>
    </div>
    <div class="my-informations">
      <div class="informations">
        <div class="picture">
          <el-avatar :size="60" src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"></el-avatar>
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
      <div class="my-orders">  
        <!-- 显示订单的信息 -->
         <div class="have-received">
          <h>已收货</h>
          <p>{{ received }}</p>
         </div>
         <div class="transit">
          <h>运输中</h>
          <p>{{ transit }}</p>
         </div>
         <div class="uncommand">
          <h>未评价</h>
          <p>{{ uncommand }}</p>
         </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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

.my-informations {
  width: 70%;
  height: 200px;
  border: 2px solid #ccc;
  border-radius: 10px; /* 设置所有四个角的圆角半径为 10px */
}
.informations{
  width:100%;
  height:60%;
  display:flex;
  margin-right:20px;
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
.my-orders{
  width:100%;
  height: 40%;
  display:flex;
  justify-content: space-between;
  padding:20px;
}
</style>
