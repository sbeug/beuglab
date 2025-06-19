<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { useTeamStore } from '@/stores/team.js'
import { sanity } from '@/assets/js/sanity.js'
import { homePageLoadAnimation, dragToScroll, textColorIn } from '@/assets/js/customAnimations'

const teamStore = useTeamStore()

// Reactive sanity variables
const sectionOneTitle = ref('')
const sectionOneText = ref('')
const sectionTwoTitle = ref('')
const sectionTwoText = ref('')
const teamDescription = ref('')

// Add ref to track if component is still mounted
const isMounted = ref(false)

onMounted(async () => {
  isMounted.value = true
  homePageLoadAnimation()
  textColorIn()
  try {
    const query = `*[_type == "homePage"][0] {
      sectionOneTitle,
      sectionOneText,
      sectionTwoTitle,
      sectionTwoText,
      teamDescription,
    }`
    const data = await sanity.fetch(query)
    sectionOneTitle.value = data.sectionOneTitle
    sectionOneText.value = data.sectionOneText
    sectionTwoTitle.value = data.sectionTwoTitle
    sectionTwoText.value = data.sectionTwoText
    teamDescription.value = data.teamDescription
  } catch (error) {
    console.error('Sanity fetch failed:', error.message)
    error.value = 'Failed to load live content. Showing default info.'
  }
  await teamStore.fetchTeamMembers()
  setTimeout(() => {
    if (isMounted.value) {
      dragToScroll()
    }
  }, 1000)
})
onBeforeUnmount(() => {
  isMounted.value = false

  if (window.dragToScrollTimeout) {
    clearTimeout(window.dragToScrollTimeout)
  }

  const splineViewer = document.getElementById('hero-spline')
  if (splineViewer) {
    splineViewer.remove()
  }

  if (window.animationFrameId) {
    cancelAnimationFrame(window.animationFrameId)
  }
})
</script>

<template>
  <div id="main-content" class="main-content">
    <div id="hero-section">
      <div class="hero-bg">
        <spline-viewer
          url="https://prod.spline.design/FCbn4L9mentHyEzd/scene.splinecode"
          id="hero-spline"
        >
        </spline-viewer>
      </div>
      <div id="hero-heading" class="df-pad">
        <h1>Beug Lab</h1>
        <h3 id="mobile-heading">
          Advancing cancer research through - collaboration, curiosity, and scientific excellence.
        </h3>
        <router-link id="hero-c2a" class="button" to="/about">Learn more</router-link>
      </div>
    </div>
    <div id="obj-section" class="section df-pad">
      <div class="section-heading">
        <p>01</p>
        <h6>{{ sectionOneTitle }}</h6>
        <h6 v-if="error">Our Objective</h6>
      </div>
      <div class="section-statement">
        <h6>
          {{ sectionOneText }}
        </h6>
        <h6 v-if="error">
          We decode immune-cancer interactions and leverage immune-based therapies to enhance
          anti-tumor responses.
        </h6>
      </div>
    </div>
    <div id="ourwork-section" class="section df-pad">
      <div class="section-heading">
        <p>02</p>
        <h6>{{ sectionTwoTitle }}</h6>
        <h6 v-if="error">Our Work</h6>
      </div>
      <div id="ourwork-statement" class="section-statement">
        <h6>{{ sectionTwoText }}</h6>
        <h6 v-if="error">
          Investigating the inhibitor of apoptosis proteins (IAPs) and their control of cell death,
          inflammation, and anti-tumour immunity.
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
          <p>{{ teamDescription }}</p>
          <p v-if="error">
            The Beug Lab is a collaborative team of trainees, postdocs, and associate scientists at
            the Children's Hospital of Eastern Ontario Research Institute (CHEO RI). Our team is
            interested in programmed cell death, inflammation, cancer immunology, and the
            development of cancer immunotherapies
          </p>
        </div>
        <div id="team-c2a" class="clickable">
          <router-link to="/about/team" class="button">
            <iframe
              id="beuglab-button"
              src="https://my.spline.design/beuglabbutton-fWTez99a1IlaBHjtaJuxIuNU-dmJ/"
              frameborder="0"
              width="100%"
              height="100%"
            ></iframe>
            <p>Meet the Team</p>
          </router-link>
        </div>
        <div id="team-members-section">
          <div id="members-track" class="clickable">
            <div
              v-for="member in teamStore.members.slice().sort((a, b) => a.id - b.id)"
              :key="member.id"
              class="team-member clickable"
            >
              <div class="member-photo">
                <img :src="member.headshot" :alt="member.name" />
              </div>
              <h3>{{ member.name }}</h3>
              <p>{{ member.title }}</p>
            </div>
          </div>
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
.hero-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
.hero-img {
  position: relative;
  object-fit: cover;
  width: 100%;
  height: 100%;
}
#hero-spline {
  z-index: 0;
  position: absolute;
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
#obj-section {
  background: linear-gradient(180deg, rgba(233, 233, 233, 0) 0%, rgba(233, 233, 233, 1) 100%);
}
.section {
  z-index: 1;
  position: relative;
  width: 100vw;
  height: 100%;
  padding-bottom: 18em;
  background: #e9e9e9;
}
.section-heading {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}
.section-heading h6 {
  font-size: 2em;
  line-height: 1em;
  padding-left: 0.5em;
}
.section-heading p {
  font-family: new-science-extended, sans-serif;
  font-weight: 700;
  font-style: normal;
  letter-spacing: normal;
  font-size: 0.5em;
  border: 1px dashed var(--nero);
  border-radius: 100%;
  height: 5em;
  width: 5em;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(-15px);
}
.section p,
.section h6 {
  color: var(--font-color-main);
}
.section-statement {
  padding-top: 2em;
}
.section-statement h6 {
  font-size: 2.75em;
  line-height: 1em;
}
#ourwork-statement h6,
#team-statement h6 {
  line-height: 1.2em;
  font-size: 2em;
}
#team-description {
  padding-top: 2em;
  font-size: 1.25em;
  line-height: 1.2em;
}
#team-c2a {
  position: relative;
  padding-top: 2em;
  padding-bottom: 2em;
}
.button {
  overflow: hidden;
}
#team-c2a p {
  z-index: 2;
}
#beuglab-button {
  display: none;
  position: absolute;
  width: 100%;
  height: 3em;
  scale: 1;
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
  overflow-x: scroll;
  scrollbar-width: none;
  padding-top: 1em;
}
#members-track {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  max-width: fit-content;
  will-change: transform;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
  transition: all 0.1s ease;
  user-select: none;
  overflow-x: visible;
  scrollbar-width: none;
}
.team-member {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: fit-content;
  height: fit-content;
  margin-right: 2em;
}
.team-member h3 {
  font-size: 1.5em;
  letter-spacing: normal;
  padding-top: 0.5em;
  color: var(--font-color-main);
}
.team-member p {
  font-family: akzidenz-grotesk-next-pro, sans-serif;
  font-weight: 400;
  font-style: normal;
  letter-spacing: normal;
  line-height: 1.5em;
}
.member-photo {
  width: 18em;
  height: 25em;
  border-radius: 10px;
  border: none;
  box-shadow: 4px 4px 10px #2222221a;
}
.member-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  pointer-events: none;
}
/* TABLET 2 [GLOBAL] */
@media (min-width: 1000px) {
  #hero-heading {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  #hero-heading h1 {
    font-size: 8em;
    text-align: center;
  }
  #mobile-heading {
    padding-top: 1.5em;
    font-size: 1.5em;
    width: 65%;
    text-align: center;
    text-wrap: balance !important;
  }
  #hero-c2a {
    font-size: 1.25em;
  }
  .section-heading h6 {
    font-size: 2.5em;
    line-height: 1.2em;
  }
  .section-heading p {
    font-size: 0.75em;
  }
  .section-statement h6 {
    font-size: 3.5em;
    line-height: 1.2em;
  }
  #ourwork-statement h6,
  #team-statement h6 {
    font-size: 3em;
    line-height: 1.2em;
  }
  #team-description p {
    font-size: 1.25em;
    line-height: 1.25em;
    width: 70%;
  }
  #team-c2a p {
    font-size: 1.25em;
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
    font-size: 12em;
  }
  #mobile-heading {
    display: none !important;
  }
  #hero-c2a {
    display: none !important;
  }
  .section {
    padding-bottom: 24em;
  }
  .section-heading {
    align-items: center;
  }
  .section-heading p {
    font-size: 1em;
    line-height: 1em;
    height: 5em;
    width: 5em;
    transform: translateY(0);
  }
  .section-heading h6 {
    font-size: 2em;
    padding-left: 3em;
  }
  .section-statement {
    padding-top: 4em;
    padding-left: 8em;
  }
  .section-statement h6 {
    font-size: 6.5em;
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
    font-size: 5em;
  }
  #team-description {
    padding-top: 4em;
    padding-left: 7em;
  }
  #team-description p {
    font-size: 1em;
    line-height: 1.25em;
    width: 100%;
  }
  #team-c2a {
    padding-top: 4em;
    padding-left: 8em;
  }
  #beuglab-button {
    display: unset;
    scale: 1.2;
  }
  #team-c2a p {
    font-size: 1.5em;
    padding-right: 2.5em;
  }
  #team-content {
    position: relative;
  }
  #team-members-section {
    position: absolute;
    top: 0;
    left: 50%;
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
  .team-member h3 {
    padding: 0;
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
    padding: 0;
    top: -0%;
    left: 50%;
  }
  .member-photo {
    width: 25em;
    height: 30em;
  }
}
/* DESKTOP 4 (Standard pc Monitor) */
@media only screen and (min-width: 1920px) {
  .description {
    width: 30%;
  }
  #team-members-section {
    left: 50%;
  }
  .member-photo {
    width: 22.5em;
    height: 30em;
  }
}
</style>
