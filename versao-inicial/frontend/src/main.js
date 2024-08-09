import 'font-awesome/css/font-awesome.css'
import { createApp } from 'vue'
import App from './App.vue'
import store from './config/store'
import router from './config/router'

createApp(App).use(store).use(router).mount('#app')
