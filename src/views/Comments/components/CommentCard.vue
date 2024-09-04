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
const content = ref<number>()
const pictures = ref<string[]>()
//const time = ref<DateTime>()

const modalOpen = ref(false)
const currentImage = ref('')

const loadInfo = async () => {
  const info= await getCommentCardAPI(props.comment_id)
  console.log(info)
  avatar.value = getImageUrl(info.user_avatar)
  name.value = info.user_name
  content.value = info.content
  //time.value = info.time
  pictures.value = info.pictures.map((pic: string) => getImageUrl(pic))
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
    </div>
    <div class="comment-body">
        <p class="content"> {{ content }} </p>
        <div class="gallery">
        <div 
            v-for="(image, index) in pictures" 
            :key="index" 
            class="thumbnail" 
            @click="openModal(image)"
        >
            <img :src="image" alt="thumbnail" />
        </div>
        </div>
        <div v-if="modalOpen" class="modal-overlay" @click="closeModal">
            <div class="modal-content" @click.stop>
                <span class="close-btn" @click="closeModal">&times;</span>
                <img :src="currentImage" alt="fullsize" />
            </div>
        </div>
    </div>


</template>

<style>
.comment-header {
    display: flex;
    flex-direction: row;
}

.comment-body{
    .gallery {
  display: flex;
  justify-content: space-around;
  padding: 20px;
}

.thumbnail img {
  width: 150px; /* Adjust width as needed */
  height: 100px; /* Adjust height as needed */
  cursor: pointer;
  object-fit: cover;
}

.modal-overlay {
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
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  color: #fff;
  cursor: pointer;
}
}
</style>
