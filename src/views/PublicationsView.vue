<script setup>
import PubmedPublications from '@/components/PubmedPublications.vue'

// Meta Head
import { useHead } from '@vueuse/head'
useHead({
  title: 'Beug Lab | Publications',
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
  <div id="main-content" class="main-content df-pad">
    <h1>Publications</h1>
    <PubmedPublications></PubmedPublications>
  </div>
</template>
<style scoped>
#main-content {
  position: relative;
  min-height: 100vh;
  padding-bottom: 4em;
}
#main-content h1 {
  position: relative;
  color: var(--font-color-main);
  font-size: 2.5em;
  padding-top: 1.5em;
  text-align: center;
  text-transform: uppercase;
}
/* TABLET 1 [GLOBAL] */
@media (min-width: 768px) {
  #main-content h1 {
    font-size: 3em;
    padding-top: 2em;
    padding-bottom: 0.5em;
  }
}
/* DESKTOP 1 [GLOBAL] */
@media (min-width: 1280px) {
  #main-content h1 {
    font-size: 6em;
    padding-top: 1em;
  }
}
</style>
