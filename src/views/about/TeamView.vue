<script setup>
import { ref } from 'vue'
import { onMounted, onBeforeUnmount } from 'vue'
import { useTeamStore } from '@/stores/team.js'
import TeamSideBar from '@/components/TeamSidebar.vue'
import TeamMember from '@/components/TeamMember.vue'
import { teamViewAnimations } from '@/assets/js/customAnimations'

const teamStore = useTeamStore()
const selectedMember = ref(teamStore.members[0])

const selectMember = (member) => {
  selectedMember.value = member
}

onMounted(() => {
  teamViewAnimations()
})
onBeforeUnmount(() => {})
</script>
<template>
  <div id="main-content" class="main-content">
    <button id="mobile-btn" class="clickable">
      <p>team members</p>
    </button>
    <aside id="side-bar">
      <TeamSideBar :members="teamStore.members" @select="selectMember" :selected="selectedMember" />
    </aside>
    <div id="team-member-container">
      <transition name="member-fade" mode="out-in">
        <TeamMember :member="selectedMember" :key="selectedMember.id" />
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
  z-index: 2;
  position: absolute;
  top: 6em;
  left: 1.5em;
  margin-left: 1em;
  background-color: #454545c3;
  margin: 0;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  height: 3em;
  border-radius: 25px;
}
#mobile-btn p {
  color: #f8f8f8;
  text-transform: uppercase;
  font-size: 1em;
  margin: 0;
  padding: 0;
}
#side-bar {
  z-index: 1;
  position: fixed;
  top: 0%;
  left: -100%;
  width: 100%;
  height: 100%;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(15px);
}
#team-member-container {
  grid-row: 1 / span 8;
  padding-top: 7em;
}
/* DESKTOP 1 [GLOBAL] */
@media (min-width: 1280px) {
  #main-content {
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(10, 1fr);
    height: 125vh;
  }
  #mobile-btn {
    display: none;
  }
  #side-bar {
    position: fixed;
    grid-column: 9 / span 12;
    top: 20%;
    left: 65%;
    background-color: rgba(0, 0, 0, 0);
    backdrop-filter: blur(0px);
    transform: translateY(0%);
  }
  #team-member-container {
    padding: 0;
    grid-column: 1 / span 8;
    grid-row: 2 / span 10;
  }
}
</style>
