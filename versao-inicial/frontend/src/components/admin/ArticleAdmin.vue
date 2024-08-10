<template>
    <div class="article-admin">
        <form class="row" @submit.prevent="save">
            <input id="article-id" type="hidden" v-model="article.id">
            <div class="mt-2 col-12">
                <label for="nome" class="form-label">Nome</label>
                <input type="text" :readonly="mode === 'remove'" v-model="this.article.name" class="form-control" id="article">
            </div>
            <div class="mt-2 col-12">
                <label for="description" class="form-label">Descrição</label>
                <input type="text" :readonly="mode === 'remove'" v-model="this.article.description" class="form-control" id="description">
            </div>
            <div class="col-12" v-show="mode === 'save'">
                <label for="imageUrl" class="form-label">Image URL</label>
                <input type="text" v-model="this.article.imageUrl" class="form-control" id="imageUrl">
            </div>
            <div class="mt-2 col-12" v-show="mode === 'save'">
                <label for="article-categoryId" class="form-label">Categoria</label>
                <select name="article-categoryId" id="article-categoryId" class="form-select" v-model="article.categoryId">
                    <option v-for="c in categories" :value="c.value" :key="c.id">{{ c.text }}</option>
                </select>
            </div>
            <div class="mt-2 col-12" v-show="mode === 'save'">
                <label for="article-userId" class="form-label">Autor</label>
                <select name="article-userId" id="article-userId" class="form-select" v-model="article.userId">
                    <option v-for="u in users" :value="u.value" :key="u.value">{{ u.text }}</option>
                </select>
            </div>
            <div class="mt-2 col-12" v-show="mode === 'save'">
                <VueEditor v-model="article.content" placeholder="Informe o conteúdo do artigo"></VueEditor>
            </div>
            <div class="mt-2 col-12">
                <button v-if="mode === 'save'" type="submit" class="btn btn-primary">Salvar</button>
                <button v-if="mode === 'remove'" type="submit" @click="remove" class="btn btn-danger">Excluir</button>
                <button type="button" @click="reset" class="ms-3 btn btn-secondary">Cancelar</button>
            </div>
        </form>

        <hr>

        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Descrição</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="a in articles" :key="a.id">
                    <th scope="row">{{ a.id }}</th>
                    <td>{{ a.name }}</td>
                    <td>{{ a.description }}</td>
                    <td>
                        <button @click="loadArticle(a)" class="btn btn-warning me-2">
                            <i class="fa fa-pencil"></i>
                        </button>
                        <button @click="loadArticle(a, 'remove')" class="btn btn-danger">
                            <i class="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
                <li class="page-item">
                    <a class="page-link" @click="pagination(this.page - 1)" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <li class="page-item" v-for="p in pages" :class="{ 'active': p == page }" :key="p">
                    <a @click="pagination(p)" class="page-link">{{ p }}</a>
                </li>
                <li class="page-item">
                    <a class="page-link" @click="pagination(this.page + 1)" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>
<script>
import { VueEditor } from 'vue3-editor'
import { baseUrl, showError, showSuccess } from '@/config/global'
import axios from 'axios'

export default {
    name: 'ArticleAdmin',
    components: { VueEditor },
    data: function () {
        return {
            mode: 'save',
            article: {},
            articles: [],
            categories: [],
            users: [],
            page: 1,
            limit: 0,
            count: 0,
            pages: 0
        }
    },
    methods: {
        // funções de carregamento
        loadArticle (article, mode = 'save') {
            this.mode = mode
            // this.article = { ...article }
            axios.get(`${baseUrl}/articles/${article.id}`)
                .then(res => this.article = res.data)
        },
        loadArticles () {
            const url = `${baseUrl}/articles?page=${this.page}`
            axios.get(url).then(res => {
                this.articles = res.data.data
                this.count = res.data.count
                this.limit = res.data.limit
                this.pages = Math.floor(this.count / this.limit) + this.count % this.limit 
            })
        },
        loadUsers () {
            const url = `${baseUrl}/users`
            axios.get(url).then(res => {
                this.users = res.data.map(user => {
                    return { value: user.id, text: `${user.name} | ${user.email}` }
                })
            })
        },
        loadCategories () {
            const url = `${baseUrl}/categories`
            axios.get(url).then(res => {
                this.categories = res.data.map(category => {
                    return { value: category.id, text: category.path }
                })
            })
        },

        // funções de controle
        reset () {
            this.mode = 'save'
            this.article = {}
            this.loadArticles()
        },
        save () {
            const method = this.article.id ? 'put' : 'post'
            const id = this.article.id ? `/${this.article.id}` : ''
            axios[method](`${baseUrl}/articles${id}`, this.article)
                .then(() => {
                    showSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        remove () {
            const id = this.article.id
            axios.delete(`${baseUrl}/articles/${id}`)
                .then(() => {
                    showSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        pagination (p) {
            this.page = (0 < p && p <= this.pages) ? p : this.page
            this.loadArticles()
        }
    },
    mounted () {
        this.loadArticles()
        this.loadCategories()
        this.loadUsers()
    }
}
</script>
<style scoped>
.pagination a {
    cursor: pointer; text-decoration: none; color: black;
}

.pagination .page-item.active a {
    color: white;
    border-color: transparent;
}
</style>