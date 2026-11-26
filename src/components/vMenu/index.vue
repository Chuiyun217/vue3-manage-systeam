<script setup>
import { ref } from 'vue'

const props = defineProps({
  isCollapse: Boolean,
})

const menus = ref([
  { item: '系统首页', url: 'home', icon: 'icon-icon_857' },
  {
    item: '系统管理',
    url: 'systeam',
    icon: 'icon-xitong',
    subitem: [
      { item: '用户管理', url: 'user' },
      { item: '权限管理', url: 'role' },
      { item: '页面管理', url: 'page' },
    ],
  },
  { item: '数据图表', url: 'eachs', icon: 'icon-tubiao' },
  {
    item: '商品列表',
    url: 'shops',
    icon: 'icon-shangpin',
    subitem: [
      { item: '零食', url: 'snack' },
      { item: '饮品', url: 'drink' },
      { item: '水果', url: 'fruit' },
      { item: '数码产品', url: 'digitalProduct' },
    ],
  },
])
</script>
<template>
  <div class="menus">
    <el-menu
      class="custom-item"
      :default-active="$route.path"
      router
      :collapse="props.isCollapse"
      popper-effect="light"
      collapse="#324157"
      background-color="#324157"
      text-color="#324157"
    >
      <template v-for="(item, index) in menus" :key="index">
        <el-sub-menu v-if="item.subitem" :index="item.url">
          <template #title>
            <el-icon>
              <i :class="['iconfont', item.icon]"></i>
            </el-icon>
            <span>{{ item.item }}</span>
          </template>

          <el-menu-item
            v-for="(sub, subIndex) in item.subitem"
            :key="subIndex"
            :index="sub.url"
            style="color: #fff; border: none"
          >
            <span>{{ sub.item }}</span>
          </el-menu-item>
        </el-sub-menu>

        <el-menu-item v-else :index="item.url">
          <el-icon>
            <i :class="['iconfont', item.icon]"></i>
          </el-icon>
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
