<script setup lang="ts">
import { getPaymentStatusAPI } from '@/apis/pay'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const paymentStatus = ref<'success' | 'fail'>('fail')
const order_id = route.query.order_id; // 从查询参数中获取 order_id


// 获取支付状态
const getPaymentStatus = async () => {
  try {
    console.log('订单id', order_id)
    const res = await getPaymentStatusAPI(order_id)
    paymentStatus.value = res.data.success ? 'success' : 'fail'
    console.log('支付状态', res.data.success)
  } catch (error) {
    console.error('支付状态获取失败', error)
    paymentStatus.value = 'fail'
  }
}

onMounted(() => getPaymentStatus())

</script>

<template>
  <div class="xtx-pay-page">
    <div class="container">
      <!-- 支付结果 -->
      <div class="pay-result">
        <!-- 路由参数获取到的是字符串而不是布尔值 -->
        <el-icon class="iconfont icon-queren2 green" v-if="paymentStatus === 'success'"><SuccessFilled /></el-icon>
        <el-icon class="iconfont red" v-else><CircleCloseFilled /></el-icon>
        <p class="tit">支付{{ paymentStatus === 'success' ? '成功' : '失败' }}</p>
        <p class="tip">感谢您使用校易购</p>
        <p class="tip" v-if="paymentStatus === 'success'">我们将尽快为您发货，收货期间请保持手机畅通</p>
        <div class="btn">
          <el-button type="primary" style="margin-right:20px" @click="$router.push('/order')">查看订单</el-button>
          <el-button @click="$router.push('/')">进入首页</el-button>
        </div>
        <p class="alert">
          <el-icon class="iconfontsmall" style="size:25px"><BellFilled /></el-icon>
          温馨提示：校易购不会以订单异常、系统升级为由要求您点击任何网址链接进行退款操作，保护资产、谨慎操作。
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pay-result {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 使页面填满整个视口 */
  background: #fff;
  text-align: center;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.iconfont {
  font-size: 100px;
}

.iconfontsmall {
  font-size: 20px;
}

.green {
  color: #1dc779;
}

.red {
  color: #cd2020;
}

.tit {
  font-size: 24px;
}

.tip {
  color: #999;
}

p {
  line-height: 40px;
  font-size: 16px;
}

.btn {
  margin-top: 50px;
}

.alert {
  font-size: 12px;
  color: #999;
  margin-top: 50px;
}
</style>
