<script setup>
import { ArrowDownBold, UserFilled, Fold, Expand } from '@element-plus/icons-vue'
import { userStore } from '@/stores/userStore'
import { ref } from 'vue'

const store = userStore()

const iconAcitve = ref(true)
const list = ref([
  {
    item: '项目仓库',
    url: 'github',
  },
  {
    item: '个人中心',
    url: '/user',
  },
  {
    item: '退出登录',
    url: '',
  },
])

const changeIcon = () => {
  iconAcitve.value = !iconAcitve.value
  console.log('[ iconAcitve ] => ', iconAcitve.value)
}
const changeSeleclt = (value) => {
  console.log('[ test ] => ', value)
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
                @click="changeSeleclt(item.url)"
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
<style lang="scss">
.header {
  width: 100%;
  height: 100px;
  padding: 0 100px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: #000;

  .left {
    display: flex;
    align-items: center;
    color: #fff;
    font-size: 22px;

    .img {
      width: 50px;
      height: 50px;
    }

    .icon {
      display: flex;
      align-items: center;
      cursor: pointer;
    }

    span {
      margin: 0 20px 0 40px;
    }
  }

  .right {
    display: flex;
    justify-content: space-evenly;
    text-align: center;
    align-items: center;

    height: 50px;

    color: #fff;

    .avatar {
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .name {
      margin: 0 5px 0 10px;
    }
    .icon {
      display: flex;
      align-items: center;
      cursor: pointer;

      :deep(.el-dropdown) {
        outline: none !important;
      }

      :deep(.el-tooltip__trigger) {
        outline: none !important;
        border: none !important;
      }
    }
  }
}
</style>
