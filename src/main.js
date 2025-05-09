import './assets/css/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import LenisVue from 'lenis/vue'

/* STORYBLOK
import { storyblokInit, apiPlugin, StoryblokVue } from '@storyblok/vue'
storyblokInit({
  accessToken: 'E4hFQElgIy50jTKVHBlxzAtt',
  use: [apiPlugin],
  components: {},
})
*/
const app = createApp(App)

app.use(createPinia())
app.use(router)
// app.use(StoryblokVue)
app.use(LenisVue)

app.mount('#app')
