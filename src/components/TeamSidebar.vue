<script setup>
defineProps({
  members: Array,
  selected: Object,
  alumni: Array,
})
const emit = defineEmits(['select'])
</script>
<template>
  <ul id="team-sidebar">
    <li
      v-for="member in members"
      :key="member.id"
      @click="emit('select', member)"
      class="member-link clickable"
    >
      <h3 :class="{ active: selected && selected.id === member.id }">{{ member.name }}</h3>
      <div class="number" :class="{ activecircle: selected && selected.id === member.id }">
        <p :class="{ activenumber: selected && selected.id === member.id }">{{ member.id }}</p>
      </div>
    </li>
    <li
      @click="emit('select', { isAlumniSection: true, alumni: alumni })"
      class="member-link clickable"
    >
      <h3 :class="{ active: selected && selected.isAlumniSection }">Beug Lab Alumni</h3>
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
  list-style: none;
  line-height: 4.5em;
  padding: 0;
  padding-left: 2em;
}
.member-link {
  cursor: pointer;
  display: flex;
  align-items: flex-start;
  color: var(--font-color-main);
}
.member-link h3 {
  font-size: 2em;
  margin: 0;
  padding: 0;
  transition: 0.5s ease;
  color: #2222227e;
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
/* DESKTOP 1 [GLOBAL] */
@media (min-width: 1280px) {
  #team-sidebar {
    padding: 0em;
    justify-content: flex-start;
  }
  .member-link {
    font-size: 2em;
  }
  .member-link h3 {
    font-size: 1.5em;
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
</style>
