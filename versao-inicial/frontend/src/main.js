import 'font-awesome/css/font-awesome.css'
import { createApp } from 'vue'
import App from './App.vue'
import store from './config/store'
import router from './config/router'
import Vue3Toastify from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IkRpZWdvIFNhIiwiZW1haWwiOiJzYWRpZWdvY0BnbWFpbC5jb20iLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNzIzMjIzMTU1LCJleHAiOjE3MjM0ODIzNTV9.Qvu-MD6eZCgqfd79eqR4xBFHFdP3P952geBbmEUSyus'

createApp(App)
    .use(store)
    .use(router)
    .use(Vue3Toastify, {
        autoClose: 2000
    })
    .mount('#app')
