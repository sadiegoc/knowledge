import AdminPages from "@/components/admin/AdminPages.vue";
import ArticleById from "@/components/articles/ArticleById.vue";
import ArticlesByCategory from "@/components/articles/ArticlesByCategory.vue";
import AuthTemp from "@/components/auth/AuthTemp.vue";
import HomeComp from "@/components/home/HomeComp.vue";
import { createRouter, createWebHistory } from "vue-router";
import { userKey } from "./global";

const routes = [
    {
        path: '/',
        alias: '/home',
        name: 'home',
        component: HomeComp
    }, {
        path: '/admin',
        name: 'admin',
        component: AdminPages,
        meta: { requiresAdmin: true }
    }, {
        path: '/categories/:id/articles',
        name: 'articlesByCategory',
        component: ArticlesByCategory
    }, {
        path: '/articles/:id',
        name: 'articleById',
        component: ArticleById
    }, {
        path: '/auth',
        name: 'auth',
        component: AuthTemp
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const json = localStorage.getItem(userKey)

    if (to.matched.some(record => record.meta.requiresAdmin)) {
        const user = JSON.parse(json)
        user && user.admin ? next() : next({ path: '/' })
    } else {
        next()
    }
})

export default router;