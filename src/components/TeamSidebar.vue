<script setup>
defineProps(['members'])
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
      <h3>{{ member.name }}</h3>
      <div class="number">
        <p>{{ member.id }}</p>
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
  line-height: 5em;
  padding: 0;
}
.member-link {
  cursor: pointer;
  display: flex;
  align-items: flex-start;
  color: #f8f8f8;
}
.member-link h3 {
  font-size: 2em;
  margin: 0;
  padding: 0;
}
.number {
  border: 1px solid #f8f8f8;
  border-radius: 50%;
  width: 1.25em;
  height: 1.25em;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.25em;
}
.number p {
  font-size: 0.5em;
  margin: 0;
  padding: 0;
}
/* DESKTOP 1 [GLOBAL] */
@media (min-width: 1280px) {
  .member-link {
    font-size: 2em;
  }
}
</style>
