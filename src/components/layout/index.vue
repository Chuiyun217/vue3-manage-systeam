<!-- src/layout/index.vue -->
<template>
  <div class="body">
    <!-- 顶部导航 -->
    <div class="header">
      <v-header />
    </div>

    <div class="content">
      <div class="left">
        <v-menus />
      </div>
      <div class="right">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import vHeader from '@/components/vHeader/index.vue'
import vMenus from '@/components/vMenu/index.vue'
</script>

<style scoped lang="scss">
@use './index.scss';
</style>
