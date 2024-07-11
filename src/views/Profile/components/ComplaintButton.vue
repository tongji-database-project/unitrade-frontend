<template>
    <button @click="goToComplaint" class="complaint-button">投诉该用户</button>
  </template>
  
  <script>
  export default {
    methods: {
      goToComplaint() {
        this.$router.push({ name: 'ComplaintSubmission', params: { userId: this.userId } });
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
  .complaint-button {
    display: block;
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    background-color: #dc3545;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;
  }
  .complaint-button:hover {
    background-color: #c82333;
  }
  </style>
  