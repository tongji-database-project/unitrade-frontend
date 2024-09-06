<script setup lang="ts">
import { useTokenStore } from '@/stores/token'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
const logged_in = computed(() => useTokenStore().logged_in)

</script>


<template>
  <el-card>
    <div class="profile-card">
      <!-- 具体布局待定，先放一些必要的内容 -->
      <div>
        <RouterLink to="/login">切换账号</RouterLink>
      </div>
      <div>
        <RouterLink to="/account">个人中心</RouterLink>
      </div>
      <div>
        <RouterLink to="/order">我的订单</RouterLink>
      </div>
      <div>
        <RouterLink to="/message">我的消息</RouterLink>
      </div>
    </div>
  </el-card>
</template>




<style scoped>
.profile-card {
  width: 10rem;
}
</style>
