<script setup>
import { ref, onMounted } from 'vue'
import { useTeamStore } from '@/stores/team.js'
import { sanity } from '@/assets/js/sanity.js'

const teamStore = useTeamStore()
const teamDescription = ref('')
const error = ref(false)
const scrollContainer = ref(null)

onMounted(async () => {
  await teamStore.fetchTeamMembers()

  try {
    const query = `*[_type == "homePage"][0] {
      teamDescription
    }`
    const data = await sanity.fetch(query)
    teamDescription.value = data.teamDescription
  } catch (error) {
    error.value = true
  }
})

function scrollLeft() {
  const cardWidth = scrollContainer.value?.querySelector('.team-member')?.offsetWidth || 0
  const gap = 32 // 2rem gap
  scrollContainer.value?.scrollBy({
    left: -(cardWidth + gap),
    behavior: 'smooth',
  })
}

function scrollRight() {
  const cardWidth = scrollContainer.value?.querySelector('.team-member')?.offsetWidth || 0
  const gap = 32 // 2rem gap
  scrollContainer.value?.scrollBy({
    left: cardWidth + gap,
    behavior: 'smooth',
  })
}
</script>

<template>
  <div id="team-section" class="section">
    <div class="df-pad">
      <div class="section-heading">
        <p>03</p>
        <h6>Our Team</h6>
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
      </div>
      <div id="team-members-section" ref="scrollContainer">
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
      <div class="buttons clickable">
        <button class="scroll-btn left" @click="scrollLeft">‹</button>
        <button class="scroll-btn right" @click="scrollRight">›</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
  font-size: 2rem;
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
  font-size: 2rem;
  line-height: 1em;
}
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
  padding-top: 1em;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
#team-members-section::-webkit-scrollbar {
  display: none;
}
#members-track {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 2rem;
}
.team-member {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: fit-content;
  height: fit-content;
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
.buttons {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
  padding-right: 2rem;
}
.scroll-btn {
  background: #2222226b;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--blanco);
}
.scroll-btn:hover {
  background-color: var(--nero);
  transform: scale(1.03);
}

/* TABLET 1 [GLOBAL] */
@media (min-width: 768px) {
  .section-heading p {
    font-size: 0.75em;
  }
  .section-statement h6 {
    font-size: 3em;
    line-height: 1.2em;
  }
  #team-statement h6 {
    font-size: 2.5em;
    line-height: 1.2em;
  }
  #team-description p {
    font-size: 1.25em;
    line-height: 1.25em;
    width: 100%;
  }
  #team-c2a p {
    font-size: 1.25em;
  }
}
/* TABLET 2 [GLOBAL] */
@media (min-width: 1000px) {
  .section-heading h6 {
    font-size: 2.5rem;
    line-height: 1.2em;
  }
  .section-statement h6 {
    font-size: 3.5rem;
    line-height: 1.2em;
  }
  #team-statement h6 {
    font-size: 3rem;
    line-height: 1.2em;
  }
  #team-description p {
    font-size: 1.25rem;
    width: 70%;
  }
}
/* DESKTOP 1 [GLOBAL] */
@media (min-width: 1280px) {
  .section {
    padding-bottom: 24em;
  }
  .section-heading {
    align-items: center;
  }
  .section-heading p {
    font-size: 1rem;
    line-height: 1em;
    height: 5em;
    width: 5em;
    transform: translateY(0);
  }
  .section-heading h6 {
    font-size: 2rem;
    padding-left: 3em;
  }
  .section-statement {
    padding-top: 4em;
    padding-left: 8em;
  }
  .section-statement h6 {
    font-size: 6.5rem;
    width: 75%;
  }
  .description {
    font-size: 1.5rem;
    line-height: 1.2em;
    width: 30%;
  }
  #team-statement h6 {
    font-size: 3.5rem;
  }
  #team-description {
    margin-left: 6.5em;
    width: 100%;
  }
  #team-description p {
    font-size: 1.25rem;
    line-height: 1.25em;
    width: 100%;
  }
  #team-c2a {
    grid-column: 1;
    grid-row: 2;
    padding-top: 4em;
    padding-left: 8em;
    cursor: pointer;
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
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  #team-description {
    grid-column: 1;
  }
  #team-members-section {
    position: relative;
    grid-column: 1 / span 2;
    grid-row: 3;
    margin-top: 3rem;
  }
  #members-track {
    position: relative;
    overflow-y: visible;
  }
  .team-member h3 {
    padding-top: 1rem;
    font-size: 1.75rem;
  }
  .team-member p {
    font-size: 1.25rem;
  }
  .buttons {
    z-index: 4;
    margin-top: 2rem;
    justify-content: center;
  }
  .scroll-btn {
    cursor: pointer !important;
  }
}
/* DESKTOP 2 [GLOBAL] */
@media (min-width: 1440px) {
  #team-statement h6 {
    font-size: 4rem;
  }
}
/* DESKTOP 3 [GLOBAL] */
@media (min-width: 1728px) {
  #team-description p {
    font-size: 1.5rem;
  }
}
/* DESKTOP 4 (Standard pc Monitor) */
@media (min-width: 1920px) {
  .section-statement h6 {
    font-size: 5rem;
  }
  .description {
    width: 30%;
  }
  .member-photo {
    width: 22.5em;
    height: 30em;
  }
}
/* DESKTOP 4 (4k) */
@media (min-width: 2160px) {
  #team-statement h6 {
    font-size: 5rem;
    width: 50%;
  }
  #team-description p {
    width: 75%;
  }
}
</style>
