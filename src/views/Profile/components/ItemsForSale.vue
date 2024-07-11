<template>
    <div class="items-for-sale">
      <h3>在售商品</h3>
      <ul>
        <li v-for="item in items" :key="item.id">{{ item.name }}: {{ item.price }}元</li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      items: {
        type: Array,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  .items-for-sale {
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
  