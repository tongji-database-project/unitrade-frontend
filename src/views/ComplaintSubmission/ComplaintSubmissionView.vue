<template>
  <div class="complaint-page">
    <h2>投诉卖家</h2>
    <div class="form-container">
      <textarea v-model="complaintReason" placeholder="请输入投诉理由"></textarea>
      <button @click="submitComplaint">提交投诉</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElMessage } from 'element-plus'
import { submitComplaint } from '@/apis/complaints'

export default defineComponent({
  name: 'ComplaintSubmissionView',
  data() {
    return {
      complaintReason: ''
    }
  },
  methods: {
    async submitComplaint() {
      if (this.complaintReason.trim() === '') {
        ElMessage.error('投诉理由不能为空');  // 直接使用 ElMessage
        return;
      }

      try {
        const sellerId = String(this.$route.params.seller_id);  // 将 seller_id 转换为 string
        await submitComplaint(sellerId, this.complaintReason);
        ElMessage.success('投诉提交成功');
        // this.$router.push('/profile');  // 提交成功后跳转到用户页面
        this.complaintReason = '';  // 重置输入框
      } catch (error) {
        console.error('提交投诉时出错:', error);
        ElMessage.error('投诉提交失败，请稍后重试');
      }
    }
  }
})
</script>

<style scoped>
.complaint-page {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

textarea {
  width: 100%;
  height: 150px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
}

button {
  padding: 10px;
  background-color: #f44336;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  font-size: 16px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #d32f2f;
}
</style>
