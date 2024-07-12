<template>
  <div class="items-container">
    <div class="item" v-for="(item, index) in paginatedItems" :key="index">
      <img :src="item.image" :alt="item.name" />
      <div class="item-info">
        <h3>{{ item.name }}</h3>
        <p>{{ item.price }}</p>
      </div>
    </div>
  </div>
  <div class="pagination">
    <span 
      v-for="page in totalPages" 
      :key="page" 
      :class="{ active: currentPage === page }" 
      @click="goToPage(page)"
    ></span>
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
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    },
    paginatedItems() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.items.slice(start, end);
    },
  },
  methods: {
    goToPage(page) {
      this.currentPage = page;
    },
  },
};
</script>

<style scoped>
.items-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.item {
  border: 1px solid #ccc;
  padding: 16px;
  text-align: center;
  transition: border-color 0.3s;
}

.item:hover {
  border-color: red;
}

.item img {
  max-width: 100%;
  height: auto;
}

.pagination {
  text-align: center;
  margin-top: 16px;
}

.pagination span {
  display: inline-block;
  width: 12px;
  height: 12px;
  margin: 0 4px;
  background-color: #ccc;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s;
}

.pagination span.active {
  background-color: #000;
}

.pagination span:hover {
  background-color: #888;
}
</style>
