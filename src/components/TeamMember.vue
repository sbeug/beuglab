<script setup>
defineProps(['member'])
</script>
<template>
  <div id="team-member" v-if="member">
    <div class="member-img-container">
      <img :src="member.photo" :alt="member.name" class="member-img" />
      <h1>{{ member.name }}</h1>
      <h2>{{ member.title }}</h2>
      <p>{{ member.bio }}</p>
    </div>
  </div>
</template>
<style scoped>
#team-member {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  color: #f8f8f8;
}
</style>
