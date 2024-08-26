<script setup lang="ts">
import { ref } from 'vue'
import { getImageUrl } from '@/utils/utils'

defineProps({
  user_id: { type: String, required: true },
  is_active: { type: Boolean, required: true }
})

const contactItems = [
  {
    user_id: '2536',
    username: 'mony',
    last_message: 'Hello'
  },
  {
    user_id: '2548',
    username: 'zephyrin',
    last_message: 'Bye'
  },
  {
    user_id: '2357',
    username: 'doe',
    last_message: 'Hi'
  },
  {
    user_id: '3568',
    username: 'meoowny',
    last_message: 'Wow'
  }
]

const avatar_path = ref<string>()

avatar_path.value = getImageUrl('avatar2.jpg')

// TODO: 需要改为从后端调取数据
const getCurrentContactInfo = (user_id: string) => {
  const item = contactItems.find((item) => item.user_id === user_id)
  if (item === undefined) {
    console.log(user_id)
    return {
      username: 'Error',
      last_message: 'Unknown'
    }
  } else {
    return item
  }
}
</script>

<template>
  <div class="contact-card" :class="{ 'is-active': is_active }">
    <el-avatar class="contact-avatar" :size="40" :src="avatar_path"></el-avatar>

    <div class="contact-info">
      <div class="contact-user">{{ getCurrentContactInfo(user_id).username }}</div>
      <div class="contact-msg">{{ getCurrentContactInfo(user_id).last_message }}</div>
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
