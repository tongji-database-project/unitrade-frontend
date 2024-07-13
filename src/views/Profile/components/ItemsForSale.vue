<template>
  <div class="items-for-sale">
    <div v-for="(item, index) in displayedItems" :key="item.id" class="item" @mouseover="hoverIndex = index" @mouseleave="hoverIndex = -1" :style="{ borderColor: hoverIndex === index ? 'red' : 'transparent' }">
      <img :src="item.image" :alt="item.name" />
      <p>{{ item.name }}</p>
      <p>{{ item.price }}</p>
    </div>
    <div class="pagination">
      <span v-for="(page, index) in totalPages" :key="index" :class="{ active: currentPage === index + 1 }" @click="changePage(index + 1)"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemsForSale',
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 8,
      hoverIndex: -1,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    },
    displayedItems() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.items.slice(start, start + this.itemsPerPage);
    },
  },
  methods: {
    changePage(page) {
      this.currentPage = page;
    },
  },
};
</script>

<style scoped>
.items-for-sale {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-around;
  border: 2px solid green;
  padding: 10px;
  box-sizing: border-box;
}

.item {
  width: 23%;
  border: 2px solid transparent;
  padding: 10px;
  text-align: center;
  transition: border-color 0.3s;
}

.item img {
  width: 100%;
  height: auto;
}

.item p {
  margin: 5px 0;
}

.pagination {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.pagination span {
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: gray;
  border-radius: 50%;
  margin: 0 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.pagination span.active {
  background-color: black;
}
</style>
