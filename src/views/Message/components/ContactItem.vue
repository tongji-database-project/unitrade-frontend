<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getImageUrl } from '@/utils/utils'
import { getLatestMessage } from '@/apis/message'
import { getOtherUserInfo } from '@/apis/user'

const props = defineProps({
  user_id: { type: String, required: true },
  is_active: { type: Boolean, required: true }
})

const avatar_path = ref<string>()
const user_name = ref<string>()
const content = ref<string>()

const getCurrentContactInfo = async (user_id: string) => {
  const latest_message = await getLatestMessage(user_id)
  const user_info = await getOtherUserInfo(user_id)
  avatar_path.value = getImageUrl(user_info.avatar)
  console.log(latest_message)
  if (latest_message === undefined) {
    user_name.value = 'Error'
    content.value = 'Unknown'
  } else {
    user_name.value = latest_message.username
    content.value = latest_message.content
  }
}

onMounted(() => {
  getCurrentContactInfo(props.user_id)
})
</script>

<template>
  <div class="contact-card" :class="{ 'is-active': is_active }">
    <el-avatar class="contact-avatar" :size="40" :src="avatar_path"></el-avatar>

    <div class="contact-info">
      <div class="contact-user">{{ user_name }}</div>
      <div class="contact-msg">{{ content }}</div>
    </div>
  </div>
</template>

<style scoped>
.contact-card {
  margin: 0.2rem;
  padding: 0.5rem;
  border-radius: 0.7rem;
  display: flex;
  align-items: center;
}

.contact-card.is-active {
  background-color: #ddd;
}

.contact-avatar {
  margin-right: 0.5rem;
}

.contact-user {
  font-weight: bold;
  font-size: 1.2em;
}
</style>
