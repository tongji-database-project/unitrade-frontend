<script setup lang="ts">
import { getImageUrl } from '@/utils/utils'
import MerchandiseCard from '@/components/MerchandiseCard.vue'
import { getMerchandiseIdAPI } from '@/apis/home'
import { onMounted, ref ,computed, nextTick} from 'vue';
import type {Ref} from 'vue';
import { useRoute } from 'vue-router'

const merchandise_id_list: Ref<string[]> = ref([])

const route = useRoute()

const LoadMerchandiseId = async () => {
    console.log("123")
    const myArray = route.query.myArray;

    merchandise_id_list.value = Array.isArray(myArray)
    ? (myArray.filter(item => item !== null) as string[]) // 过滤掉 null 值
    : [myArray as string]; // 强制将单个字符串转换为数组
}

onMounted(() => {
  console.log("123")
  LoadMerchandiseId()
})

const input = ref('')

// Reactive data
//const items = ref(Array.from({ length: 100 }, (_, i) => ({ name: `商品 ${i + 1}` })));
const currentPage = ref(1);
const itemsPerPage = ref(42);

// Computed properties
const totalPages = computed(() => Math.ceil(merchandise_id_list.value.length / itemsPerPage.value));
const pagedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return merchandise_id_list.value.slice(start, end);
});

// Methods
function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    scrollToTop();
  }
}

function previousPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
    scrollToTop();
  }
}

function scrollToTop() {
  nextTick(() => {
    window.scrollTo(0, 0);
  });
}
</script>

<template>
  <div class="home-page">
    <!-- <div class="home-header">
      <div class="logo">
        <el-image class="logo-image" :src= "getImageUrl('logo.png')" fit="cover" />
      </div>
      <div class="input-box">
        <el-input v-model="input" placeholder="请输入商品">
          <template #append>搜素</template>ss
        </el-input>
      </div>
    </div> -->
    <div class="home-body">
      <div class="merchandise-card" v-for="(merchandise_id, id) in pagedItems" :key="`${id}-${currentPage}`">
        <MerchandiseCard :merchandise_id = "merchandise_id" />
      </div>
    </div>
    <div class="pagination-controls">
      <button @click="previousPage" :disabled="currentPage === 1">上一页</button>
      <button @click="nextPage" :disabled="currentPage === totalPages">下一页</button>
    </div>
  </div>
</template>

<style scoped>
.home-page {
  display: flex;
  padding: 0 3rem;
  flex-direction: column;
}

.home-body {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: flex-start;
  padding: 10px;
  box-sizing: border-box;
}

.home-header {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.logo {
  width: 50px;
  height: 50px;
}

.input-box {
  width: 500px;
  margin: 0 auto;
}

.goods-list {
  display: flex;
  justify-content: space-between;
  width: 130px;
  height: 200px;
}

.pagination-controls {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
</style>