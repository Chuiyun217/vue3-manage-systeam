<!-- src/layout/index.vue -->
<script setup>
import vHeader from '@/components/vHeader/index.vue'
import vMenus from '@/components/vMenu/index.vue'
import { ref } from 'vue'

const isCollapse = ref(false)

const changeIcon = (value) => {
  console.log('[ test ] => ', value)
  isCollapse.value = !isCollapse.value
}
</script>
<template>
  <div class="body">
    <!-- 顶部导航 -->
    <div class="header">
      <v-header @changeIcon="changeIcon" :iconState="isCollapse" />
    </div>

    <div class="content">
      <div class="left">
        <v-menus :isCollapse="isCollapse" />
      </div>
      <div class="right">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use './index.scss';
</style>
