<template>
  <div class="user-info">
    <img :src="avatar" :alt="user.name" />
    <h2>{{ user.name }}</h2>
    <p>信誉值: {{ user.reputation }}</p>
  </div>
</template>

<script>
export default {
  name: 'UserInfo',
  props: {
    user: {
      type: Object,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.user-info {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}

.user-info img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.user-info h2 {
  margin: 0;
  font-size: 1.5em;
  font-weight: bold;
}

.user-info p {
  margin: 0;
  color: gray;
}
</style>
