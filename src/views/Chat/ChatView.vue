<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { FormInstance } from 'element-plus'
import NormalMessage from './components/NormalMessage.vue'
import type { Message } from '@/utils/interfaces'

defineProps(['user_id'])
const emit = defineEmits(['newUserId'])

const route = useRoute()

// TODO: 需要检查当前用户与 user_id 对应用户是否已有私聊记录
// 如果没有则需要在个人主页进入私聊界面前新建一个私聊记录

const user_info = ref<string | undefined>('in')
const inputFormRef = ref<FormInstance>()
const new_msg = reactive<Message>({
  sender: '1234',
  receiver: '',
  content: '',
  time: '',
})

// 假定当前登录用户的 ID 为 1234
const messages: Message[] = [
  {
    sender: '1234',
    receiver: '2536',
    content: 'hi 原杂食笔在面，啊象还才演全章杨。身完具死乙县材致确变这，我看部洲宪饭适乙受士央。哪某靠命贵识密随益搞假，完艺怀胞会主半令等房小。\n名示叶青弱你以张大士解良头约。兴料别黄亮次母依则。训激妒利究语否煤仅於扬，刻老沙北他再。\n联住动且丰及。验联尔物紧派。雨级庆所陆。\n具销布备板矛。习句花足离苏。胶同很类美习科可振映黑危还。够务米半图垂倍紧南或助飞安。聚属答研确岁环拉赶书！定研沿包话修宁。',
    time: '2024-07-17 15:23:33',
  },
  {
    sender: '2536',
    receiver: '1234',
    content: 'hello Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
    time: '2024-07-17 15:24:29',
  },
  {
    sender: '1234',
    receiver: '2536',
    content: 'wow Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam',
    time: '2024-07-17 15:29:17',
  },
  {
    sender: '2548',
    receiver: '1234',
    content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam',
    time: '2024-07-17',
  },
  {
    sender: '1234',
    receiver: '2548',
    content: '一个信息无法正常显示，正在修复',
    time: '2024-07-17',
  },
  {
    sender: '2548',
    receiver: '1234',
    content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et',
    time: '2024-07-17',
  },
]

const relative_messages = ref<Message[]>([])

// 导航后加载聊天记录
watch(() => route.params.user_id, async (user_id) => {
  // 触发 newUserId 事件以让 MessageView 中的相应用户高亮显示
  emit('newUserId', user_id)
  console.log(`Chat with ${user_id}`)

  // TODO: 消息按时间排序还未完成
  relative_messages.value = []
  messages.forEach((message) => {
    if (message.sender === '1234' && message.receiver === user_id
      || message.receiver === '1234' && message.sender === user_id) {
      relative_messages.value.push(message)
    }
  })

  // TODO: 获取当前对话的聊天记录
}, { immediate: true })

// TODO: 提交逻辑未完全完成
const sendMessage = async () => {
  new_msg.receiver = route.params.user_id as string
  console.log(new_msg)

  resetMessage(inputFormRef.value)
}

// 要完成清除功能记得在 el-form-item 标签上加 prop 属性，含义见官网文档
const resetMessage = (form: FormInstance | undefined) => {
  console.log('reset')
  if (!form) return
  form.resetFields()
}
</script>

<template>
  <div v-if="user_id" class="conversation-box">
    <div class="chat-header">用户 {{ user_id }}</div>
    <el-divider />
    <el-scrollbar class="chat-body">
      <div v-if="user_info">
        <div class="message-item" v-for="(message, index) in relative_messages" :key="`${index}${message.time}${message.sender}${message.receiver}`">
          <NormalMessage :user_id="message.sender" :content="message.content" :time="message.time" />
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
          @keyup.ctrl.enter="sendMessage()"
          @keyup.esc="resetMessage(inputFormRef)"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="sendMessage()">发送</el-button>
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
