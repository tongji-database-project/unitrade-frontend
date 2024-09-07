<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, reactive, onMounted } from 'vue'
import { getImageUrl } from '@/utils/utils'
import {getCommentCardAPI} from '@/apis/merchandise'

const props = defineProps({
  comment_id: { type: String, required: true }
})

const data = reactive({})

const router = useRouter()
const avatar = ref<string>()
const name = ref<string>()
const content = ref<string>()
const com_quality = ref<number>()
const com_attitude = ref<number>()
const com_price = ref<number>()
const com_logistic_speed = ref<number>()
const com_conformity = ref<number>()

const modalOpen = ref(false)
const currentImage = ref('')

const loadInfo = async () => {
  const info= await getCommentCardAPI(props.comment_id)
  console.log(info)
  avatar.value = getImageUrl(info.user_avatar)
  name.value = info.user_name
  content.value = info.content
  com_quality.value = info.quality
  com_attitude.value = info.attitude
  com_price.value = info.price
  com_logistic_speed.value = info.logistic_speed
  com_conformity.value = info.conformity
}

const openModal = (image: string) => {
  currentImage.value = image;
  modalOpen.value = true;
};

const closeModal = () => {
  modalOpen.value = false;
  currentImage.value = '';
};

onMounted(() => {
  // 调取数据的代码
  loadInfo()

  // cover.value = getImageUrl('cola.jpg')
  // info_list.forEach((item) => {
  //   if (item.id === props.merchandise_id) {
  //     name.value = item.name
  //     price.value = item.price
  //   }
  // })
})
</script>

<template>
    <div class="comment-header">
        <div class ="avatar">
            <el-avatar :size="40" :src="avatar"></el-avatar>
        </div>
        <div class ="user-name">
            <p class="p-name"> {{ name }} </p>
        </div>
        <div v-if="com_quality! < 6"class ="scores">
          <p class ="quality">质量：</p>
          <el-rate v-model="com_quality" disabled text-color="#ff9900" />
          <p class ="attitude">服务态度：</p>
          <el-rate v-model="com_attitude" disabled text-color="#ff9900" />
          <p class ="price">价格实惠度：</p>
          <el-rate v-model="com_price" disabled text-color="#ff9900" />
          <p class ="logistic_speed">物流速度：</p>
          <el-rate v-model="com_logistic_speed" disabled text-color="#ff9900" />
          <p class ="conformity">满意度：</p>
          <el-rate v-model="com_conformity" disabled text-color="#ff9900" />
        </div>
    </div>
    <!-- <el-divider border-style="double" /> -->
    <div class="comment-body">
        <p class="content"> {{ content }} </p>
        <!-- <div class="gallery">
        <div 
            v-for="(image, index) in i" 
            :key="index" 
            class="thumbnail" 
            @click="openModal(image.img)"
        >
            <img :src="image.img" alt="thumbnail" />
        </div>
        </div>
        <div v-if="modalOpen" class="modal-overlay" @click="closeModal">
            <div class="modal-content" @click.stop>
                <span class="close-btn" @click="closeModal">&times;</span>
                <img :src="currentImage" alt="fullsize" />
            </div>
        </div> -->
    </div>

    <el-divider border-style="double" />
</template>

<style>
 .comment-header {
    display: flex;
    flex-direction: row;
    padding:10px;
    /* border: 2px solid #ccc;
    border-radius: 20px; */

     .avatar{
      padding: 8px;
    } 

    .user-name{
      .p-name{
        font-size: 20px;
        padding: 14px; 
      }
    }

    .scores{
      display: flex;
    flex-direction: row;
    padding:10px;

    }
}

.comment-body{
  padding-left: 20px;

    /* .gallery {
  display: flex;
  justify-content: space-around;
  padding: 20px;
    }

.thumbnail img {
  width: 150px; 
  height: 100px; 
  cursor: pointer;
  object-fit: cover;
} */

/* .modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  position: relative;
  max-width: 80%;
  max-height: 80%;
}

.modal-content img {
  max-width: 100%;
  max-height: 100%;
} */

/* .close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  color: #fff;
  cursor: pointer;
} */
} 
</style>
