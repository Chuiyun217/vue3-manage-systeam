<script setup>
import { ref } from 'vue'

const menus = ref([
  { item: '系统首页', url: '/home' },
  { item: '数据图表', url: '/eachs' },
  {
    item: '商品列表',
    url: '/shops',
    subitem: [
      { item: '零食', url: '/snack' },
      { item: '饮品', url: '/drink' },
      { item: '水果', url: '/fruit' },
      { item: '数码产品', url: '/digitalProduct' },
    ],
  },
])
</script>
<template>
  <div class="menus">
    <el-menu class="custom-item" :default-active="$route.path" router>
      <!-- 使用 template 包裹循环 -->
      <template v-for="(item, index) in menus" :key="index">
        <!-- 情况 A：如果有 subitem 对象，渲染为带下拉的子菜单 -->
        <el-sub-menu v-if="item.subitem" :index="item.url || `sub-${index}`">
          <template #title>
            <span>{{ item.item }}</span>
          </template>

          <!-- 这里假设 subitem 里面是具体的子菜单列表 -->
          <!-- 如果你的 subitem 结构不同，请根据实际结构调整这里 -->
          <el-menu-item v-for="(sub, subIndex) in item.subitem" :key="subIndex" :index="sub.url">
            {{ sub.item }}
          </el-menu-item>
        </el-sub-menu>

        <!-- 情况 B：如果没有 subitem，渲染为普通菜单项 -->
        <el-menu-item v-else :index="item.url || `item-${index}`">
          <template #title>
            <span>{{ item.item }}</span>
          </template>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<style lang="scss" scoped>
@use './index.scss';
</style>
