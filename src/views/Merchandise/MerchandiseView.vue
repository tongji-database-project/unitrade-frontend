<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { ref, reactive, onMounted } from 'vue'
import { getImageUrl } from '@/utils/utils'
import {getMerchandiseCardAPI} from '@/apis/home'
import {getSellerInfoAPI} from '@/apis/merchandise'
import { useCartStore } from '@/stores/cartStore'; // 引入购物车store
import { useUserStore } from '@/stores/userStore'; // 引入用户store
import { ElMessage } from 'element-plus'; // 引入Element Plus的ElMessage组件
import ImageView from '@/components/ImageView.vue'

const data = reactive({})

const router = useRouter()
const route = useRoute()
const cartStore = useCartStore(); // 获取购物车store实例

const meichandise_cover = ref<string>()
const meichandise_name = ref<string>()
const meichandise_price = ref<number>()
const seller_cover = ref<string>()
const seller_id = ref<string>()
const seller_name = ref<string>()
const seller_reputation = ref<number>()
const star_score = ref<number>()

const loadInfo = async () => {
  const info= await getMerchandiseCardAPI(route.params.id as string)
  meichandise_cover.value = getImageUrl(info.image)
  meichandise_name.value = info.name
  meichandise_price.value = info.price / 100

  const seller_info = await getSellerInfoAPI(route.params.id as string)
  seller_cover.value = getImageUrl(seller_info.image)
  seller_id.value = seller_info.id
  seller_name.value = seller_info.name
  seller_reputation.value = seller_info.reputation
  star_score.value = seller_info.reputation / 20
}

// 商品数量
const count = ref(1);
const countChange = (countValue: any) => {
  console.log(countValue);
  count.value = countValue; // 更新数量
};

// const info_list = [
//   { id: '1', name: '杯子', price: 99.0 },
//   // Add more images as needed
// ]
const userStore = useUserStore(); // 获取用户状态

// 添加商品到购物车
const addCart = async () => {
  try {
    const cartItem = {
      customer_id: userStore.userInfo.value.id,
      merchandise_id: props.merchandise_id,
      merchandise_name: meichandise_name.value,
      merchandise_price: meichandise_price.value,
      picture: meichandise_cover.value,
      quanity: count.value,
      cart_time: new Date().toISOString(),
      selected: true // 初始状态为选中
    };

    // 使用cartStore的方法来添加商品到购物车
    await cartStore.addProductToCart(cartItem);
    // 添加成功后显示成功消息
    ElMessage({
      message: '商品已成功添加到购物车！',
      type: 'success',
    });
  } catch (error) {
    console.error('请求添加购物车失败:', error);
    // 如果添加失败，也可以显示错误消息
    ElMessage({
      message: '添加购物车失败，请重试。',
      type: 'error',
    });
  }
};

onMounted(() => {
  // 调取数据的代码
  loadInfo()
})
</script>

<template>
  <div class="xtx-goods-page">
    <div class="seller-info">
      <div class="avatar">
        <el-avatar :size="40" :src="seller_cover"></el-avatar>
      </div>
      <div class="seller-name">
        <p class="p-name">{{ seller_name }}</p>
      </div>
      <div class="reputation">
        <el-rate v-model="star_score" disabled text-color="#ff9900" />
        <el-text class="re-value" size="small">信誉值:{{ seller_reputation }}/100</el-text>
      </div>
      <div class="seller-botton">
        <el-button type="primary" @click="router.push(`/profile/${seller_id}`)">查看商家</el-button>
        <el-button type="primary" @click="router.push(`/message/${seller_id}`)">联系商家</el-button>
      </div>
    </div>
    <div class="info-container">
      <div class="goods-info">
        <div class="media">
          <ImageView :imageList="meichandise_cover!" />
          <!-- <el-image class="cover" :src="meichandise_cover" fit="cover" /> -->
        </div>
        <div class="spec">
          <p class="g-name">{{ meichandise_name }}</p>
          <div class="g-price">
            <p class="now-price">¥{{ meichandise_price?.toFixed(2) }}</p>
            <p class="old-price">¥{{ meichandise_price?.toFixed(2) }}</p>
          </div>
          <div class="g-service">
            <dl>
              <dt>配送</dt>
              <dd>快递: 免运费 现货，付款后48小时内发货</dd>
            </dl>
            <dl>
              <dt>服务</dt>
              <dd>
                <span>无忧退货</span>
                <span>快速退款</span>
                <span>免费包邮</span>
              </dd>
            </dl>
          </div>

          <!-- 数据组件 -->
          <el-input-number class="count" v-model="count" @change="countChange" />
          <!-- 按钮组件 -->
          <div>
            <el-button size="large" class="btn" @click="addCart"> 加入购物车 </el-button>
          </div>
        </div>
      </div>

      <el-divider border-style="double" />

      <div class="comment">
        <p class="comment-name">评价</p>
        <p class="icon-comment-filling" @click="router.push(`/comments/${route.params.id as string}`)">查看评价></p>
        <!-- <p class="comment-name">评价</p> -->
        <!-- <el-table-column prop="啦啦啦" width="150" />   -->
  
      </div>
    </div>
  </div>
</template>

<style scoped>
.xtx-goods-page {
  .seller-info {
    width: 100%;
    height: 80px;
    border: 2px solid #ccc;
    border-radius: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-right: 50px;

    .avatar {
      padding: 30px 60px;
    }

    .p-name {
      font-size: 22px;
    }

    .reputation {
      padding: 50px;

      .re-value {
        padding: 20px;
      }
    }
    .seller-botton {
      display: flex;
      flex-direction: row;
      margin-left: auto;
    }
  }

  .goods-info {
    height: 450px;
    background: #fff;
    display: flex;

    .media {
      width: 580px;
      height: 600px;
      padding: 30px 50px;
    }

    .spec {
      flex: 1;
      padding: 30px 30px 30px 0;

      .g-name {
        font-size: 30px;
      }

      .g-price {
        display: flex;
        flex-direction: row;

        .now-price {
          margin-top: 10px;
          color: #d41919;
          margin-right: 10px;
          font-size: 40px;
        }

        .old-price {
          margin-top: 28px;
          color: #999;
          text-decoration: line-through;
          font-size: 25px;
        }
      }

      .g-service {
        background: #f5f5f5;
        width: 100%;
        padding: 20px 10px 0 10px;
        margin-top: 10px;

        dl {
          padding-bottom: 20px;
          display: flex;
          align-items: center;

          dt {
            width: 50px;
            color: #999;
          }

          dd {
            color: #666;

            &:last-child {
              span {
                margin-right: 10px;

                &::before {
                  content: '•';
                  margin-right: 2px;
                }
              }
            }
          }
        }
      }

      .count {
        margin-top: 40px;
      }

      .btn {
        margin-top: 40px;
      }
    }
  }

  .comment-name{
      font-size: 30px;
    }

  .comment {
    height: 180px;
    position:relative;
    display: flex;
    /* border: 2px solid #ccc;
    border-radius: 20px; */

    .comment-name{
      font-size: 30px;
    }

    .icon-comment-filling{
      font-size: 20px;
      padding:10px;
      margin-left:auto;

      &:hover {
            color: #4ecd96;
            cursor: pointer;
          }
    }

  }
}
</style>
