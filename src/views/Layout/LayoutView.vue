<script setup lang="ts">
import FixedLayout from './components/FixedLayout.vue'
import NavLayout from './components/NavLayout.vue'
import FooterLayout from './components/FooterLayout.vue'
</script>

<template>
  <main>
    <FixedLayout />
    <NavLayout />
    <RouterView />
  </main>
  <footer class="app-footer">
    <FooterLayout />
  </footer>
</template>

<style scoped>
main {
  min-height: 90vh;
  padding: 0 2rem;
}

.app-footer {
  overflow: hidden;
  background-color: var(--vt-c-black);
  margin-top: 20px;
}
</style>
