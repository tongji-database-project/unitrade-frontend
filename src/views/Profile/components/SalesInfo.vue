<template>
    <div class="sales-info">
      <h3>销售情况</h3>
      <ul>
        <li v-for="item in sales" :key="item.id">{{ item.name }}: {{ item.quantity }}件</li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      sales: {
        type: Array,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  .sales-info {
    padding: 20px;
    border-bottom: 1px solid #ddd;
  }
  h3 {
    margin: 0 0 10px;
    font-size: 20px;
  }
  ul {
    padding: 0;
    list-style: none;
  }
  li {
    margin: 5px 0;
  }
  </style>
  