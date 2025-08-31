import './assets/css/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import LenisVue from 'lenis/vue'
import { VueReCaptcha } from 'vue-recaptcha-v3'

import { createHead } from '@vueuse/head'

const app = createApp(App)
const head = createHead()
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(head)
app.use(LenisVue)
app.use(VueReCaptcha, { siteKey: '6LfYhqIqAAAAAIqBRKGvfJUgqK15QA5P-U_VqAEc' })

app.mount('#app')
