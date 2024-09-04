<script setup lang="ts">
const props = defineProps({
  my_id: { type: String, required: true },
  user_id: { type: String, required: true },
  avatar: { typs: String, required: true },
  content: { type: String, required: true },
  time: { type: String, required: true }
})

const is_self = props.user_id === props.my_id
</script>

<template>
  <div class="single-message" :class="{ 'self-message': is_self }">
    <el-avatar :size="45" :src="props.avatar"></el-avatar>
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
  border-width: 0.5rem;
  border-style: solid;
  border-color: transparent var(--receiver-background) transparent transparent;
}

.bubble-triangle.self-message {
  margin-left: 0;
  margin-right: var(--bubble-offset);
  border-color: transparent transparent transparent var(--sender-background);
}

.message-box {
  border-radius: 0.5rem;
  background-color: var(--receiver-background);
  padding: 0.7rem 1rem;
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
