<script setup lang="ts">
function submitForm(){
  
}
</script>

<template>
  <form @submit.prevent="submitForm">
      <div>
        <label for="username">用户名:</label>
        <input type="text" id="username" required>
      </div>
      <div>
        <label for="password">密码:</label>
        <input type="password" id="password" required>
      </div>
      <button type="submit">提交</button>
    </form>
</template>

<style scoped>
  
</style>