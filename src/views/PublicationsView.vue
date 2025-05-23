<script setup>
import PubmedPublications from '@/components/PubmedPublications.vue'
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
}
/* DESKTOP 1 [GLOBAL] */
@media (min-width: 1280px) {
  #main-content h1 {
    font-size: 6em;
    padding-top: 1em;
  }
}
</style>
