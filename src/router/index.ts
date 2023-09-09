import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
import Index from '@/views/index.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Index',
        component: Index
    },
    {
        path: '/home/',
        name: 'Home',
        component: () => import('@/views/HomeView.vue'),
    },
    {
        path: '/account/',
        name: 'Account',
        component: () => import('@/views/myAccount/Index.vue'),
    },
    {
        path: '/order/',
        name: 'Order',
        component: () => import('@/views/order/Index.vue'),
    },
    {
        path: '/aiQuantify/',
        name: 'AiQuantify',
        component: () => import('@/views/aiQuantify/Index.vue'),
    },
    {
        path: '/aiQuantifyInfo/',
        name: 'AiQuantifyInfo',
        component: () => import('@/views/aiQuantifyInfo/Index.vue'),
    },
    {
        path: '/deal/',
        name: 'Deal',
        component: () => import('@/views/deal/Index.vue'),
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router