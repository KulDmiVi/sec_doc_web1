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

const app = createApp(App)

app
    .use(router)
    .use(store)
    .mount('#app')

app.directive('click-outside', {
    mounted(element, { value }){
        element.ClickOutside = function (event){
            if (!(element === event.target || element.contains(event.target))){
                value(event);
            }
        }
        document.body.addEventListener('click', element.ClickOutside)
    },
    unmounted(element){
        document.body.removeEventListener('click', element.ClickOutside)
    }
})