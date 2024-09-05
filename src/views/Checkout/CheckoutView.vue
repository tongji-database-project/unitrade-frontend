<script setup lang="ts">
import { getCheckoutSummaryAPI, createOrderAPI } from '@/apis/checkout'
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useCartStore } from '@/stores/cartStore'
import { useUserStore } from '@/stores/userStore'
import { getImageUrl } from '@/utils/utils'

const cartStore = useCartStore()
const userStore = useUserStore()
const router = useRouter()

// 初始化checkInfo为一个默认对象，而不是null或undefined
const checkInfo = ref({
  user_name: '',
  phone: '',
  address: '', 
  CartItems: [], // 确保CartItems是一个空数组而不是undefined
  total_price: 0,
  shipping_fee: 0,
  grand_total: 0,
});

const isLoading = ref(true); // 用于控制页面加载状态

// 获取用户ID
const userId = userStore.userInfo.id;

// 获取结算信息
const getCheckInfo = async () => {
  try {
    const res = await getCheckoutSummaryAPI(userId);
    if (res.data) {
      checkInfo.value = res.data;
      console.log('结算信息:', checkInfo.value);
    } else {
      // 如果没有返回数据，确保checkInfo有默认值
      checkInfo.value = {   user_name: '', phone: '',  address: '' , CartItems: [], total_price: 0, shipping_fee: 0, grand_total: 0 };
    }
  } catch (error) {
    console.error('获取结算信息失败:', error);
  } finally {
    isLoading.value = false; // 数据加载完成后设置为 false
  }
};

onMounted(() => {
  getCheckInfo();
});

// 创建订单
const createOrder = async () => {
  if (!checkInfo.value) return; // 如果checkInfo为空，直接返回

  try {
    const res = await createOrderAPI({
      goods: checkInfo.value.CartItems.map(item => ({
        merchandise_id: item.merchandise_id,
        quantity: item.quanity
      })),
      addressId: checkInfo.value.address // 使用已简化的地址
    });
    const orderId = res.data.id;
    router.push({ path: '/payment', query: { id: orderId } });
    
    // 更新购物车
    cartStore.loadCart();
  } catch (error) {
    console.error('订单创建失败:', error);
  }
};
</script>

<template>
  <div class="xtx-pay-checkout-page" v-if="!isLoading"> <!-- 仅在数据加载完成后显示页面 -->
    <div class="container">
      <div class="wrapper">
        <!-- 收货地址 -->
        <h3 class="box-title">收货地址</h3>
        <div class="box-body">
          <div class="address">
            <div class="text">
              <div class="none" v-if="!checkInfo.address">您需要先添加收货地址才可提交订单。</div>
              <ul v-else>
                <li><span>收<i />货<i />人：</span>{{ checkInfo.ueser_name }}</li>
                <li><span>联系方式：</span>{{ checkInfo.phone }}</li>
                <li><span>收货地址：</span>{{ checkInfo.address }}</li>
              </ul>
            </div>
          </div>
        </div>
        <!-- 商品信息 -->
        <h3 class="box-title">商品信息</h3>
        <div class="box-body">
          <table class="goods">
            <thead>
              <tr>
                <th width="520">商品信息</th>
                <th width="170">单价</th>
                <th width="170">数量</th>
                <th width="170">小计</th>
                <th width="170">实付</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="i in checkInfo.CartItems" :key="i.merchandise_id">
                <td>
                  <a href="javascript:;" class="info">
                    <img :src="getImageUrl(i.picture)" alt="">
                    <div class="right">
                      <p>{{ i.merchandise_name }}</p>
                    </div>
                  </a>
                </td>
                <td>&yen;{{ i.merchandise_price.toFixed(2) }}</td>
                <td>{{ i.quanity }}</td>
                <td>&yen;{{ (i.merchandise_price * i.quanity).toFixed(2) }}</td>
                <td>&yen;{{ (i.merchandise_price * i.quanity).toFixed(2) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 支付方式 -->
        <h3 class="box-title">支付方式</h3>
        <div class="box-body">
          <a class="my-btn active" href="javascript:;">在线支付</a>
        </div>
        <!-- 金额明细 -->
        <h3 class="box-title">金额明细</h3>
        <div class="box-body">
          <div class="total">
            <dl>
              <dt>商品件数：</dt> 
              <dd>{{ checkInfo?.CartItems?.length || 0 }}件</dd>
            </dl>
            <dl>
              <dt>商品总价：</dt>
              <dd>¥{{ checkInfo?.total_price?.toFixed(2) }}</dd>
            </dl>
            <dl>
              <dt>运<i></i>费：</dt>
              <dd>¥{{ checkInfo?.shipping_fee?.toFixed(2) }}</dd>
            </dl>
            <dl>
              <dt>应付总额：</dt>
              <dd class="price">{{ checkInfo?.grand_total?.toFixed(2) }}</dd>
            </dl>
          </div>
        </div>
        <!-- 提交订单 -->
        <div class="submit">
          <el-button @click="createOrder" type="primary" size="large">提交订单</el-button>
        </div>
      </div>
    </div>
  </div>
  <div v-if="isLoading">正在加载...</div> <!-- 显示加载状态 -->
</template>

<style scoped>
.xtx-pay-checkout-page {
  margin-top: 20px;

  .wrapper {
    background: #fff;
    padding: 0 20px;

    .box-title {
      font-size: 16px;
      font-weight: normal;
      padding-left: 10px;
      line-height: 70px;
      border-bottom: 1px solid #f5f5f5;
    }

    .box-body {
      padding: 20px 0;
    }
  }
}

.address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;

  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;

    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }

    > ul {
      flex: 1;
      padding: 20px;

      li {
        line-height: 30px;

        span {
          color: #999;
          margin-right: 5px;

          > i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }

    > a {
      color: #42b983; /* 直接使用实际的颜色值 */
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }

  .action {
    width: 420px;
    text-align: center;

    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;

      &:first-child {
        margin-right: 10px;
      }
    }
  }
}

.goods {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;

  .info {
    display: flex;
    text-align: left;

    img {
      width: 70px;
      height: 70px;
      margin-right: 20px;
    }

    .right {
      line-height: 24px;

      p {
        &:last-child {
          color: #999;
        }
      }
    }
  }

  tr {
    th {
      background: #f5f5f5;
      font-weight: normal;
    }

    td,
    th {
      text-align: center;
      padding: 20px;
      border-bottom: 1px solid #f5f5f5;

      &:first-child {
        border-left: 1px solid #f5f5f5;
      }

      &:last-child {
        border-right: 1px solid #f5f5f5;
      }
    }
  }
}

.my-btn {
  width: 228px;
  height: 50px;
  border: 1px solid #e4e4e4;
  text-align: center;
  line-height: 48px;
  margin-right: 25px;
  color: #666666;
  display: inline-block;

  &.active,
  &:hover {
    border-color: #000000; /* 使用实际的颜色值 */
    
  }
}

.total {
  dl {
    display: flex;
    justify-content: flex-end;
    line-height: 50px;

    dt {
      i {
        display: inline-block;
        width: 2em;
      }
    }

    dd {
      width: 240px;
      text-align: right;
      padding-right: 70px;

      &.price {
        font-size: 20px;
        color: #ff5722; /* 使用实际的颜色值 */
      }
    }
  }
}

.submit {
  text-align: right;
  padding: 60px;
  border-top: 1px solid #f5f5f5;
}

.addressWrapper {
  max-height: 500px;
  overflow-y: auto;
}

.text {
  flex: 1;
  min-height: 90px;
  display: flex;
  align-items: center;

  &.item {
    border: 1px solid #f5f5f5;
    margin-bottom: 10px;
    cursor: pointer;

    &.active,
    &:hover {
      border-color: #42b983; /* 使用实际的颜色值 */
      background: #e6f7f2; /* 根据实际颜色的更浅版本 */
    }

    > ul {
      padding: 10px;
      font-size: 14px;
      line-height: 30px;
    }
  }
}
</style>

