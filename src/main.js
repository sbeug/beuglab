import './assets/css/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import LenisVue from 'lenis/vue'

import { createHead } from '@vueuse/head'
/* STORYBLOK
import { storyblokInit, apiPlugin, StoryblokVue } from '@storyblok/vue'
storyblokInit({
  accessToken: 'E4hFQElgIy50jTKVHBlxzAtt',
  use: [apiPlugin],
  components: {},
})
*/
const app = createApp(App)
const head = createHead()

app.use(createPinia())
app.use(router)
// app.use(StoryblokVue)
app.use(head)
app.use(LenisVue)

app.mount('#app')
