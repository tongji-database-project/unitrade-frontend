<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import dayjs from 'dayjs'
import { ElMessage } from 'element-plus'
import type { FormInstance } from 'element-plus'
import NormalMessage from './components/NormalMessage.vue'
import type { Message } from '@/utils/interfaces'
import { isBlank } from '@/utils/utils'
import { getMessages, sendMessage } from '@/apis/message'
import { getUserInfo } from '@/apis/user'
import {useTokenStore} from '@/stores/token'

defineProps({
  user_id: { type: String, required: true }
})
const emit = defineEmits(['newUserId'])

const route = useRoute()

// TODO: 进入后停在最下侧

// TODO: 需要检查当前用户与 user_id 对应用户是否已有私聊记录
// 如果没有则需要在个人主页进入私聊界面前新建一个空私聊记录

const logged_in = computed(() => useTokenStore().logged_in)
const my_id = ref('')
const user_name = ref('') // 对方用户名
const inputFormRef = ref<FormInstance>()
const new_msg = reactive<Message>({
  sender: '',
  receiver: route.params.user_id as string,
  content: '',
  time: ''
})

const relative_messages = ref<Message[]>([])

// 导航后加载聊天记录
watch(
  () => route.params.user_id,
  async (user_id) => {
    user_id = user_id as string
    // 触发 newUserId 事件以让 MessageView 中的相应用户高亮显示
    emit('newUserId', user_id)
    console.log(`Chat with ${user_id}`)

    console.log(await getMessages(user_id))
    console.log('over')
    const _messages = await getMessages(user_id)
    user_name.value = _messages.username
    relative_messages.value = []
    relative_messages.value = _messages.contents
  },
  { immediate: true }
)

// TODO: 提交逻辑未完全完成
// /api/message/send_message
const sendNewMessage = async () => {
  if (isBlank(new_msg.content)) {
    ElMessage({
      type: 'warning',
      message: "请勿发送空信息"
    })
    resetMessage(inputFormRef.value)
    return
  }
  new_msg.sender = my_id.value;
  new_msg.time = dayjs().format()
  sendMessage(new_msg)
  // TODO: 发送后调用界面刷新

  resetMessage(inputFormRef.value)
}

// 要完成清除功能记得在 el-form-item 标签上加 prop 属性，含义见官网文档
const resetMessage = (form: FormInstance | undefined) => {
  console.log('reset')
  if (!form) return
  form.resetFields()
}

const load_user_info = async () => {
  const info = await getUserInfo()
  my_id.value = info.id
}

onMounted(() => {
  load_user_info()
})
</script>

<template>
  <div v-if="user_id" class="conversation-box">
    <div class="chat-header">{{ user_name }}</div>
    <el-divider />
    <el-scrollbar class="chat-body">
      <div v-if="logged_in">
        <div
          class="message-item"
          v-for="(message, index) in relative_messages"
          :key="`${index}${message.time}${message.sender}${message.receiver}`"
        >
          <NormalMessage
            :my_id
            :user_id="message.sender"
            :content="message.content"
            :time="message.time"
          />
          <!-- TODO: 计划完成一个特殊消息的推送 -->
        </div>
      </div>
    </el-scrollbar>
    <el-divider />
    <el-form ref="inputFormRef" :model="new_msg">
      <el-form-item prop="content">
        <el-input
          class="chat-input"
          v-model="new_msg.content"
          type="textarea"
          resize="none"
          :rows="5"
          placeholder="请输入"
          @keyup.ctrl.enter="sendNewMessage()"
          @keyup.esc="resetMessage(inputFormRef)"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="sendNewMessage()">发送</el-button>
        <el-button @click="resetMessage(inputFormRef)">清空</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.conversation-box {
  height: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: between;
}

.chat-header {
  font-size: xx-large;
}

.chat-body {
  flex-grow: 1;
  /*background-color: #ddefef;*/
}

/* 调整单条信息间的间距，最后一条信息与底部不增加额外间距 */
.message-item {
  margin-bottom: 1.5rem;

  /*
  &:last-of-type {
    margin-bottom: 0;
  }
  */
}
</style>
