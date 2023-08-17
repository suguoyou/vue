import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'

export const publicRouters: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    redirect: '/home',
    meta: { title: '首页' },
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/home.vue'),
        meta: { title: '首页' },
      },
      {
        path: '/employeeDetail',
        name: 'employeeDetail',
        component: () => import('@/views/employeeDetail.vue'),
        meta: { title: '员工详情' },
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login/Login.vue'),
    meta: {
      title: '登录页面'
    },
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes: publicRouters,
})

export default router
