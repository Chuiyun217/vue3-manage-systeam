<script setup>
import router from '@/router'

const toLogin = () => {
  router.push('/login')
}
</script>
<template>
  <div class="body">
    <el-card style="max-width: 480px" class="custom-card">
      <div class="title">
        <el-icon>
          <i class="iconfont icon-hudun"></i>
        </el-icon>
        <span>后台管理系统</span>
      </div>
      <el-form class="custom-login-form">
        <el-form-item>
          <el-input placeholder="用户名" size="large">
            <template #prepend>
              <el-icon>
                <i class="iconfont icon-yonghu"></i>
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="密码" size="large">
            <template #prepend>
              <el-icon>
                <i class="iconfont icon-mima"></i>
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="确认密码" size="large">
            <template #prepend>
              <el-icon>
                <i class="iconfont icon-mima"></i>
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="large" class="register-btn">注册</el-button>
        </el-form-item>
      </el-form>
      <div class="register">
        <span>已有账号？</span>
        <span @click="toLogin">立即登录</span>
      </div>
    </el-card>
    <div class="register-bg"></div>
  </div>
</template>
<style scoped lang="scss">
@use './index.scss';
</style>
