<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import '@splinetool/viewer'
import { useTeamStore } from '@/stores/team.js'
import { homePageLoadAnimation, dragToScroll } from '@/assets/js/customAnimations'

const teamStore = useTeamStore()

onMounted(() => {
  homePageLoadAnimation()
  setTimeout(() => {
    dragToScroll()
  }, 1000)
})
onBeforeUnmount(() => {})
</script>

<template>
  <div id="main-content" class="main-content">
    <div id="hero-section">
      <div id="hero-heading" class="df-pad">
        <h1>Beug Lab</h1>
      </div>
      <div id="hero-img"></div>
    </div>
    <div id="obj-section" class="section df-pad">
      <div class="section-heading">
        <p>01</p>
        <h6>Our Objective</h6>
      </div>
      <div class="section-statement">
        <h6>Through innovative science, we aim to improve diagnosis, treatment, and outcomes.</h6>
      </div>
    </div>
    <div id="ourwork-section" class="section df-pad">
      <div class="section-heading">
        <p>02</p>
        <h6>Our Work</h6>
      </div>
      <div id="ourwork-statement" class="section-statement">
        <h6>
          We conduct innovative cancer research aimed at uncovering the underlying mechanisms of
          cancer.
        </h6>
      </div>
    </div>
    <div id="team-section" class="section df-pad">
      <div class="section-heading">
        <p>03</p>
        <h6>Team</h6>
      </div>
      <div id="team-statement" class="section-statement">
        <h6>Meet the Dedicated Team Driving Our Research Forward.</h6>
      </div>
      <div id="team-content">
        <div id="team-description" class="description">
          <p>
            Beug Lab is made up of a diverse team of students, professionals, and doctors, all
            dedicated to advancing cancer research. With a blend of fresh perspectives and
            expertise, we work together to drive impactful discoveries that improve treatment and
            outcomes.
          </p>
        </div>
        <div id="team-c2a" class="clickable">
          <router-link to="/about/team" class="button">
            <p>Meet the Team</p>
            <div class="circle"></div>
            <div class="dot"></div>
          </router-link>
        </div>
        <div id="team-members-section" class="clickable">
          <div id="members-track" class="clickable">
            <div v-for="member in teamStore.members" :key="member.id" class="team-member clickable">
              <img :src="member.photo" :alt="member.name" class="member-photo" />
              <h6>{{ member.name }}</h6>
              <p>{{ member.title }}</p>
            </div>
          </div>
        </div>
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
  overflow: hidden;
}
#hero-heading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: fit-content;
  overflow: hidden;
}
#hero-heading h1 {
  font-size: 2em;
  color: #f8f8f8;
  text-transform: uppercase;
}
#hero-heading {
  font-family: new-science-extended, sans-serif;
  font-weight: 700;
  font-style: normal;
  letter-spacing: normal;
}
.section {
  position: relative;
  width: 100vw;
  height: 100%;
  margin-bottom: 4em;
}
.section-heading {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.section-heading p {
  font-family: new-science-extended, sans-serif;
  font-weight: 700;
  font-style: normal;
  letter-spacing: normal;
}
.section p,
.section h6 {
  color: #f8f8f8;
}
.description {
  font-family: akzidenz-grotesk-next-pro, sans-serif;
  font-weight: 300;
  font-style: normal;
  letter-spacing: normal;
}
#team-members-section {
  position: relative;
  width: 100%;
  overflow-x: visible;
}
#members-track {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: max-content;
  will-change: transform;
}
.team-member {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 2em;
  width: fit-content;
  height: fit-content;
}
.team-member h6 {
  font-family: new-science-extended, sans-serif;
  font-weight: 700;
  font-style: normal;
  letter-spacing: normal;
}
.team-member h6 {
  font-size: 1em;
  font-family: akzidenz-grotesk-next-pro, sans-serif;
  font-weight: 300;
  font-style: normal;
  letter-spacing: normal;
}
.team-member p {
  font-family: akzidenz-grotesk-next-pro, sans-serif;
  font-weight: 400;
  font-style: normal;
  letter-spacing: normal;
}
/* DESKTOP 1 [GLOBAL] */
@media (min-width: 1280px) {
  #hero-heading {
    align-items: flex-start;
    justify-content: flex-start;
    padding-top: 2em;
  }
  #hero-heading {
    padding-top: 2em;
  }
  #hero-heading h1 {
    font-size: 10em;
  }
  #hero-img {
    width: 92%;
    height: 70%;
    background-color: #181818;
    position: absolute;
    top: 62%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .section {
    margin-bottom: 24em;
  }
  .section-heading p {
    font-size: 1em;
    line-height: 1em;
  }
  .section-heading h6 {
    font-size: 2em;
    line-height: 1em;
    padding-left: 3em;
  }
  .section-statement {
    padding-top: 4em;
    padding-left: 8em;
  }
  .section-statement h6 {
    font-size: 8em;
    line-height: 1em;
    width: 75%;
  }
  .description {
    font-size: 1.5em;
    line-height: 1.2em;
    width: 30%;
  }
  #obj-section {
    padding-top: 10em;
  }
  #ourwork-statement h6,
  #team-statement h6 {
    font-size: 6em;
  }
  #team-description {
    padding-top: 4em;
    padding-left: 5.5em;
  }
  #team-c2a {
    padding-top: 4em;
    padding-left: 8em;
  }
  #team-c2a p {
    font-size: 1.5em;
  }
  #team-content {
    position: relative;
  }
  #team-members-section {
    position: absolute;
    top: 0;
    left: 0;
    overflow-x: visible;
    -webkit-overflow-scrolling: touch;
    scroll-behavior: smooth;
    white-space: nowrap;
    cursor: grab;
  }
  .team-member {
    margin-right: 4em;
    margin-top: 6em;
  }
  .team-member h6 {
    font-size: 2em;
  }
  .team-member p {
    font-size: 1.25em;
  }
}
/* DESKTOP 2 (Macbook pro 13 inch display) -----------------------------------------------------------------------------------*/
@media screen and (min-width: 1280px) and (-webkit-min-device-pixel-ratio: 2) and (min-resolution: 192dpi) {
  .section-statement h6 {
    font-size: 7em;
    line-height: 1em;
    width: 80%;
  }
  #ourwork-statement h6,
  #team-statement h6 {
    font-size: 5em;
  }
  .description {
    width: 40%;
  }
  #team-members-section {
    top: -0%;
    left: 50%;
  }
  .member-photo {
    width: 25em;
    height: 30em;
    border: 1px solid #f8f8f8;
  }
}
/* DESKTOP 4 (Standard pc Monitor) */
@media only screen and (min-width: 1920px) {
  .description {
    width: 35%;
  }
  #team-members-section {
    left: 50%;
  }
  .member-photo {
    width: 20em;
    height: 25em;
    border: 1px solid #f8f8f8;
  }
}
</style>
