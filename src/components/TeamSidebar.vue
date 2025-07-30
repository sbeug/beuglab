<script setup>
defineProps({
  members: Array,
  selected: Object,
  alumnus: Array,
})
const emit = defineEmits(['select'])
</script>
<template>
  <ul id="team-sidebar">
    <li
      v-for="member in members.slice().sort((a, b) => a.id - b.id)"
      :key="member.id"
      @click="emit('select', member)"
      class="member-link clickable"
    >
      <h3
        :class="{
          active: (selected && selected.id === member.id) || (!selected && member.id === 1),
        }"
      >
        {{ member.name }}
      </h3>
      <div
        class="number"
        :class="{
          activecircle: (selected && selected.id === member.id) || (!selected && member.id === 1),
        }"
      >
        <p
          :class="{
            activenumber: (selected && selected.id === member.id) || (!selected && member.id === 1),
          }"
        >
          {{ member.id }}
        </p>
      </div>
    </li>
    <li @click="emit('select', { id: 'alumni', type: 'alumni' })" class="member-link clickable">
      <h3 :class="{ active: selected && selected.id === 'alumni' }">Beug Lab Alumni</h3>
    </li>
  </ul>
</template>
<style scoped>
#team-sidebar {
  z-index: 2;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  height: 100%;
  max-height: 100vh;
  list-style: none;
  line-height: 4.5em;
  padding: 0;
  padding-left: 2em;
  padding-top: 3em;
}
.member-link {
  cursor: pointer;
  display: flex;
  align-items: flex-start;
  color: var(--font-color-main);
}
.member-link h3 {
  font-size: 1.75em;
  margin: 0;
  padding: 0;
  transition: 0.5s ease;
  color: #2222224f;
  transition: 0.5s ease;
  height: 1.5em;
}
.member-link h3:hover {
  color: var(--font-color-main);
  text-shadow: #e9e9e9 0px 0px 5px;
}
.active {
  color: var(--font-color-main) !important;
}
.activecircle {
  border-color: var(--font-color-main) !important;
}
.activenumber {
  color: var(--font-color-main) !important;
}
.number {
  border: 1px solid #f8f8f87c;
  border-radius: 50%;
  width: 1.5em;
  height: 1.5em;
  display: none;
  align-items: center;
  justify-content: center;
  transition: 0.5s ease;
}
.number p {
  color: #f8f8f87c;
  font-size: 0.75em;
  margin: 0;
  padding: 0;
  transition: 0.5s ease;
}
#alumni a {
  text-decoration: none;
}
/* TABLET 1 [GLOBAL] */
@media (min-width: 768px) {
  .member-link h3 {
    font-size: 1.25rem;
  }
}
/* TABLET 2 [GLOBAL] */
@media (min-width: 1000px) {
  .member-link h3 {
    font-size: 2rem;
  }
}
/* DESKTOP 1 [GLOBAL] */
@media (min-width: 1280px) {
  #team-sidebar {
    padding: 0em;
    justify-content: flex-start;
  }
  .member-link {
    font-size: 1.5em;
  }
  .member-link h3 {
    font-size: 1.25em;
    height: 1.5em;
  }
  .number {
    display: flex;
    transform: translateY(0px);
    width: 1.25em;
    height: 1.25em;
    margin-left: 0.25em;
  }
  .number p {
    font-size: 0.5em;
  }
}
/* DESKTOP 3 (Macbook Pro 15-Inch -------------------------------------------------------------------------------------------*/
@media (min-width: 1440px) {
  .member-link h3 {
    font-size: 2.5rem;
  }
  .member-link {
    font-size: 1.75rem;
  }
}
/* DESKTOP 3 [GLOBAL] */
@media (min-width: 1728px) {
  .member-link h3 {
    font-size: 3rem;
    text-wrap: nowrap;
  }
}
/* DESKTOP 4 (Standard pc Monitor) -------------------------------------------------------------------------------------------*/
@media (min-width: 1920px) {
  .member-link h3 {
    font-size: 3rem;
  }
  .member-link {
    font-size: 2em;
  }
}
</style>
