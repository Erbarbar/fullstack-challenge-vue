import { createRouter, createWebHistory } from 'vue-router'
import UsersView from '@/views/UsersView.vue'
import ProductsView from '@/views/ProductsView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/users',
        },
        {
            path: '/users',
            name: 'users',
            component: UsersView,
        },
        {
            path: '/products',
            name: 'products',
            component: ProductsView,
        },
    ],
})

export default router