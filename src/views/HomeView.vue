<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { homePageLoadAnimation } from '@/assets/js/customAnimations'
import { gsap } from 'gsap'
import HeroSection from '@/components/home/HeroSection.vue'
import ObjectiveSection from '@/components/home/ObjectiveSection.vue'
import WorkSection from '@/components/home/WorkSection.vue'
import TeamSection from '@/components/home/TeamSection.vue'

// Add ref to track if component is still mounted
const isMounted = ref(false)
let homePageAnimationCleanup = null

onMounted(async () => {
  isMounted.value = true
  homePageAnimationCleanup = homePageLoadAnimation()
})

onBeforeUnmount(() => {
  isMounted.value = false

  if (homePageAnimationCleanup) {
    homePageAnimationCleanup()
  }

  if (window.dragToScrollTimeout) {
    clearTimeout(window.dragToScrollTimeout)
  }

  if (window.animationFrameId) {
    cancelAnimationFrame(window.animationFrameId)
  }

  // Kill all GSAP animations to prevent memory leaks
  gsap.killTweensOf('*')
})
</script>

<template>
  <div id="main-content" class="main-content clickable">
    <HeroSection />
    <ObjectiveSection />
    <WorkSection />
    <TeamSection />
  </div>
</template>
<style scoped></style>
