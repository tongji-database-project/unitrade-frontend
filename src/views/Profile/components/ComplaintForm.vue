<template>
    <div class="complaint-form">
      <h2>投诉卖家</h2>
      <textarea v-model="complaintReason" placeholder="请输入投诉理由"></textarea>
      <button @click="submitComplaint">提交投诉</button>
    </div>
  </template>
  
  <script lang="ts">
  import axios from 'axios';
  
  export default {
    name: 'ComplaintForm',
    props: {
      userId: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        complaintReason: ''
      };
    },
    methods: {
      async submitComplaint() {
        if (this.complaintReason.trim() === '') {
          alert('投诉理由不能为空');
          return;
        }
  
        try {
          const response = await axios.post('/api/sellercomplaints/submit', {
            sellerId: this.userId,
            complaintReason: this.complaintReason
          });
          alert('投诉提交成功');
          this.complaintReason = ''; // 重置输入框
        } catch (error) {
          console.error('提交投诉时出错:', error);
          alert('投诉提交失败，请稍后重试');
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .complaint-form {
    margin-top: 20px;
  }
  
  .complaint-form textarea {
    width: 100%;
    height: 100px;
    margin-bottom: 10px;
  }
  
  .complaint-form button {
    background-color: red;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
  }
  
  .complaint-form button:hover {
    background-color: darkred;
  }
  </style>
  