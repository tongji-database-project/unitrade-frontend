<script setup lang="ts">
import { getImageUrl } from '@/utils/utils';

const props = defineProps({
  user_id: { type: String, required: true },
  content: { type: String, required: true },
  time: { type: String, required: true },
})

// TODO: 状态管理器中除了保存 token 外还需要保存用户 ID 方便调用

// 假定当前登录用户的 ID 为 1234
const is_self = props.user_id === '1234'
const avatar = is_self
  ? getImageUrl('avatar.jpg')
  : getImageUrl('avatar2.jpg')
console.log(props.user_id, props.content)
</script>

<template>
  <div class="single-message" :class="{ 'self-message': is_self }">
    <el-avatar :size="45" :src="avatar"></el-avatar>
    <div class="bubble-triangle" :class="{ 'self-message': is_self }"></div>
    <div class="message-box" :class="{ 'self-message': is_self }">
      {{ content }}
    </div>
    <div class="message-time" :class="{ 'self-message': is_self }">
      <span>{{ time }}</span>
    </div>
  </div>
</template>

<style scoped>
.single-message {
  --sender-background: #e0f4ff;
  --receiver-background: #efefef;

  display: flex;
  flex-wrap: wrap;
}

.single-message.self-message {
  flex-direction: row-reverse;
}

.bubble-triangle {
  --bubble-offset: -0.2rem;

  width: 0;
  height: 0;
  margin-left: var(--bubble-offset);
  position: relative;
  top: 1rem;
  border-width: .5rem;
  border-style: solid;
  border-color: transparent var(--receiver-background) transparent transparent;
}

.bubble-triangle.self-message {
  margin-left: 0;
  margin-right: var(--bubble-offset);
  border-color: transparent transparent transparent var(--sender-background);
}

.message-box {
  border-radius: .5rem;
  background-color: var(--receiver-background);
  padding: .7rem 1rem;
  /*margin-top: .3rem;
  margin-left: .6rem;*/
  min-width: 30%;
  /* 消息框最大不能超过对话窗口减去两个头像和其他间距的宽度 */
  max-width: calc(100% - 110px);
  font-size: large;
}

.message-box.self-message {
  background-color: var(--sender-background);
  /*margin-right: .6rem;*/
}

.message-time {
  --time-offset: 65px;

  width: 80%;
  margin-left: var(--time-offset);
  display: flex;
  justify-content: left;
}

.message-time.self-message {
  margin-right: var(--time-offset);
  justify-content: right;
}
</style>
