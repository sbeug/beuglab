<script setup>
import { ref } from 'vue'
import { onMounted, onBeforeUnmount } from 'vue'
import { useTeamStore } from '@/stores/team.js'
import { useAlumniStore } from '@/stores/alumni.js'
import TeamSideBar from '@/components/TeamSidebar.vue'
import TeamMember from '@/components/TeamMember.vue'
import { teamViewAnimations } from '@/assets/js/customAnimations'

const teamStore = useTeamStore()
const selectedMember = ref(teamStore.members[0])

const alumniStore = useAlumniStore()
const isAlumniSelected = ref(false)

const selectMember = (member) => {
  if (member.type === 'alumni') {
    isAlumniSelected.value = true
    selectedMember.value = member
  } else {
    isAlumniSelected.value = false
    selectedMember.value = member
  }
}

onMounted(() => {
  teamViewAnimations()
  teamStore.fetchTeamMembers().then(() => {
    const defaultMember = teamStore.members.find((member) => member.id === 1)
    if (defaultMember) {
      selectedMember.value = defaultMember
    }
  })
  alumniStore.fetchAlumni()
})

onBeforeUnmount(() => {})
</script>
<template>
  <div id="main-content" class="main-content">
    <button id="mobile-btn" class="clickable">
      <p>members</p>
      <img id="arrow" src="../../assets/content/icons/right-arrow-white.png" alt="right-arrow" />
    </button>
    <aside id="side-bar" class="clickable">
      <TeamSideBar
        :members="teamStore.members"
        @select="selectMember"
        :selected="selectedMember"
        :alumnus="alumniStore.alumni"
      />
    </aside>
    <div id="team-member-container">
      <transition name="member-fade" mode="out-in">
        <TeamMember
          v-if="!isAlumniSelected"
          :key="selectedMember?.id || 'team-member'"
          :member="selectedMember"
        />
        <div v-else id="alumni-list-container" :key="'alumni-list'" class="df-pad">
          <h1 class="alumni-heading">Beug Lab Alumni</h1>
          <ul class="alumni-list">
            <li v-for="alumnus in alumniStore.alumni" :key="alumnus.id" class="alumni-item">
              <h3 class="alumni-name">{{ alumnus.name }}</h3>
              <p class="alumni-role">{{ alumnus.title }}</p>
            </li>
          </ul>
        </div>
      </transition>
    </div>
  </div>
</template>
<style scoped>
#main-content {
  position: relative;
  display: grid;
  grid-template-rows: repeat(8, 1fr);
  width: 100vw;
  height: 100%;
  will-change: height;
  transition: all 0.5s ease;
  overflow: visible;
  padding-bottom: 4em;
}
.member-fade-enter-active {
  transition: all 0.6s ease-out;
}
.member-fade-leave-active {
  transition: all 0.4s ease-in;
}
.member-fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
  filter: blur(5px);
}
.member-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
  filter: blur(5px);
}
#mobile-btn {
  z-index: 6;
  position: fixed;
  top: 6.5em;
  left: 1.5em;
  margin-left: 1em;
  background-color: #e9e9e98a;
  backdrop-filter: blur(10px);
  margin: 0;
  padding-top: 1.5em;
  padding-bottom: 1.5em;
  padding-left: 2em;
  height: 2.5em;
  border: 1px solid var(--nero);
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}
#mobile-btn p {
  color: var(--font-color-main);
  text-transform: uppercase;
  font-size: 1em;
  margin: 0;
  padding: 0;
}
#arrow {
  width: 1em;
  height: 1em;
  aspect-ratio: 1;
  margin-left: 0.5em;
  margin-right: 0.5em;
}
#side-bar {
  z-index: 5;
  position: fixed;
  top: -5%;
  left: -100%;
  width: 100%;
  height: 100vh;
  background-color: #e9e9e98a;
  backdrop-filter: blur(20px);
}
#team-member-container {
  grid-row: 1 / span 8;
  padding-top: 8em;
}
#alumni-list-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.alumni-list {
  list-style: none;
  margin: 0;
  padding: 0;
}
/* TABLET 1 [GLOBAL] */
@media (min-width: 768px) {
  #mobile-btn {
    top: 8em;
  }
}
/* TABLET 2 [GLOBAL] */
@media (min-width: 768px) {
  #mobile-btn {
    display: none;
  }
  #main-content {
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(8, 1fr);
    min-height: 100vh;
    height: 100%;
    padding-bottom: 6em;
    will-change: height;
    transition: all 0.5s ease;
  }
  #side-bar {
    position: fixed;
    top: -10%;
    left: 60%;
    background-color: rgba(0, 0, 0, 0);
    backdrop-filter: blur(0px);
    padding-top: 0em;
    min-height: 100vh;
    max-height: 100vh;
  }
  #team-member-container {
    padding: 0;
    grid-column: 1 / span 8;
    grid-row: 2 / span 10;
    padding-right: 4em;
  }
}
/* DESKTOP 1 [GLOBAL] */
@media (min-width: 1280px) {
  #main-content {
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(10, 1fr);
    min-height: 100vh;
    height: 100%;
    padding-bottom: 6em;
    will-change: height;
    transition: all 0.5s ease;
  }
  #mobile-btn {
    display: none;
  }
  #side-bar {
    position: relative;
    grid-column: 9 / span 12;
    grid-row: 1 / span 10;
    top: 0%;
    left: 0%;
    background-color: rgba(0, 0, 0, 0);
    backdrop-filter: blur(0px);
    transform: translateY(-10%);
    padding-top: 9em;
    min-height: 100vh;
    max-height: 100vh;
  }
  #team-member-container {
    padding: 0;
    grid-column: 1 / span 8;
    grid-row: 2 / span 10;
  }
  #alumni-list-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  .alumni-heading {
    font-size: 4em;
    grid-column: 1 / span 2;
  }
  .alumni-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column: 1 / span 2;
  }
  .alumni-name {
    font-size: 2em;
  }
}
/* DESKTOP 2 (Macbook Pro 15-Inch -------------------------------------------------------------------------------------------*/
@media (min-width: 1440px) {
  .alumni-heading {
    font-size: 6em;
  }
  #side-bar {
    transform: translateY(-6%);
  }
}
</style>
