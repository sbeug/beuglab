<script setup>
import NavBar from './components/NavBar.vue'
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
// Handle route changes properly
watch(
  () => route.path,
  async () => {
    // Wait for DOM to update first
    await nextTick()

    // Reset scroll position
    setTimeout(() => {
      window.scrollTo(0, 0)

      // Then resize Lenis after a small delay
      setTimeout(() => {
        if (lenis.value) {
          lenis.value.resize()
          lenis.value.scrollTo(0, { immediate: true })

          // Final update after everything has settled
          setTimeout(() => {
            ScrollTrigger.refresh(true)
            lenis.value.resize()
          }, 100)
        }
      }, 50)
    }, 1000) // Add delay before scroll reset
  },
)

// METADATA
useHead({
  title: 'Beug Lab | Innovative Research',
  meta: [
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: '982studios® | Driven by Curiosity, Guided by Science' },
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
    { name: 'twitter:title', content: '982studios® | Driven by Curiosity, Guided by Science' },
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

// TRANSITIONS
const beforeEnter = (el) => {
  gsap.set(el, {
    opacity: 0,
  })
}

const enter = (el, done) => {
  gsap.to(el, {
    opacity: 1,
    duration: 1,
    ease: 'power4.inOut',
    onComplete: done,
  })
}

const leave = (el, done) => {
  gsap.to(el, {
    opacity: 0,
    duration: 1,
    ease: 'power4.inOut',
    filter: 'blur(1.5em)',
    onComplete: done,
  })
}
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
      <header>
        <NavBar> </NavBar>
      </header>
      <router-view v-slot="{ Component }">
        <transition
          :css="false"
          mode="out-in"
          @before-enter="beforeEnter"
          @enter="enter"
          @leave="leave"
        >
          <component :is="Component" key="$route.fullPath" />
        </transition>
      </router-view>
    </div>
  </VueLenis>
</template>

<style scoped>
header {
  z-index: 9;
}
</style>
