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
</script>
<template>
  <VueLenis
    root
    :options="{
      duration: 1,
      lerp: 1,
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
    <div id="app-container">
      <header>
        <NavBar> </NavBar>
      </header>
    </div>
  </VueLenis>
</template>

<style scoped></style>
