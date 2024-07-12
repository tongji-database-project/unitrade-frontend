<template>
  <div class="user-info">
    <img :src="defaultAvatar" alt="用户头像">
    <div class="user-details">
      <h2>{{ user.name }}</h2>
      <p>信誉度：{{ user.reputation }}</p>
      <p>销售次数：{{ user.salesCount }}</p>
    </div>
  </div>
</template>

<script>
import defaultAvatar from '../images/gclt.jpg';

export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      defaultAvatar,
    };
  },
};
</script>

<style scoped>
.user-info {
  display: flex;
  align-items: center;
  width: 100%;
}

.user-info img {
  border-radius: 50%;
  width: 100px;
  height: 100px;
  margin-right: 20px;
}

.user-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.user-details h2 {
  font-weight: bold;
  margin: 0;
  font-size: 1.5em;
}

.user-details p {
  margin: 5px 0;
  font-size: 1em;
  font-weight: 600;
}
</style>
