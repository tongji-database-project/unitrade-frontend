<script setup lang="ts">
// 页面头部导航栏，包含用户头像、购物车、商品发布
// 如果需要商品分类可以再往上加
import HeaderProfile from './HeaderProfile.vue'
const onHoverUser = () => {
  console.log("hovered")
}

const categories = [
  {
    name: "分类 1",
    path: "/",
  },
  {
    name: "分类 2",
    path: "/",
  },
  {
    name: "路由测试",
    path: "/test",
  },
]
</script>

<template>
  <div class="top-nav">
    <el-space class="container" spacer="|">
      <RouterLink class="logo" to="/">
        <!-- TODO: logo 待替换 -->
        <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="30" height="30" />
      </RouterLink>
      <div
        class="header-category"
        v-for="({name, path}, index) in categories"
        :key="index"
      >
        <RouterLink :to="path">{{ name }}</RouterLink>
      </div>
    </el-space>
    <el-space class="container" spacer="|">
      <div class="user-cart">
        <RouterLink to="/cart">购物车</RouterLink>
      </div>
      <div class="user-shelf">
        <RouterLink to="/onsale">我的发布</RouterLink>
      </div>
      <div class="header-avatar" @hover="onHoverUser">
        <!-- TODO: 为此处路由的 URL 添加 id -->
        <RouterLink to="/profile/idtest">
          <!-- TODO: 用户头像示例，之后图片的 src 用服务器的图片对应的 URL 进行替换 -->
          <el-avatar :size="40" src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"></el-avatar>
        </RouterLink>
        <div class="header-profile">
          <HeaderProfile />
        </div>
      </div>
    </el-space>
  </div>
</template>

<style scoped>
.top-nav {
  width: 100%;
  height: 78px;
  display: flex;
  justify-content: space-between;
}

.container {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0.3rem;
}

.container div {
  padding: 1rem;
}

.header-profile {
  display: none;
  position: absolute;
  top: 2rem;
  right: 2rem;
  z-index: 200;
}

.header-avatar:hover .header-profile {
  transition: all 0.3s linear;
  display: flex;
}
</style>
