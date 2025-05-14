<script setup>
defineProps({
  members: Array,
  selected: Object,
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
  </ul>
</template>
<style scoped>
#team-sidebar {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  list-style: none;
  line-height: 4.5em;
  padding: 0;
}
.member-link {
  cursor: pointer;
  display: flex;
  align-items: flex-start;
  color: #f8f8f8;
}
.member-link h3 {
  font-size: 1.5em;
  margin: 0;
  padding: 0;
  transition: 0.5s ease;
  color: #f8f8f87c;
  transition: 0.5s ease;
}
.member-link h3:hover {
  color: #f8f8f8;
  text-shadow: #f8f8f8 0px 0px 5px;
}
.active {
  color: #f8f8f8 !important;
}
.activecircle {
  border-color: #f8f8f8 !important;
}
.activenumber {
  color: #f8f8f8 !important;
}
.number {
  border: 1px solid #f8f8f87c;
  border-radius: 50%;
  width: 1.25em;
  height: 1.25em;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.25em;
  transition: 0.5s ease;
}
.number p {
  color: #f8f8f87c;
  font-size: 0.5em;
  margin: 0;
  padding: 0;
  transition: 0.5s ease;
}
/* DESKTOP 1 [GLOBAL] */
@media (min-width: 1280px) {
  .member-link {
    font-size: 2em;
  }
}
</style>
