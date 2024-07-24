<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import ContactItem from './components/ContactItem.vue'
import { getUserInfo } from '@/apis/user';

const router = useRouter()
const relative_contact = ref<string[]>()
const current_contact = ref<string | undefined>();

const changeSession = (user_id: string) => {
  // current_contact.value = user_id
  router.push(`/message/${user_id}`)
}

onMounted(async () => {
  // TODO: 这个列表需要从后端获取
  relative_contact.value = ['2536', '2548', '2357', '3568']
  console.log(await getUserInfo())
})
</script>

<template>
  <h1>用户消息页面（WIP）</h1>
  <div class="container">
    <div class="message-interface">
      <div class="user-list-panel">
        <div
          class="contact-item"
          v-for="(user_id, index) in relative_contact"
          :key="index"
          @click="changeSession(user_id)"
        >
          <ContactItem
            :user_id
            :is_active="user_id === current_contact"
          />
        </div>
      </div>
      <div class="conversation-panel">
        <RouterView v-slot="{ Component }">
          <component :is="Component" @new-user-id="(user_id: string) => current_contact = user_id" />
        </RouterView>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
}

.message-interface {
  width: 60vw;
  height: 70vh;
  min-width: 60rem;
  min-height: 40rem;
  margin: 3rem;
  border: solid 2px grey;
  border-radius: 0.5rem;
  overflow: hidden;
  display: flex;
  box-shadow: .7em .7em 2em #bdbdbd;
}

.message-interface .user-list-panel {
  background-color: #f3f3f3;
  padding-top: 0.3rem;
  padding-left: 0.3rem;
  padding-right: 0.3rem;
  border-right: solid 2px grey;
  width: 15rem;
  min-width: 15rem;

  display: flex;
  flex-direction: column;

  overflow-y: scroll;

  /* 兼容火狐滚动条样式 */
  scrollbar-width: none;
}

/* 隐藏用户列表处的滚动条 */
.message-interface .user-list-panel::-webkit-scrollbar {
  display: none;
}

.message-interface .conversation-panel {
  /* 拉伸填充剩余空间 */
  flex-grow: 1;
}

/* 为各卡片之间添加分割线用
.contact-item {
border-bottom: solid 1px grey;
}
*/
</style>
