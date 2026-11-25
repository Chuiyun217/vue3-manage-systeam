import { ref } from 'vue'
import { defineStore } from 'pinia'

export const userStore = defineStore('user', () => {
  const userInfo = ref({
    name: '测试',
    avatar: '',
  })

  return { userInfo }
})
