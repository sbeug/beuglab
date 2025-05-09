<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { heroSpline } from '@/assets/js/splines'

onMounted(() => {
  heroSpline()
})
onBeforeUnmount(() => {})
</script>

<template>
  <div id="main-content">
    <canvas id="hero-spline"></canvas>
    <div id="hero-section">
      <div id="hero-heading">
        <h1>Beug Lab</h1>
      </div>
    </div>
    <div id="mission-section">
      <div id="mission-heading">
        <h1>Our Objective</h1>
      </div>
    </div>
  </div>
</template>
<style scoped>
#main-content {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
#hero-section {
  position: relative;
  width: 100vw;
  height: 100vh;
}
#hero-spline {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
#hero-heading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
#hero-heading h1 {
  font-size: 8em;
  color: #181818;
}
#mission-section {
  position: relative;
  width: 100vw;
  height: 100vh;
}
</style>
