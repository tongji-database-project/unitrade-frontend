<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { ref, reactive, onMounted, computed } from 'vue'
import { getImageUrl } from '@/utils/utils'
import {getMerchandiseCardAPI} from '@/apis/home'
import {getSellerIdAPI} from '@/apis/merchandise'
import {getDetailPictureAPI} from '@/apis/merchandise'
import { useCartStore } from '@/stores/cartStore'; // 引入购物车store
import { ElMessage } from 'element-plus'; // 引入Element Plus的ElMessage组件
import ImageView from '@/components/ImageView.vue'
import SellerCard from '@/components/SellerCard.vue'

const data = reactive({})

const router = useRouter()
const route = useRoute()
const cartStore = useCartStore(); // 获取购物车store实例

const meichandise_cover = ref<string>()
const meichandise_name = ref<string>()
const meichandise_price = ref<number>()
const meichandise_detail_name = ref<string>()
const seller_id = ref<string>()
const detail_picture = ref<string[]>()

const loadInfo = async () => {
  const info= await getMerchandiseCardAPI(route.params.id as string)
  meichandise_cover.value = getImageUrl(info.image)
  meichandise_name.value = info.name
  meichandise_detail_name.value = info.detail
  meichandise_price.value = info.price

  const seller_info = await getSellerIdAPI(route.params.id as string)
  seller_id.value = seller_info
  console.log(`seller_id: ${seller_id.value}`)

  const detail_info = await getDetailPictureAPI(route.params.id as string)
  detail_picture.value = detail_info.map((pic: string) => getImageUrl(pic))
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

// 添加商品到购物车
const addCart = async () => {
  try {
    const cartItem = {
      merchandise_id: route.params.id as string,
      merchandise_name: meichandise_name.value!,
      merchandise_price: meichandise_price.value!,
      picture: meichandise_cover.value!,
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
      <SellerCard :seller_id="seller_id!" :key="seller_id" />
    </div>
    <div class="info-container">
      <div class="goods-info">
        <div class="media">
          <!-- <ImageView :imageList="meichandise_cover!" /> -->
          <el-image class="cover" :src="meichandise_cover" fit="cover" />
        </div>
        <div class="spec">
          <p class="g-name">{{ meichandise_name }}</p>
          <p class="g-detail-name">{{meichandise_detail_name }}</p>
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
          <div class="box">
            <el-button size="large" class="btn" @click="addCart"> 加入购物车 </el-button>
            <p class="icon-comment-filling" @click="router.push(`/comments/${route.params.id}`)">查看评价></p>
          </div>
        </div>
      </div>

      <el-divider border-style="double" />
    </div>
    <div class="goods-detail">
      <p class="detail-name">商品详情</p>
      <div class="detail-content">
        <div v-for="(image, index) in detail_picture" :key="index">
          <el-image class="detail-picture" :src="image" fit="cover" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.xtx-goods-page {
  /* .seller-info {
    width: 100%;
    height: 80px;
    border: 2px solid #ccc;
    border-radius: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-right: 50px;
  } */

  .goods-info {
    height: 450px;
    background: #fff;
    display: flex;

    .media {
      width: 500px;
      height: 470px;
      padding: 30px 50px;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      position: relative;

      .cover {
        width: 100%;       /* 图片宽度为父容器的 100% */
        height: 100%;      /* 图片高度为父容器的 100% */
        object-fit: cover; /* 使图片覆盖整个容器。保持比例填充 */
      }
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

      .box{
        display: flex;
       flex-direction: row;

        .btn {
          margin-top: 40px;
        }

        .icon-comment-filling{
           font-size: 15px;
           padding:40px;
           margin-left:auto;

           &:hover {
            color: #4ecd96;
            cursor: pointer;
          }
      }
      }
    }
  }

  .goods-detail{

    .detail-name{
      font-size: 22px;
    }

    .detail-content{
      /* background-color: #e1e1e1; */
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;             /* Adjust based on your requirement */
      padding:20px;

      .detail-picture{
        width: 500px;           
        height: 600px;
      }
    }
  }

  /*.comment {
    height: 180px;
    position:relative;
    display: flex;


    .icon-comment-filling{
      font-size: 20px;
      padding:10px;
      margin-left:auto;

      &:hover {
            color: #4ecd96;
            cursor: pointer;
          }
    }

  } */
}
</style>
