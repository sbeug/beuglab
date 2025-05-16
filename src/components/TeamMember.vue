<script setup>
defineProps(['member'])
</script>
<template>
  <div id="team-member" class="df-pad" v-if="member">
    <div class="member-wrapper">
      <div id="top-section">
        <div class="member-img-container">
          <img :src="member.headshot" :alt="member.name" class="member-img" />
        </div>
        <div id="edu-links">
          <h6>{{ member.edu }}</h6>
          <a :href="member.linkedin">Linkedin</a>
          <a :href="member.cheo">Cheo RI</a>
        </div>
      </div>
      <h1 class="member-name">{{ member.name }}</h1>
      <h3 class="member-title">{{ member.title }}</h3>
      <p class="member-bio">{{ member.bio }}</p>
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
  padding-right: 2em;
}
.member-img-container {
  position: relative;
  width: 10em;
  height: 10em;
  aspect-ratio: 1;
  border-radius: 100%;
  overflow: hidden;
}
.member-img {
  background-color: #f8f8f8;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
#top-section {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}
#edu-links {
  grid-column: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}
#edu-links h6 {
  line-height: 1.2em;
}
#edu-links a {
  font-size: 1.5em;
  line-height: 1.2em;
  color: #f8f8f8;
  text-decoration: none;
  font-family: akzidenz-grotesk-next-pro, sans-serif;
  font-weight: 400;
  font-style: normal;
  letter-spacing: normal;
}
/* DESKTOP 1 [GLOBAL] */
@media (min-width: 1280px) {
  #team-member {
    padding-right: 12em;
  }
  .member-img-container {
    width: 26em;
    height: 26em;
  }
  .member-name {
    font-size: 4em;
  }
  .member-title {
    font-size: 2em;
    margin-bottom: 1.5em;
  }
  .member-bio {
    font-size: 1.5em;
    line-height: 1.5em;
  }
  #edu-links a {
    font-size: 2em;
  }
  #edu-links h6 {
    font-size: 2em;
  }
}
</style>
