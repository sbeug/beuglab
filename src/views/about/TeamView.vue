<script setup>
import { ref } from 'vue'
import { useTeamStore } from '@/stores/team.js'
import TeamSideBar from '@/components/TeamSidebar.vue'
import TeamMember from '@/components/TeamMember.vue'
import TeamMobileNav from '@/components/TeamMobileNav.vue'

const teamStore = useTeamStore()
const selectedMember = ref(teamStore.members[0])

const selectMember = (member) => {
  selectedMember.value = member
}
</script>
<template>
  <div id="main-content" class="main-content">
    <aside id="side-bar">
      <TeamSideBar :members="teamStore.members" @select="selectMember" />
    </aside>
    <div>
      <TeamMobileNav
        :members="teamStore.members"
        :selected="selectedMember"
        @select="selectMember"
      />
    </div>
    <div id="team-member-container">
      <TeamMember :member="selectedMember" />
    </div>
  </div>
</template>
<style scoped>
#main-content {
  height: 100vh;
}
/* DESKTOP 1 [GLOBAL] */
@media (min-width: 1280px) {
  #main-content {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(10, 1fr);
  }
  #side-bar {
    grid-column: 9 / span 12;
    grid-row: 5;
  }
  #team-member-container {
    grid-column: 1 / span 8;
    grid-row: 3 / span 10;
  }
}
</style>
