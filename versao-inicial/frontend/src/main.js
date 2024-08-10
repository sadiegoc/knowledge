import 'font-awesome/css/font-awesome.css'
import { createApp } from 'vue'
import App from './App.vue'
import store from './config/store'
import router from './config/router'
import Vue3Toastify from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import './config/axios'

createApp(App)
    .use(store)
    .use(router)
    .use(Vue3Toastify, {
        autoClose: 2000
    })
    .mount('#app')
