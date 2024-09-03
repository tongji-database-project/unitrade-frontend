<script setup lang="ts">
// import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
import { ref } from 'vue'
import axios from 'axios'

interface AdminInfo {
  id: string
  name: string
  password: string
  level: number
}

const infos = ref<[AdminInfo]>()

const update = async () => {
  await axios
    .get(`/api/test`)
    .then((response) => {
      if (response.status === 200) {
        infos.value = response.data
      }
    })
    .catch(function (error) {
      console.log(error)
    })
}
</script>

<template>
  <div>
    <el-button type="primary" @click="update" round>更新</el-button>
    <div v-for="(info, index) in infos" :key="index">
      <h1>管理员 {{ index }} 号</h1>
      <p>账号 ID：{{ info.id }}</p>
      <p>账号名字：{{ info.name }}</p>
      <p>账号密码：{{ info.password }}</p>
      <p>（非实际业务逻辑中的密码）</p>
      <p>权限等级：{{ info.level }}</p>
    </div>
  </div>
  <!--
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
--></template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
