<script lang="ts" setup>
import LoginForm from './components/LoginForm.vue'
</script>

<template>
  <header class="head">
    <RouterLink class="logo" to="/">
      <!-- TODO: logo 待替换 -->
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="50" height="50" />
    </RouterLink>
  </header>

  <main class="main-container">
    <div>
      <LoginForm :isadmin="true" />
    </div>
    <div></div>
  </main>
</template>

<style scoped>
.head {
  display: flex;
  position: absolute;
  top: 10px;
  left: 10px;
}
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
.main-container div {
  margin-bottom: 10px;
}
.container {
  flex-direction: row;
  padding: 0.5rem;
}
.login-container,
.enroll-container {
  cursor: pointer;
  transition: transform 0.3s ease;
}
.login-container:hover,
.enroll-container:hover {
  transform: scale(1.25);
}
</style>
