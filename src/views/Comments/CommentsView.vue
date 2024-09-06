<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { onMounted,ref, computed, nextTick } from 'vue';
import type {Ref} from 'vue';
import {getCommentIdAPI} from '@/apis/merchandise'
import CommentCard from './components/CommentCard.vue';

const router = useRouter()
const route = useRoute()

const comment_id_list:Ref<string[]>=ref([])

const LoadCommentId = async () => {
  comment_id_list.value = await getCommentIdAPI(route.params.id as string) 
}

onMounted(() => {
  LoadCommentId()
})

// Reactive data
//const items = ref(Array.from({ length: 100 }, (_, i) => ({ name: `商品 ${i + 1}` })));
const currentPage = ref(1);
const itemsPerPage = ref(20);

// Computed properties
const totalPages = computed(() => Math.ceil(comment_id_list.value.length / itemsPerPage.value));
const pagedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  console.log("test 特惠的天堂", comment_id_list.value.slice(start, end))
  return comment_id_list.value.slice(start, end);
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
  <h1>商品评论</h1>
  <div>
    <div class="comment-body">
      <div class="comment-card" v-for="(comment_id,id) in pagedItems" :key="`${id}-${currentPage}`">
        <CommentCard :comment_id="comment_id" />
      </div>
    </div>
    <div class="pagination-controls">
      <button @click="previousPage" :disabled="currentPage === 1">上一页</button>
      <button @click="nextPage" :disabled="currentPage === totalPages">下一页</button>
    </div>
  </div>
</template>

<style>
.pagination-controls {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
</style>




<!-- <script setup lang="ts">

import { useRouter } from 'vue-router'
import { ref, reactive, onMounted } from 'vue'
import { getImageUrl } from '@/utils/utils'

const count = ref(0)
const load = () => {
  count.value += 2
}
</script>

<template>
  <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
    <li v-for="i in count" :key="i" class="infinite-list-item">{{ i }}</li>
  </ul>
</template>

<style>
.infinite-list {
  height: 300px;
  padding: 0;
  margin: 0;
  list-style: none;
}
.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background: var(--el-color-primary-light-9);
  margin: 10px;
  color: var(--el-color-primary);
}
.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}
</style> -->

<!-- const item = {
  order_id: '123456',
  merchandise_id: '654321',
  name: '商品名称示例',
  order_quantity: 2,
  state: '已发货',
  order_time: '2023-07-12 14:30:00',
  receiving_time: '2023-07-15 10:00:00',
  address: 'No. 189, Grove St, Los Angeles'
}
const tableData = ref(Array.from({ length: 20 }).fill(item))
</script> -->


<!-- { <template>
  <h1>商品评论</h1>
  <el-container class="myOrder" style="height: 500px">
    <el-container>
      <el-header style="text-align: left; font-size: 15px">
        <span class="header-title-image" style="width: 135px">用户头像</span>
        <span class="header-title-content" style="width: 500px">评论内容</span>
        <span class="header-title-time" style="width: 135px">评论时间</span>
      </el-header>
      <el-main>
        <el-scrollbar>
          <el-table :data="tableData">
            <el-table-column prop="order_id" width="150" />
            <el-table-column prop="merchandise_id" width="150" />
            <el-table-column prop="name" width="190" />
            <el-table-column prop="order_quantity" width="120" />
            <el-table-column prop="state" width="150" />
            <el-table-column prop="order_time" width="220" />
            <el-table-column prop="receiving_time" width="220" />
            <el-table-column prop="address" />
          </el-table>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template> } -->

<!-- { <style scoped>
.myOrder .el-header {
  display: flex;
  align-items: center;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
  padding: 10px;
  border-bottom: 0px solid var(--el-color-primary-light-5);
}
.myOrder .el-menu {
  border-right: none;
}
.myOrder .el-main {
  padding: 0;
}
.myOrder .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 0px;
}
.myOrder .header-title-image {
  margin-right: 20px;
  font-weight: bold;
  padding-right: 10px;
}
.myOrder .header-title-content {
  margin-right: 20px;
  font-weight: bold;
  padding-right: 10px;
}
.myOrder .header-title-time {
  margin-left: auto;
  margin-right: 20px;
  font-weight: bold;
  padding-right: 10px; 
}
</style> } -->
