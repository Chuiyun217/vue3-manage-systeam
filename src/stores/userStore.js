import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref({
      name: '',
      avatar: '',
      remember: false,
    })

    const update = (obj) => {
      userInfo.value = { ...userInfo.value, ...obj }
    }

    return { userInfo, update }
  },
  {
    persist: {
      key: 'user-store', // 自定义存在 localStorage 里的键名
      storage: localStorage, // 默认就是 localStorage
      pick: ['userInfo.name', 'userInfo.remember'], // 只存名字和记住状态，坚决不存密码
    },
  },
)
