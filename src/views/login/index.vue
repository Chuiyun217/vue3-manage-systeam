<script setup>
import router from '@/router'
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'

const userStoreInfo = useUserStore()

const loginForm = ref({
  name: '',
  password: '',
})
const isRemember = ref(false)
const loginFormRef = ref(null)
const formRules = ref({
  name: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度 6 到 20 位', trigger: 'blur' },
    // 如需只允许字母数字：
    // { pattern: /^[A-Za-z0-9]+$/, message: '只能包含字母和数字', trigger: 'blur' },
  ],
})

const toForgotPsd = () => {
  router.push('/forgotpsd')
}

const toRegister = () => {
  router.push('/register')
}

const validateForm = async () => {
  if (!loginFormRef.value) return
  try {
    const valid = await loginFormRef.value.validate()
    // 校验通过，执行登录
    userStoreInfo.update({
      name: loginForm.value.name,
      password: isRemember.value ? loginForm.value.password || '' : '',
      isRemember: isRemember.value,
    })
    router.push('/home')
  } catch (err) {
    // 校验失败，err 是各字段的错误对象
    console.log('[ err ] => ', err)
    loginFormRef.value.resetFields()
  }
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
      <!-- 表单 -->
      <el-form class="custom-login-form" :model="loginForm" :rules="formRules" ref="loginFormRef">
        <el-form-item prop="name">
          <el-input placeholder="用户名" size="large" v-model="loginForm.name">
            <template #prepend>
              <el-icon>
                <i class="iconfont icon-yonghu"></i>
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="密码" size="large" v-model="loginForm.password" type="password">
            <template #prepend>
              <el-icon>
                <i class="iconfont icon-mima"></i>
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <div class="remabeme">
            <el-checkbox size="large" label="记住密码" v-model="isRemember" />
          </div>
          <div class="forgot" @click="toForgotPsd">忘记密码</div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="large" class="login-btn" @click="validateForm"
            >登录</el-button
          >
          <div class="tips">Tips: 用户名密码随便填。</div>
        </el-form-item>
      </el-form>
      <div class="register">
        <span>没有账号？</span>
        <span @click="toRegister">立即注册</span>
      </div>
    </el-card>
  </div>
  <div class="login-bg"></div>
</template>
<style scoped lang="scss">
@use './index.scss';
</style>
