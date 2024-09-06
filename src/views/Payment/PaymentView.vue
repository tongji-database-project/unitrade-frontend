<script setup lang="ts">
import { createPayAPI, getOrderTotalAPI } from '@/apis/pay'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useCountDown } from '@/composables/useCountDown'

const { formatTime, start } = useCountDown();

// 初始化
const route = useRoute()
const payTotal = ref<number | null>(null) // 用来存储订单总金额

// 获取订单数据
const getOrderTotal = async () => {
  try {
    const res = await getOrderTotalAPI(route.params.id);
    if (res.status === 200) {
      payTotal.value = res.data; // 假设后端返回的数据在res.data中
    } else {
      console.error('获取订单总金额失败', res.message);
    }
  } catch (error) {
    console.error('API调用失败', error);
  }
};

const paymentHTML = ref('')

// 创建订单并跳转到支付宝页面
const createPayment = async () => {
  try {
    const res = await createPayAPI(route.params.id)
    if (res.status === 200) {
      // 支付页面返回的是HTML，直接插入到当前页面
      paymentHTML.value = res.data
      // 使用 setTimeout 来确保 HTML 插入到页面后立即执行
      setTimeout(() => {
        document.forms[0].submit() // 自动提交表单到支付宝
      }, 100) // 延迟 100 毫秒让 DOM 完成渲染
    }
  } catch (error) {
    console.error('支付创建失败:', error)
  }
}

onMounted(() => { start(300), getOrderTotal()}) // 5分钟倒计时，300秒


</script>

<template>
  <div v-html="paymentHTML"></div>
  <div class="xtx-pay-page">
    <div class="container">
      <!-- 付款信息 -->
      <div class="pay-info">
        <svg t="1725245858694" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4426" width="80" height="80"><path d="M512 64C264.32 64 64 264.32 64 512s200.32 448 448 448 448-200.32 448-448S759.68 64 512 64zM756.48 374.4l-260.48 256c-12.8 12.8-33.28 12.8-46.08 0l-121.6-119.04c-12.8-12.8-12.8-33.28 0-45.44 12.8-12.8 33.28-12.8 46.08 0l98.56 96 237.44-233.6c12.8-12.8 33.28-12.8 46.08 0C769.28 341.12 769.28 361.6 756.48 374.4z" fill="#52c41a" p-id="4427"></path></svg>
        <div class="tip">
          <p>订单提交成功！请尽快完成支付。</p>
          <p>支付还剩 <span>{{ formatTime }}</span>, 超时后将取消订单</p>
        </div>
        <div class="amount">
          <span>应付总额：</span>
          <span>¥{{ payTotal?.toFixed(2) }}</span>
        </div>
      </div>
      <!-- 付款方式 -->
      <div class="pay-type">
        <p class="head">选择以下支付方式付款</p>
        <div class="item">
          <p>支付平台</p>
          <a class="btn wx" href="javascript:;"></a>
          <a class="btn alipay" href="javascript:;" @click="createPayment()"></a>
          <!-- 用于展示支付宝返回的支付HTML -->
          <div v-if="paymentHTML" v-html="paymentHTML"></div>
        </div>
        <div class="item">
          <p>支付方式</p>
          <a class="btn" href="javascript:;">招商银行</a>
          <a class="btn" href="javascript:;">工商银行</a>
          <a class="btn" href="javascript:;">建设银行</a>
          <a class="btn" href="javascript:;">农业银行</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.xtx-pay-page {
  margin-top: 20px;
}

.pay-info {
  background: #fff;
  display: flex;
  align-items: center;
  height: 350px;
  padding: 0 80px;

  .icon {
    font-size: 80px;
    color: #1dc779;
  }

  .tip {
    padding-left: 10px;
    flex: 1;

    p {
      &:first-child {
        font-size: 20px;
        margin-bottom: 5px;
      }

      &:last-child {
        color: #999;
        font-size: 16px;
      }
    }
  }

  .amount {
    span {
      &:first-child {
        font-size: 16px;
        color: #999;
      }

      &:last-child {
        color: #ef1f1f;
        font-size: 20px;
      }
    }
  }
}

.pay-type {
  margin-top: 20px;
  background-color: #fff;
  padding-bottom: 70px;

  p {
    line-height: 70px;
    height: 70px;
    padding-left: 30px;
    font-size: 16px;

    &.head {
      border-bottom: 1px solid #f5f5f5;
    }
  }

  .btn {
    width: 150px;
    height: 50px;
    border: 1px solid #e4e4e4;
    text-align: center;
    line-height: 48px;
    margin-left: 30px;
    color: #666666;
    display: inline-block;

    &.active,
    &:hover {
      border-color: #666666;
    }

    &.alipay {
      background: url(https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/7b6b02396368c9314528c0bbd85a2e06.png)
        no-repeat center / contain;
    }

    &.wx {
      background: url(https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c66f98cff8649bd5ba722c2e8067c6ca.jpg)
        no-repeat center / contain;
    }
  }
}
</style>
