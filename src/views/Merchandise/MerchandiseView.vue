<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, reactive, onMounted } from 'vue'
import { getImageUrl } from '@/utils/utils'

const props = defineProps({
  merchandise_id: { type: String, required: true }
})

const data = reactive({})

const router = useRouter()

// count
const count = ref(1)
const countChange = (count: any) => {
  console.log(count)
}

// 根据 merchandise_id 去数据库中调取商品元信息
const cover = ref<string>()
const name = ref<string>()
const price = ref<number>()

const info_list = [
  { id: '1', name: '杯子', price: 99.0 },
  // Add more images as needed
]

// 添加购物车
const addCart = () => {
//   if (skuObj.skuId) {
//     console.log(skuObj, cartStore.addCart)
//     // 规则已经选择  触发action
//     cartStore.addCart({
//       id: goods.value.id,
//       name: goods.value.name,
//       picture: goods.value.mainPictures[0],
//       price: goods.value.price,
//       count: count.value,
//       skuId: skuObj.skuId,
//       attrsText: skuObj.specsText,
//       selected: true
//     })
//   } else {
//     // 规格没有选择 提示用户
//     ElMessage.warning('请选择规格')
//   }
 }

onMounted(() => {
  // 调取数据的代码

  cover.value = getImageUrl('cola.jpg')
  info_list.forEach((item) => {
    if (item.id === props.merchandise_id) {
      name.value = item.name
      price.value = item.price
    }
  })
})
</script>

<template>
  <div class="xtx-goods-page">
    <div class="info-container">
      <div class="goods-info">
        <div class="media">
          <el-image class="cover" :src="cover" fit="cover" />
        </div>
        <div class="spec">
          <p class="g-name"> {{ name }} </p>
          <p class="g-price"> {{ price }} </p>

          <!-- 数据组件 -->
          <el-input-number v-model="count" @change="countChange" />
          <!-- 按钮组件 -->
          <div>
            <el-button size="large" class="btn" @click="addCart">
              加入购物车
            </el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="goods-footer">
      <nav>
         <a>商品详情</a>
      </nav>
    </div>
  </div>
</template>

<style scoped>
.xtx-goods-page {
  .goods-info {
    min-height: 600px;
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
    }
  }

  .goods-footer {
    display: flex;
    margin-top: 20px;    
    width: 940px;
    margin-right: 20px;
  }

  /* .number-box {
    display: flex;
    align-items: center;

    .label {
      width: 60px;
      color: #999;
      padding-left: 10px;
    }
  } */

  .g-name {
    font-size: 22px;
  }

  .g-price {
    margin-top: 10px;

    span {
      &::before {
        content: "¥";
        font-size: 14px;
      }

      color: #fe3e3e;
      margin-right: 10px;
      font-size: 22px;
      
    }
  }

}

</style>
