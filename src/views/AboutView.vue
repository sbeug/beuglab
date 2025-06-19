<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

onMounted(() => {
  gsap.from('#about-us', {
    opacity: 0,
    ease: 'power2.inOut',
    delay: 0.5,
    duration: 2,
  })
  const experienceContainerTl = gsap.timeline({
    scrollTrigger: {
      trigger: '#experience-container',
      start: 'top 0%',
      end: '+=500%',
      pin: true,
      pinSpacing: true,
      scrub: true,
      invalidateOnRefresh: true,
    },
  })
  experienceContainerTl.set('#about-us', {
    opacity: 1,
    delay: 2,
  })
  experienceContainerTl.to(
    '#about-us',
    {
      opacity: 0,
      ease: 'power2.inOut',
      duration: 0.5,
    },
    0.1,
  )
  experienceContainerTl.from(
    '#h-top',
    {
      opacity: 0,
      ease: 'power2.inOut',
      duration: 1,
      xPercent: -150,
    },
    0.4,
  )
  experienceContainerTl.from(
    '#h-bottom',
    {
      opacity: 0,
      ease: 'power2.inOut',
      duration: 1,
      xPercent: 150,
    },
    0.4,
  )
  experienceContainerTl.to(
    '.experience-heading',
    {
      opacity: 0,
      ease: 'power2.inOut',
      duration: 0.5,
      scale: 3,
    },
    1.25,
  )
  experienceContainerTl.to(
    '#experience-video',
    {
      opacity: 0,
      ease: 'power2.inOut',
      duration: 0.5,
    },
    1.5,
  )
  experienceContainerTl.to(
    '#experience-container',
    {
      opacity: 0,
      ease: 'power2.inOut',
      duration: 0.5,
    },
    1.5,
  )
})

onBeforeUnmount(() => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
})
</script>
<template>
  <div id="main-content">
    <div id="section-1">
      <div id="experience-container">
        <video id="experience-video" autoplay muted playsinline loop preload="auto">
          <source src="../assets/content/video/BeugLab-ShowreelPreview.mp4" type="video/mp4" />
        </video>
        <div id="about-us">
          <h6>About us.</h6>
          <h6>
            We are interested in cancer biology with respect to understanding cell death mechanisms
            and immunity. In particular, we focus on a group of proteins called the Inhibitor of
            Apoptosis. We investigate how this group of proteins shape cancer development and
            regulate immune responses.
          </h6>
        </div>
        <div class="experience-heading">
          <div id="h-top">
            <h1>We are</h1>
          </div>
          <div id="h-bottom">
            <h1>Beug Lab</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
#main-content {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
#section-1 {
  position: relative;
  width: 100vw;
  height: 500vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
#experience-container {
  position: absolute;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--nero);
  overflow: hidden;
}
#experience-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 60%;
  scale: 1.05;
}
#about-us {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 75%;
  color: var(--blanco);
  text-align: justify;
}
#about-us :nth-child(1) {
  font-size: 2em;
  margin-bottom: 0.5em;
}
#about-us h6 {
  font-size: 1.25em;
  line-height: 1.5;
}
.experience-heading {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--blanco);
  will-change: transform, opacity, scale;
}
.experience-heading h1 {
  font-size: 3em;
  line-height: 1em;
  text-transform: uppercase;
}
/* TABLET 1 [GLOBAL] */
@media (min-width: 768px) {
  .experience-heading h1 {
    font-size: 6em;
  }
}
/* TABLET 2 [GLOBAL] */
@media (min-width: 1000px) {
  .experience-heading h1 {
    font-size: 8em;
  }
}
/* DESKTOP 1 [GLOBAL] */
@media (min-width: 1280px) {
  #about-us {
    width: 100%;
  }
  #about-us :nth-child(1) {
    font-size: 3em;
  }
  #about-us h6 {
    font-size: 2.5em;
    line-height: 1.5;
  }
  .experience-heading h1 {
    font-size: 14em;
    line-height: 1.5em;
  }
  #h-top,
  #h-bottom {
    position: absolute;
  }
  #h-top {
    top: 20%;
    left: 2.5%;
  }
  #h-bottom {
    bottom: 20%;
    right: 2.5%;
  }
}
</style>
