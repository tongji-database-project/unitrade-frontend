<template>
  <h1>支付</h1>
  <el-container style="height: 50vh; display: flex; justify-content: center; align-items: center;">
    <el-card class="box-card" style="width: 600px;">
      <div slot="header" class="clearfix">
      </div>
      <div v-if="!paymentComplete">
        <p>请扫描以下二维码进行支付：</p>
        <el-image style="width: 100%; max-width: 300px; display: block; margin: 20px auto;" :src="qrCodeUrl" fit="contain" />
        <el-button type="danger" @click="handleCancel" style="margin-top: 30px;">取消支付</el-button>
      </div>
      <div v-else>
        <p>{{ paymentMessage }}</p>
      </div>
    </el-card>
  </el-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { ElContainer, ElCard, ElImage, ElButton } from 'element-plus';

const qrCodeUrl = ref('');
const paymentComplete = ref(false);
const paymentMessage = ref('支付成功！感谢您的购买。');
const router = useRouter();

// 调用后端API获取支付二维码
const fetchPaymentInfo = async () => {
  try {
    const response = await axios.get('/api/get-wxpay-qr');
    qrCodeUrl.value = response.data.qrCodeUrl;
  } catch (error) {
    console.error('Error fetching payment info:', error);
  }
};

// 监听支付状态
const listenForPaymentStatus = () => {
  const intervalId = setInterval(async () => {
    try {
      const response = await axios.get('/api/check-payment-status');
      if (response.data.status === 'success') {
        clearInterval(intervalId);
        paymentComplete.value = true;
        setTimeout(() => router.push('/cart'), 2000); // 延时跳转以显示支付成功信息
      }
    } catch (error) {
      console.error('Error checking payment status:', error);
    }
  }, 3000); // 每3秒检查一次
};

// 处理取消支付
const handleCancel = () => {
  router.push('/checkout'); // 返回结算页面
};

onMounted(() => {
  fetchPaymentInfo();
  listenForPaymentStatus();
});
</script>