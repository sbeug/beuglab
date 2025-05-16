import './assets/css/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import LenisVue from 'lenis/vue'

import { createHead } from '@vueuse/head'

const app = createApp(App)
const head = createHead()
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(head)
app.use(LenisVue)

app.mount('#app')
