<template>
    <div class="user-admin">
        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Nome</th>
                    <th scope="col">E-mail</th>
                    <th scope="col">Admin</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="u in users" :key="u.id">
                    <th scope="row">{{ u.id }}</th>
                    <td>{{ u.name }}</td>
                    <td>{{ u.email }}</td>
                    <td>{{ u.admin }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import { baseUrl } from '@/config/global'
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
                console.log(this.users)
            })
        }
    },
    mounted () {
        this.loadUsers()
    }
}
</script>
<style scoped>
    
</style>