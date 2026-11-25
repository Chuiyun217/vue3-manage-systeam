import { createRouter, createWebHistory } from 'vue-router'
import test from '../views/home/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: test,
    },
  ],
})

export default router
