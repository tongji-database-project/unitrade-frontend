<script setup lang="ts">
import FixedLayout from './components/FixedLayout.vue'
import NavLayout from './components/NavLayout.vue'
import FooterLayout from './components/FooterLayout.vue'
</script>

<template>
  <main>
    <FixedLayout />
    <NavLayout />
    <RouterView/>
  </main>
  <footer class="app-footer">
    <FooterLayout />
  </footer>
</template>

<style scoped>
.app-footer {
  overflow: hidden;
  background-color: var(--vt-c-black);
  padding-top: 20px;
}
</style>
