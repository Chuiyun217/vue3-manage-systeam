<script setup>
import { ArrowDownBold, UserFilled, Fold, Expand, Select } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/userStore'
import { ref } from 'vue'

const store = useUserStore()

const iconAcitve = ref(true)
const list = ref([
  {
    item: '项目仓库',
    url: 'https://github.com/Chuiyun217/vue3-manage-systeam.git',
    mode: 'new',
  },
  {
    item: '个人中心',
    url: '/user',
    mode: 'location',
  },
  {
    item: '退出登录',
    url: '',
    mode: 'none',
  },
])

const changeIcon = () => {
  iconAcitve.value = !iconAcitve.value
  console.log('[ iconAcitve ] => ', iconAcitve.value)
}
const changeSeleclt = ({ url, mode }) => {
  console.log('[ test ] => ', mode)
  switch (mode) {
    case 'new':
      window.open(url)
      break

    case 'location':
      break

    case 'none':
      break
  }
}
</script>
<template>
  <div class="header">
    <div class="left">
      <div class="img">
        <img src="../../../public/favicon.svg" />
      </div>
      <span>后台管理系统</span>
      <div class="icon" @click="changeIcon">
        <el-icon v-show="iconAcitve === true" color="#fff" :size="26"><Fold /></el-icon>
        <el-icon v-show="iconAcitve === false" color="#fff" :size="26"><Expand /></el-icon>
      </div>
    </div>
    <div class="right">
      <div class="avatar">
        <el-avatar :icon="UserFilled" :src="store.userInfo.avatar || `“”`" />
      </div>
      <div class="name">{{ store.userInfo.name || '昵称' }}</div>

      <div class="icon">
        <el-dropdown trigger="click">
          <el-icon :size="16" color="#fff">
            <ArrowDownBold />
          </el-icon>

          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="(item, index) in list"
                :key="index"
                @click="changeSeleclt(item)"
              >
                {{ item.item }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@use './index.scss';
</style>
