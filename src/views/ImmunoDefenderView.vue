<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import MiniGame from '@/components/MiniGame.vue'

const route = useRoute()
const gameKey = ref(0)

watch(
  () => route.fullPath,
  () => {
    gameKey.value++
  },
  { immediate: true },
)

onMounted(() => {
  if (!sessionStorage.getItem('gameLoadedOnce')) {
    sessionStorage.setItem('gameLoadedOnce', 'true')
    location.reload()
  } else {
    sessionStorage.removeItem('gameLoadedOnce')
  }
})

// Meta Head
import { useHead } from '@vueuse/head'
useHead({
  title: 'Beug Lab | Mini Game',
  meta: [
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: 'Beug Lab | Driven by Curiosity, Guided by Science' },
    {
      property: 'og:description',
      content:
        'The Beug Lab investigates the molecular mechanisms underlying human disease to identify new therapeutic strategies. Led by Dr. Shawn Beug, the lab bridges fundamental research with clinical application to improve health outcomes.',
    },
  ],
})
</script>
<template>
  <div>
    <MiniGame :key="gameKey" />
  </div>
</template>
<style scoped></style>
