import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-select/dist/css/bootstrap-select.css"
import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"
import store from './store'

import "bootstrap/dist/js/bootstrap.js"
import "bootstrap-select/dist/js/bootstrap-select.js"

import setupInterceptors from './services/setupInterceptors';
setupInterceptors(store);

createApp(App)
    .use(router)
    .use(store)
    .mount('#app')



