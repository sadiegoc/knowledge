<template>
    <div class="admin-pages">
        <PageTitle
            icon="fa fa-cogs"
            main="Administração do Sistema"
            sub="Cadastro & Cia"
        />
        <button @click="toast">toast</button>
        <div class="admin-pages-tabs">
            <ul class="nav nav-underline">
                <li class="nav-item">
                    <a href="#" @click="articleShow" class="nav-link">Artigo</a>
                </li>
                <li class="nav-item">
                    <a href="#" @click="categoryShow" class="nav-link">Categoria</a>
                </li>
                <li class="nav-item">
                    <a href="#" @click="usersShow" class="nav-link">Usuários</a>
                </li>
            </ul>
            <div class="nav-content">
                <ArticleAdmin :class="{ show: article }"/>
                <CategoryAdmin :class="{ show: category }"/>
                <UserAdmin :class="{ show: users }"/>
            </div>
        </div>
    </div>
</template>
<script>
import PageTitle from '../template/PageTitle.vue'
import ArticleAdmin from './ArticleAdmin.vue'
import CategoryAdmin from './CategoryAdmin.vue'
import UserAdmin from './UserAdmin.vue'
import msg from '@/config/msg.js'

export default {
    name: 'AdminPages',
    components: { PageTitle, ArticleAdmin, CategoryAdmin, UserAdmin },
    data () {
        return {
            article: false,
            category: false,
            users: false
        }
    },
    methods: {
        articleShow () {
            this.article = true
            this.category = false
            this.users = false
        },
        categoryShow () {
            this.category = true
            this.article = false
            this.users = false
        },
        usersShow () {
            this.users = true
            this.category = false
            this.article = false
        },
        toast () {
            msg.error()
        }
    }
}
</script>
<style scoped>
.nav-content div {
    display: none;
}

.nav-content div.show {
    display: block;
}
</style>