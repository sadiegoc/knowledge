<template>
    <div class="auth-content">
        <div class="auth-modal">
            <img src="@/assets/logo.png" alt="Logo" width="200">
            <hr>
            <div class="auth-title">{{ showSignup ? 'Cadastro' : 'Login' }}</div>

            <input type="text" placeholder="Nome" v-if="showSignup" v-model="user.name">
            <input type="email" name="email" placeholder="E-mail" v-model="user.email">
            <input type="password" name="password" placeholder="Senha" v-model="user.password">
            <input type="password" placeholder="Confirmar senha" v-if="showSignup" v-model="user.confirmPassword">
        
            <button class="mx-auto" v-if="showSignup" @click="signup">Registrar</button>
            <button class="mx-auto" v-else @click="signin">Entrar</button>

            <a href @click.prevent="showSignup = !showSignup">
                <span v-if="showSignup">Já tem cadastro? Acesse o login</span>
                <span v-else>Não tem cadastro? Registre-se aqui</span>
            </a>
        </div>
    </div>
</template>
<script>
import { baseUrl, showError, userKey, showSuccess } from '@/config/global';
import axios from 'axios';

export default {
    name: 'AuthTemp',
    data: function () {
        return {
            showSignup: false,
            user: {}
        }
    },
    methods: {
        signin () {
            axios.post(`${baseUrl}/signin`, this.user)
                .then(res => {
                    this.$store.commit('setUser', res.data)
                    localStorage.setItem(userKey, JSON.stringify(res.data))
                    this.$router.push({ path: '/' })
                })
                .catch(showError)
        },
        signup () {
            axios.post(`${baseUrl}/signup`, this.user)
                .then(() => {
                    showSuccess('Usuário autenticado!')
                    this.user = {}
                    this.$router.push({ path: '/signin' })
                    this.showSignup = false
                })
                .catch(showError)
        }
    }
}
</script>
<style>
.auth-content {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.auth-modal {
    background-color: #fff;
    width: 350px;
    padding: 35px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.auth-title {
    font-size: 1.2rem;
    font-weight: 100;
    margin-top: 10px;
    margin-bottom: 15px;
}

.auth-modal input {
    border: 1px solid #bbb;
    width: 100%; margin-bottom: 15px; padding: 3px 8px;
    outline: none;
}

.auth-modal button {
    align-self: flex-end;
    background-color: #2460ae;
    color: #fff;
    padding: 5px 15px;
}

.auth-modal a {
    margin-top: 35px;
}

.auth-modal hr {
    border: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(to right,
        rgba(120, 120, 120, 0),
        rgba(120, 120, 120, 0.95),
        rgba(120, 120, 120, 0));
}
</style>