import AdminPages from "@/components/admin/AdminPages.vue";
import HomeComp from "@/components/home/HomeComp.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: '/',
        alias: '/home',
        name: 'home',
        component: HomeComp
    }, {
        path: '/admin',
        name: 'admin',
        component: AdminPages
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;