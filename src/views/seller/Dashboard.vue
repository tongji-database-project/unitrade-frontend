<template>
    <div class="dashboard">
      <h1>Dashboard</h1>
      <el-card>
        <p>Total Sales: $10,000</p>
        <p>Total Orders: 150</p>
      </el-card>
    </div>
  </template>
  
<script setup lang="ts">
    import { defineComponent } from 'vue'

    defineComponent({
        name: 'DashBoard'
    })
  </script>
  
<style scoped>
  .dashboard {
    padding: 20px;
  }
  </style>