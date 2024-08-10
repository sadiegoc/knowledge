<template>
    <div class="user-admin">
        <form class="row" @submit.prevent="save">
            <input id="user-id" type="hidden" v-model="user.id">
            <div class="mt-2 col-md-6">
                <label for="nome" class="form-label">Nome</label>
                <input type="text" :readonly="mode === 'remove'" v-model="this.user.name" class="form-control" id="nome">
            </div>
            <div class="mt-2 col-md-6">
                <label for="email" class="form-label">E-mail</label>
                <input type="email" :readonly="mode === 'remove'" v-model="this.user.email" class="form-control" id="email">
            </div>
            <div class="my-3 col-12">
                <div class="form-check">
                    <input type="checkbox" :readonly="mode === 'remove'" v-model="this.user.admin" class="form-check-input" id="check">
                    <label for="check" class="form-check-label">
                        Administrador?
                    </label>
                </div>
            </div>
            <div class="col-md-6" v-show="mode === 'save'">
                <label for="password" class="form-label">Senha</label>
                <input type="password" v-model="this.user.password" class="form-control" id="password">
            </div>
            <div class="mt-2 col-md-6" v-show="mode === 'save'">
                <label for="confirmPassword" class="form-label">Confirmar senha</label>
                <input type="password" v-model="this.user.confirmPassword" class="form-control" id="confirmPassword">
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
                    <th scope="col">E-mail</th>
                    <th scope="col">Admin</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="u in users" :key="u.id">
                    <th scope="row">{{ u.id }}</th>
                    <td>{{ u.name }}</td>
                    <td>{{ u.email }}</td>
                    <td>{{ u.admin }}</td>
                    <td>
                        <button @click="loadUser(u)" class="btn btn-warning me-2">
                            <i class="fa fa-pencil"></i>
                        </button>
                        <button @click="loadUser(u, 'remove')" class="btn btn-danger">
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
    name: 'UserAdmin',
    data: function () {
        return {
            mode: 'save',
            user: {},
            users: []
        }
    },
    methods: {
        loadUsers () {
            const url = `${baseUrl}/users`
            axios.get(url).then(res => {
                this.users = res.data
            })
        },
        reset () {
            this.mode = 'save'
            this.user = {}
            this.loadUsers()
        },
        save () {
            const method = this.user.id ? 'put' : 'post'
            const id = this.user.id ? `/${this.user.id}` : ''
            axios[method](`${baseUrl}/users${id}`, this.user)
                .then(() => {
                    showSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        remove () {
            const id = this.user.id
            axios.delete(`${baseUrl}/users/${id}`)
                .then(() => {
                    showSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        loadUser (user, mode = 'save') {
            this.mode = mode
            this.user = { ...user }
        }
    },
    mounted () {
        this.loadUsers()
    }
}
</script>
<style scoped>
    
</style>