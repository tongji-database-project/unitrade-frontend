<template>
    <div class="user-info">
      <h2>{{ user.name }}</h2>
      <p>信誉值: {{ user.reputation }}</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      user: {
        type: Object,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  .user-info {
    text-align: center;
    padding: 20px;
    border-bottom: 1px solid #ddd;
  }
  h2 {
    margin: 0;
    font-size: 24px;
  }
  p {
    margin: 5px 0 0;
    color: #888;
  }
  </style>
  