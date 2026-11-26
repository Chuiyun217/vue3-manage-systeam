<script setup>
import { useRouter } from 'vue-router' // 👈 改用 useRouter

const router = useRouter() // 👈 拿到 router 实例

const toLogin = () => {
  router.push('/login') // ✅ 正确
}
</script>
<template>
  <div class="body">
    <span class="icon-shangpin iconfont"></span>
    <el-button @click="toLogin">登录</el-button>
  </div>
</template>
<style lang="scss" scoped>
@use './index.scss';
</style>
