<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { ref, reactive, onMounted } from 'vue'
import { getImageUrl } from '@/utils/utils'
import {getSellerInfoAPI} from '@/apis/merchandise'

const props = defineProps({
  seller_id: { type: String, required: true }
})

const router = useRouter()
const route = useRoute()

const seller_cover = ref<string>()
const seller_name = ref<string>()
const seller_reputation = ref<number>()
const star_score = ref<number>()

const loadInfo = async () => {
  const seller_info = await getSellerInfoAPI(props.seller_id)
  console.log("test: ", seller_info, "id: ", props.seller_id)
  seller_cover.value = getImageUrl(seller_info.image)
  seller_name.value = seller_info.name
  seller_reputation.value = seller_info.reputation
  star_score.value = seller_info.reputation / 20
}

onMounted(() => {
  // 调取数据的代码
  loadInfo()
})
</script>

<template>   
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
</template>

<style scoped>
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
</style>