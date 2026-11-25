import { createRouter, createWebHistory } from 'vue-router'
import layout from '@/components/layout/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: layout, // 父级是 Layout
      redirect: '/home', // 默认重定向到首页
      children: [
        {
          path: 'home', // 注意：子路由不要加斜杠 /
          name: 'Home',
          component: () => import('@/views/home/index.vue'),
        },
        {
          path: 'eachs',
          name: 'Eachs',
          component: () => import('@/views/chart/index.vue'),
        },
        {
          path: 'shops',
          name: 'Shops',
          component: () => import('@/views/shops/index.vue'),
        },
        {
          path: 'snack',
          name: 'Snack',
          component: () => import('@/views/shops/snack/index.vue'),
        },
        {
          path: 'drink',
          name: 'Drink',
          component: () => import('@/views/shops/drink/index.vue'),
        },
        {
          path: 'fruit',
          name: 'Fruit',
          component: () => import('@/views/shops/fruit/index.vue'),
        },
        {
          path: 'digitalProduct',
          name: 'DigitalProduct',
          component: () => import('@/views/shops/digitalProduct/index.vue'),
        },
      ],
    },
  ],
})

export default router
