<script setup>
import { useUserStore } from '@/stores/userStore'
import { ref } from 'vue'

const userStore = useUserStore()

const tabList = ref([
  { title: '我的消息', content: '这里是用户管理的内容' },
  { title: '编辑信息', content: '这里是角色管理的内容' },
  { title: '修改密码', content: '这里是部门管理的内容' },
])
const tabListIndex = ref(0)
const tabListClick = (value) => {
  let tempIndex = value.props.name
  tabListIndex.value = tempIndex
}

const moreList = ref([
  { icon: 'QQ' },
  { icon: 'weixin' },
  { icon: 'github' },
  { icon: 'custom-phone' },
])

const msgData = ref([
  {
    title: '未读消息',
    content: [
      { text: '11', time: '2024-05-24 10:15:30' },
      { text: '22', time: '2024-05-24 11:45:12' },
      { text: '33', time: '2024-05-25 09:20:00' },
      { text: '44', time: '2024-05-25 09:20:00' },
      { text: '55', time: '2024-05-25 09:20:00' },
      { text: '66', time: '2024-05-25 09:20:00' },
    ],
  },
  {
    title: '已读消息',
    content: [
      { text: 'aaa', time: '2024-05-21 14:10:05' },
      { text: 'sss', time: '2024-05-22 16:30:45' },
      { text: 'ddd', time: '2024-05-23 08:05:22' },
    ],
  },
  {
    title: '回收站',
    content: [
      { text: '黑暗时代', time: '2024-05-18 23:59:59' },
      { text: '啊实打实的', time: '2024-05-19 07:12:34' },
    ],
  },
])

const msgIndex = ref(0)
const msgClick = (value) => {
  let tempIndex = value.props.name
  msgIndex.value = tempIndex
}

const handleEdit = (value) => {
  let tempIndex = value.$index
  console.log('[ tempIndex ] => ', tempIndex)
  console.log('[ test ] => ', msgData.value[msgIndex.value].content[tempIndex])
}

const msgReadClick = (value) => {
  let tempIndex = value.$index
  const removedItem = msgData.value[0].content.splice(tempIndex, 1)[0]
  msgData.value[1].content.unshift(removedItem)
}
const allReadClick = () => {
  const unreadList = msgData.value[0].content
  const readList = msgData.value[1].content
  readList.unshift(...unreadList)
  unreadList.length = 0
}
const msgDelClick = (value) => {
  let tempIndex = value.$index
  const removedItem = msgData.value[1].content.splice(tempIndex, 1)[0]
  msgData.value[2].content.unshift(removedItem)
}
const allDelClick = () => {
  const unreadList = msgData.value[1].content
  const readList = msgData.value[2].content
  readList.unshift(...unreadList)
  unreadList.length = 0
}
const msgRestore = (value) => {
  let tempIndex = value.$index
  const removedItem = msgData.value[2].content.splice(tempIndex, 1)[0]
  msgData.value[1].content.unshift(removedItem)
}
const allRestore = () => {
  const unreadList = msgData.value[2].content
  const readList = msgData.value[1].content
  readList.unshift(...unreadList)
  unreadList.length = 0
}
</script>
<template>
  <div class="body">
    <div class="left">
      <div class="bgi">
        <div class="avatart">
          <el-avatar
            :size="100"
            :src="
              userStore.userInfo.avatar ||
              'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
            "
          />
        </div>
      </div>
      <div class="placeholder"></div>
      <div class="name">{{ userStore.userInfo.name }}</div>
      <div class="eMail">
        <span>电子邮箱：</span>
        <el-link underline="never" :href="userStore.userInfo.eMail">{{
          userStore.userInfo.eMail
        }}</el-link>
      </div>
      <div class="more">
        <el-link underline="never" v-for="(item, index) in moreList" :key="index">
          <i :class="['iconfont', `icon-${item.icon}`]"></i>
        </el-link>
      </div>
    </div>
    <div class="right">
      <div class="msg" v-show="tabListIndex === 0">
        <div class="custom-left-tabs">
          <el-tabs
            tab-position="left"
            class="custom-tabs"
            v-model="tabListIndex"
            @tab-click="tabListClick"
          >
            <el-tab-pane
              v-for="(item, index) in tabList"
              :key="index"
              :label="item.title"
              :name="index"
            ></el-tab-pane>
          </el-tabs>
        </div>
        <el-tabs class="custom-top-tabs" type="card" v-model="msgIndex" @tab-click="msgClick">
          <el-tab-pane
            v-for="(item, index) in msgData"
            :key="index"
            :label="item.title"
            :name="index"
          >
            <el-table
              :data="msgData[msgIndex].content"
              style="width: 100%"
              empty-text="暂无数据"
              :show-header="false"
            >
              <el-table-column prop="text">
                <template #default="scope">
                  <div class="custom-table-column">
                    <div class="text">{{ scope.row.text }}</div>
                    <div class="time">{{ scope.row.time }}</div>
                    <div class="btn">
                      <el-button
                        size="small"
                        @click="msgReadClick(scope)"
                        v-show="msgIndex === 0 && msgData[0].content.length > 0"
                        >标为已读</el-button
                      >
                      <el-button
                        size="small"
                        @click="msgDelClick(scope.row)"
                        v-show="msgIndex === 1"
                        type="danger"
                        >删除</el-button
                      >
                      <el-button size="small" @click="handleEdit(scope.row)" v-show="msgIndex === 2"
                        >复原</el-button
                      >
                    </div>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <div class="bottomBtn">
              <el-button
                size="large"
                @click="allReadClick"
                v-show="msgIndex === 0 && msgData[0].content.length > 0"
                type="primary"
                >全部已读</el-button
              >
              <el-button
                size="large"
                @click="allDelClick"
                v-show="msgIndex === 1 && msgData[1].content.length > 0"
                type="danger"
                >全部删除</el-button
              >
              <el-button
                size="large"
                @click="allRestore"
                v-show="msgIndex === 2 && msgData[2].content.length > 0"
                type="danger"
                >全部复原</el-button
              >
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="avatart" v-show="tabListIndex === 1">头像</div>
      <div class="psd" v-show="tabListIndex === 2">密码</div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@use './index.scss';
</style>
