<script setup>
import { ref } from 'vue'
import { onMounted, onBeforeUnmount } from 'vue'
import { useTeamStore } from '@/stores/team.js'
import TeamSideBar from '@/components/TeamSidebar.vue'
import TeamMember from '@/components/TeamMember.vue'
import TeamMobileNav from '@/components/TeamMobileNav.vue'
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
    <aside id="side-bar">
      <TeamSideBar :members="teamStore.members" @select="selectMember" :selected="selectedMember" />
    </aside>
    <div>
      <TeamMobileNav
        :members="teamStore.members"
        :selected="selectedMember"
        @select="selectMember"
      />
    </div>
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
  width: 100vw;
  height: 125vh;
  will-change: height;
  transition: all 0.5s ease;
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
/* DESKTOP 1 [GLOBAL] */
@media (min-width: 1280px) {
  #main-content {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(10, 1fr);
  }
  #side-bar {
    position: fixed;
    grid-column: 9 / span 12;
    top: 20%;
  }
  #team-member-container {
    grid-column: 1 / span 8;
    grid-row: 2 / span 10;
  }
}
</style>
