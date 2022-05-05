import { createRouter, createWebHistory } from "vue-router";
import Home from '../view/HomeView.vue';
import Products from '../view/ProductsView.vue';
import PastOrders from '../view/PastOrders.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/products',
        name: 'Products',
        component: Products
    },
    {
        path: '/past-orders',
        name: 'PastOrders',
        component: PastOrders
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router;