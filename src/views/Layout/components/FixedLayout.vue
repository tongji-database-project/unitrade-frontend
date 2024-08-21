<script setup lang="ts">
import NavLayout from './NavLayout.vue'
import { useWindowScroll } from '@vueuse/core'
const { x, y } = useWindowScroll()
</script>

<template>
  <div class="stiky-header" :class="{ show: y > 78 }">
    <NavLayout />
  </div>
</template>

<style scoped>
.stiky-header {
  width: 100vw;
  height: 80px;
  padding: 0 2rem;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background-color: var(--color-background);
  border-bottom: 2px solid var(--color-border);

  /* 页面处于最顶端时，该组件向上平移并完全透明 */
  transform: translateY(-100%);
  opacity: 0;
}

/* 页面向下移动一定距离后，取消平移和透明 */
.stiky-header.show {
  transition: all 0.3s linear;
  transform: none;
  opacity: 1;
}
</style>
