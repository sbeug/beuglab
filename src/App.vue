<script setup>
import NavBar from './components/NavBar.vue'
import SiteFooter from './components/SiteFooter.vue'
import Contact from './components/ContactForm.vue'
import '@splinetool/viewer'
// Gsap
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
// Lenis Smooth Scroll Configuration
import { VueLenis, useLenis } from 'lenis/vue'
import { useRoute } from 'vue-router'
import { watch, nextTick, onMounted, onUnmounted } from 'vue'
// Meta Head
import { useHead } from '@vueuse/head'
// Stores ticker function for proper cleanup
let rafCallback = null
// Global Animations
import { ContactForm } from './assets/js/customAnimations'
// Global Utils
import { useReloadOnBreakpointChange } from './assets/js/utils'
useReloadOnBreakpointChange()

const lenis = useLenis(() => {
  // ?
})
function updateLenis() {
  lenis.value?.resize()
}

onMounted(() => {
  lenis.value.on('scroll', ScrollTrigger.update())

  rafCallback = (time) => {
    lenis.value?.raf(time * 1000)
  }

  const resizeObserver = new ResizeObserver(() => {
    updateLenis()
    ScrollTrigger.refresh()
  })

  resizeObserver.observe(document.body)

  window.addEventListener('resize', () => {
    updateLenis()
    ScrollTrigger.refresh()
  })

  ContactForm()
})

// Cleanup function
onUnmounted(() => {
  if (lenis.value) {
    lenis.value.off('scroll', ScrollTrigger.update())
  }
  if (rafCallback) {
    gsap.ticker.remove(rafCallback)
  }
})

const route = useRoute()
watch(
  () => route.path,
  async () => {
    await nextTick()
    setTimeout(() => {
      window.scrollTo(0, 0)
      setTimeout(() => {
        if (lenis.value) {
          lenis.value.resize()
          lenis.value.scrollTo(0, { immediate: true })

          setTimeout(() => {
            ScrollTrigger.refresh(true)
            lenis.value.resize()
          }, 100)
        }
      }, 50)
    }, 1000)
  },
)

// METADATA
useHead({
  title: 'Beug Lab | Innovative Research',
  meta: [
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: 'Beug Lab | Driven by Curiosity, Guided by Science' },
    {
      property: 'og:description',
      content:
        'The Beug Lab investigates the molecular mechanisms underlying human disease to identify new therapeutic strategies. Led by Dr. Shawn Beug, the lab bridges fundamental research with clinical application to improve health outcomes.',
    },
    {
      property: 'og:image',
      content: '',
    },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Beug Lab | Driven by Curiosity, Guided by Science' },
    {
      name: 'twitter:description',
      content:
        'The Beug Lab investigates the molecular mechanisms underlying human disease to identify new therapeutic strategies. Led by Dr. Shawn Beug, the lab bridges fundamental research with clinical application to improve health outcomes.',
    },
    {
      name: 'twitter:image',
      content: '',
    },
  ],
})
</script>
<template>
  <VueLenis
    root
    :options="{
      duration: 1.25,
      lerp: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 1,
      smoothWheel: true,
      autoResize: true,
      autoRaf: true,
      anchors: false,
      infinite: false,
    }"
  >
    <div id="app">
      <div id="spline" v-if="route.path !== '/'">
        <spline-viewer
          url="https://prod.spline.design/zgZj9HR7euKqCYFg/scene.splinecode"
        ></spline-viewer>
      </div>
      <header>
        <NavBar />
      </header>
      <router-view v-slot="{ Component }">
        <transition :css="true" mode="out-in" name="v">
          <component :is="Component" :key="$route.fullPath" />
        </transition>
      </router-view>
      <div id="contact-container">
        <div id="contact-wrapper">
          <Contact />
        </div>
      </div>
      <SiteFooter />
    </div>
  </VueLenis>
</template>

<style scoped>
/* TRANSITIONS */
.v-enter-from {
  filter: blur(10px);
  opacity: 0;
}
.v-leave-to {
  filter: blur(10px);
  opacity: 0;
}
.v-enter-active {
  transition: all 1s ease-out;
}
.v-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}
header {
  z-index: 9;
}
#app {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100%;
  transition: all 0.5s ease;
  will-change: height;
}
#spline {
  position: fixed;
  z-index: 0;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
#contact-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 14;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}
#contact-wrapper {
  width: 100vw;
  height: 0%;
  background-color: #e9e9e9;
  visibility: hidden;
  overflow-y: auto;
}
</style>
