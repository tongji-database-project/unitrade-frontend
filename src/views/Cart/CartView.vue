<script setup lang="ts">
import { useCartStore } from '@/stores/cartStore';
import { computed, onMounted } from 'vue';
// import { useRouter } from 'vue-router';
import { getImageUrl } from '@/utils/utils'

const cartStore = useCartStore();
// const router = useRouter();

// 全选回调
const allCheck = async (selected: boolean) => {
  // 遍历所有商品，更新每个商品的选中状态
  for (let item of cartStore.cartItems!) {
    await cartStore.updateProductInCart({
      ...item,
      merchandise_id: item.merchandise_id, // 确保拼写正确
      quanity: item.quanity,
      selected: selected, // 将 selected 传入
    })
  }
};

// 删除购物车项
const delCart = (item: any) => {
  cartStore.removeProductFromCart(item.merchandise_id);
};

// 计算属性
const cartItems = computed(() => cartStore.cartItems);
const isAllSelected = computed(() => cartItems.value!.length > 0 && cartItems.value!.every(item => item.selected));
const totalCount = computed(() => cartItems.value!.reduce((acc, item) => acc + item.quanity, 0));
const selectedCount = computed(() => cartItems.value!.filter(item => item.selected).reduce((acc, item) => acc + item.quanity, 0));
const selectedPrice = computed(() => cartItems.value!.filter(item => item.selected).reduce((acc, item) => acc + item.merchandise_price * item.quanity, 0));

// 组件挂载时加载购物车数据
onMounted(() => {
  cartStore.loadCart();
});
</script>

<template>
  <div class="xtx-cart-page">
    <div class="container m-top-20">
      <div class="cart">
        <table>
          <thead>
            <tr>
              <th width="120">
                 <!-- 全选框 -->
                <el-checkbox :model-value="isAllSelected" @change="allCheck" />
              </th>
              <th width="400">商品信息</th>
              <th width="220">单价</th>
              <th width="180">数量</th>
              <th width="180">小计</th>
              <th width="140">操作</th>
            </tr>
          </thead>
          <!-- 商品列表 -->
          <tbody>
            <tr v-for="(i, index) in cartItems" :key="index">
              <td>
                <!-- 单选框，使用 v-model 双向绑定商品的选中状态 -->
                <el-checkbox v-model="i.selected" @change="(selected: boolean) => cartStore.updateProductInCart({ ...i, selected })" />
              </td>
              <td>
                <div class="goods">
                  <RouterLink to="/">
                    <img :src="getImageUrl(i.picture)" :alt="i.merchandise_name" />
                  </RouterLink>
                  <div>
                    <p class="name ellipsis">
                      {{ i.merchandise_name }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="tc">
                <p>&yen;{{ i.merchandise_price.toFixed(2) }}</p>
              </td>
              <td class="tc">
                <el-input-number v-model="i.quanity" @change="(value: number) => cartStore.updateProductInCart({ ...i, quanity: value })" />
              </td>
              <td class="tc">
                <p class="f16 red">&yen;{{ (i.merchandise_price * i.quanity).toFixed(2) }}</p>
              </td>
              <td class="tc">
                <p>
                  <el-popconfirm title="确认删除吗?" confirm-button-text="确认" cancel-button-text="取消" @confirm="() => delCart(i)">
                    <template #reference>
                      <a href="javascript:;">删除</a>
                    </template>
                  </el-popconfirm>
                </p>
              </td>
            </tr>
            <tr v-if="cartItems!.length === 0">
              <td colspan="6">
                <div class="cart-none">
                  <el-empty description="购物车列表为空">
                    <el-button type="primary" @click="$router.push('/')">随便逛逛</el-button>
                  </el-empty>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 操作栏，固定在页面右下角 -->
    <div class="action fixed-action" v-if="cartItems!.length > 0">
      <div class="batch">
        共 {{ totalCount }} 件商品，已选择 {{ selectedCount }} 件，商品合计：
        <span class="red">¥ {{ selectedPrice.toFixed(2) }} </span>
      </div>
      <div class="total">
        <el-button size="large" type="primary" @click="$router.push('/checkout')">下单结算</el-button>
      </div>
    </div>
  </div>
</template>


<style scoped>
.xtx-cart-page {
  margin-top: 20px;
  position: relative; /* 允许子元素使用绝对定位 */

  .cart {
    background: #fff;
    color: #666;

    table {
      border-spacing: 0;
      border-collapse: collapse;
      line-height: 24px;

      th,
      td {
        padding: 10px;
        border-bottom: 1px solid #f5f5f5;

        &:first-child {
          text-align: left;
          padding-left: 30px;
          color: #999;
        }
      }

      th {
        font-size: 16px;
        font-weight: normal;
        line-height: 50px;
      }
    }
  }

  .cart-none {
    text-align: center;
    padding: 120px 0;
    background: #fff;

    p {
      color: #999;
      padding: 20px 0;
    }
  }

  .tc {
    text-align: center;

    .xtx-numbox {
      margin: 0 auto;
      width: 120px;
    }
  }

  .red {
    color: #e61818;
  }

  .f16 {
    font-size: 16px;
  }

  .goods {
    display: flex;
    align-items: center;

    img {
      width: 100px;
      height: 100px;
    }

    > div {
      width: 280px;
      font-size: 16px;
      padding-left: 10px;

      .attr {
        font-size: 14px;
        color: #999;
      }
    }
  }

  .action {
    display: flex;
    background: #fff;
    margin-top: 20px;
    height: 80px;
    align-items: center;
    font-size: 16px;
    justify-content: space-between;
    padding: 0 30px;

    .xtx-checkbox {
      color: #999;
    }

    .batch {
      a {
        margin-left: 20px;
      }
    }

    .red {
      font-size: 18px;
      margin-right: 20px;
      font-weight: bold;
    }

    /* 固定在页面右下角 */
    &.fixed-action {
      position: fixed;
      bottom: 20px;
      right: 20px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      z-index: 1000; /* 确保在其他元素上方 */
    }
  }

  .tit {
    color: #666;
    font-size: 16px;
    font-weight: normal;
    line-height: 50px;
  }
}
</style>
