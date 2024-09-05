<script setup lang="ts">
import { getOrderTotalAPI } from '@/apis/pay'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const orderInfo = ref<any[]>({})

const getOrderInfo = async () => {
  const res = await getOrderTotalAPI(route.query.orderId)
  orderInfo.value = res.result
}

onMounted(() => getOrderInfo())

</script>

<template>
  <div class="xtx-pay-page">
    <div class="container">
      <!-- 支付结果 -->
      <div class="pay-result">
        <!-- 路由参数获取到的是字符串而不是布尔值 -->
        <el-icon class="iconfont icon-queren2 green" v-if="$route.query.payResult === 'true'"><SuccessFilled /></el-icon>
        <el-icon class="iconfont red" v-else><CircleCloseFilled /></el-icon>
        <p class="tit">支付{{ $route.query.payResult === 'true' ? '成功' : '失败' }}</p>
        <p class="tip">我们将尽快为您发货，收货期间请保持手机畅通</p>
        <p>支付方式：<span>支付宝</span></p>
        <p>支付金额：<span>¥{{ orderInfo.payMoney?.toFixed(2) }}</span></p>
        <div class="btn">
          <el-button type="primary" style="margin-right:20px" @click="$router.push('/order')">查看订单</el-button>
          <el-button @click="$router.push('/')">进入首页</el-button>
        </div>
        <p class="alert">
          <el-icon class="iconfont"><BellFilled /></el-icon>
          温馨提示：校易购不会以订单异常、系统升级为由要求您点击任何网址链接进行退款操作，保护资产、谨慎操作。
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pay-result {
  padding: 100px 0;
  background: #fff;
  text-align: center;
  margin-top: 20px;

  >.iconfont {
    font-size: 100px;
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
}
</style>