<template>
  <div class="user-info">
    <img :src="defaultAvatar" alt="用户头像">
    <div>
      <h2>{{ user.name }}</h2>
      <p>信誉度：{{ user.reputation }}</p>
      <p>销售次数：{{ user.salesCount }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      defaultAvatar: require('../images/gclt.jpg'),
    };
  },
};
</script>

<style scoped>
.user-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.user-info img {
  border-radius: 50%;
  width: 100px;
  height: 100px;
  margin-right: 20px;
}
</style>
