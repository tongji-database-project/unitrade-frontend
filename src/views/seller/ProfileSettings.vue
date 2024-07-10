<!-- src/views/ProfileSettings.vue -->
<template>
    <div class="profile-settings">
      <h1>Profile Settings</h1>
      <el-form :model="profile">
        <el-form-item label="Name">
          <el-input v-model="profile.name"></el-input>
        </el-form-item>
        <el-form-item label="Email">
          <el-input v-model="profile.email"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveProfile">Save</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { reactive } from 'vue'
  
  interface Profile {
    name: string
    email: string
  }
  
  const profile = reactive<Profile>({
    name: 'Seller Name',
    email: 'seller@example.com'
  })
  
  const saveProfile = () => {
    console.log('Profile saved', profile)
  }
  </script>
  
  <style scoped>
  .profile-settings {
    padding: 20px;
  }
  </style>
  