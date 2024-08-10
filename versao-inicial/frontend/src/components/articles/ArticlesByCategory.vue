<template>
    <div class="articles-by-category">
        <PageTitle
            icon="fa fa-folder-o"
            :main="category.name"
            sub="Categoria"
        />
        <ul>
            <li v-for="article in articles" :key="article.id">
                <ArticleItem :article="article"/>
            </li>
        </ul>
        <div class="load-more d-flex justify-content-center mt-4">
            <button v-if="loadMore" class="btn btn-ls btn-outline-primary">
                Carregar Mais Artigos
            </button>
        </div>
    </div>
</template>
<script>
import { baseUrl } from '@/config/global';
import axios from 'axios';
import PageTitle from '../template/PageTitle.vue';
import ArticleItem from './ArticleItem.vue';

export default {
    name: 'ArticlesByCategory',
    components: { PageTitle, ArticleItem },
    data: function () {
        return {
            category: {},
            articles: [],
            page: 1,
            loadMore: true
        }
    },
    methods: {
        getCategory () {
            const url = `${baseUrl}/categories/${this.category.id}`
            axios(url).then(res => this.category = res.data)
        },
        getArticles () {
            const url = `${baseUrl}/categories/${this.category.id}/articles?page=${this.page}`
            axios(url).then(res => {
                this.articles = this.articles.concat(res.data)
                this.page++

                if (res.data.length === 0) this.loadMore = false
            })
        }
    },
    mounted () {
        this.category.id = this.$route.params.id
        this.getCategory()
        this.getArticles()
    }
}
</script>
<style scoped>
.articles-by-category ul {
    list-style: none; padding: 0;
}
</style>