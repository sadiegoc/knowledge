<template>
    <div class="category-admin">
        <form class="row" @submit.prevent="save">
            <input id="category-id" type="hidden" v-model="category.id">
            <div class="mt-2 col-12">
                <label for="name" class="form-label">Nome</label>
                <input :readonly="mode !== 'save'" type="text" v-model="category.name" class="form-control" id="name">
            </div>
            <div class="mt-2 col-12">
                <label for="parentId" class="form-label">Categoria pai</label>
                <select :readonly="mode !== 'save'" name="parentId" id="parentId" class="form-select" v-model="category.parentId">
                    <option v-for="c in categories" :value="c.value" :key="c.id">{{ c.text }}</option>
                </select>
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
                    <th scope="col">Caminho</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="c in categories" :key="c.id">
                    <th scope="row">{{ c.id }}</th>
                    <td>{{ c.name }}</td>
                    <td>{{ c.path }}</td>
                    <td>
                        <button @click="loadCategory(c)" class="btn btn-warning me-2">
                            <i class="fa fa-pencil"></i>
                        </button>
                        <button @click="loadCategory(c, 'remove')" class="btn btn-danger">
                            <i class="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import { baseUrl, showError, showSuccess } from '@/config/global'
import axios from 'axios'

export default {
    name: 'CategoryAdmin',
        data: function () {
        return {
            mode: 'save',
            category: {},
            categories: [],
            selected: null
        }
    },
    methods: {
        loadCategories () {
            const url = `${baseUrl}/categories`
            axios.get(url).then(res => {
                // this.category = res.data
                this.categories = res.data.map(category => {
                    return { ...category, value: category.id, text: category.path }
                })
            })
        },
        reset () {
            this.mode = 'save'
            this.category = {}
            this.loadCategories()
        },
        save () {
            console.log(this.category)
            const method = this.category.id ? 'put' : 'post'
            const id = this.category.id ? `/${this.category.id}` : ''
            axios[method](`${baseUrl}/categories${id}`, this.category)
                .then(() => {
                    showSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        remove () {
            const id = this.category.id
            axios.delete(`${baseUrl}/categories/${id}`)
                .then(() => {
                    showSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        loadCategory (category, mode = 'save') {
            this.mode = mode
            this.category = { ...category }
        }
    },
    mounted () {
        this.loadCategories()
    }
}
</script>
<style scoped>
    
</style>