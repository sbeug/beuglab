<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { homeSpline, cleanupHomeSpline } from '@/assets/js/spline.js'

onMounted(() => {
  homeSpline()
})

onBeforeUnmount(() => {
  cleanupHomeSpline()
})
</script>

<template>
  <div>
    <div id="hero-spline">
      <canvas id="home-spline" class="clickable"></canvas>
    </div>
    <div id="hero-section">
      <div id="hero-heading" class="df-pad">
        <h1>Beug Lab</h1>
        <h3 id="mobile-heading">
          Advancing cancer research through - collaboration, curiosity, and scientific excellence.
        </h3>
        <div id="hero-c2a" class="clickable">
          <router-link to="/about">
            <button class="button"><p>Learn more</p></button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#hero-section {
  z-index: 1;
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.hero-img {
  position: relative;
  object-fit: cover;
  width: 100%;
  height: 100%;
}
#hero-spline {
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  opacity: 100%;
  pointer-events: auto !important;
}
#hero-heading h1 {
  font-family: new-science-extended, sans-serif;
  font-weight: 700;
  font-style: normal;
  letter-spacing: normal;
  font-size: 5em;
  color: var(--font-color-main);
  text-transform: uppercase;
  width: 100%;
  text-align: left;
  line-height: 1em;
}
#mobile-heading {
  padding-top: 2em;
  padding-bottom: 2em;
  font-size: 1.25em;
  line-height: 1.5em;
  text-wrap: wrap;
}
#hero-c2a {
  position: relative;
  z-index: 5;
}
/* TABLET 1 [GLOBAL] */
@media (min-width: 768px) {
  #hero-heading {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  #hero-heading h1 {
    font-size: 6em;
    text-align: center;
  }
  #mobile-heading {
    padding-top: 1em;
    font-size: 2em;
    width: 85%;
    text-align: center;
    text-wrap: balance !important;
  }
  #hero-c2a {
    font-size: 1.25em;
  }
}
/* TABLET 2 [GLOBAL] */
@media (min-width: 1000px) {
  #hero-heading h1 {
    font-size: 8em;
  }
  #mobile-heading {
    padding-top: 1.5em;
    font-size: 1.5rem;
    width: 65%;
  }
}
/* DESKTOP 1 [GLOBAL] */
@media (min-width: 1280px) {
  #hero-section {
    align-items: center;
    pointer-events: none;
  }
  #hero-heading {
    transform: translateY(-1em);
    padding: 0;
  }
  #hero-heading h1 {
    font-size: 10rem;
  }
  #mobile-heading {
    display: none !important;
    font-size: 1.5rem;
    width: 80%;
  }
  #hero-c2a {
    display: none !important;
  }
}
/* DESKTOP 2 [GLOBAL] */
@media (min-width: 1440px) {
  #hero-heading h1 {
    font-size: 11rem;
  }
}
/* DESKTOP 3 [GLOBAL] */
@media (min-width: 1728px) {
  #hero-heading h1 {
    font-size: 12rem;
  }
}
/* DESKTOP 4 [GLOBAL] */
@media (min-width: 1920px) {
  #hero-heading h1 {
    font-size: 14rem;
  }
}
</style>
