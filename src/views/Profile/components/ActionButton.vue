<template>
    <button @click="handleClick">{{ buttonText }}</button>
  </template>
  
  <script>
  export default {
    name: 'ActionButton',
    props: {
      userId: {
        type: String,
        required: true,
      },
      buttonText: {
        type: String,
        required: true,
      },
      action: {
        type: String,
        required: true,
      },
    },
    methods: {
      handleClick() {
        if (this.action === 'chat') {
          alert(`联系卖家: ${this.userId}`);
        } else if (this.action === 'complaint') {
          alert(`投诉卖家: ${this.userId}`);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  button {
    background: none;
    border: none;
    color: green;
    cursor: pointer;
    text-decoration: underline;
  }
  
  button:hover {
    color: darkgreen;
  }
  </style>
  