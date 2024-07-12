<template>
  <div class="items-for-sale">
    <div v-for="item in items" :key="item.id" class="item-card">
      <h4>{{ item.name }}</h4>
      <p>价格: ￥{{ item.price }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.items-for-sale {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.item-card {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  width: 150px;
  text-align: center;
  background-color: white;
}
</style>
