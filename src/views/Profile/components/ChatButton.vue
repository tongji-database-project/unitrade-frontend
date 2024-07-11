<template>
    <button @click="goToChat" class="chat-button">进入私聊</button>
  </template>
  
  <script>
  export default {
    methods: {
      goToChat() {
        this.$router.push({ name: 'Chat', params: { userId: this.userId } });
      },
    },
    props: {
      userId: {
        type: String,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  .chat-button {
    display: block;
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;
  }
  .chat-button:hover {
    background-color: #0056b3;
  }
  </style>
  