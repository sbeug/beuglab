<script setup>
defineProps(['member'])
</script>
<template>
  <div id="team-member" v-if="member">
    <div class="member-wrapper df-pad">
      <div class="reverse">
        <div id="top-section">
          <div class="member-img-container">
            <img :src="member.headshot" :alt="member.name" class="member-img" />
          </div>
          <div id="edu-links">
            <h6>{{ member.edu }}</h6>
            <a :href="member.linkedin">LinkedIn ↗</a>
            <a :href="member.cheo">CHEO RI ↗</a>
          </div>
        </div>
        <div>
          <h1 class="member-name">{{ member.name }}</h1>
          <h3 class="member-title">{{ member.title }}</h3>
        </div>
      </div>
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
  color: var(--font-color-main);
}
.member-img-container {
  position: relative;
  width: 100%;
  height: 40vh;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 25px;
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
  grid-template-columns: 1fr;
}
.member-name {
  text-transform: uppercase;
  font-size: 2.5em;
  line-height: 1.2em;
  padding-bottom: 0.5em;
}
.member-title {
  font-size: 1.25em;
  margin-bottom: 1.5em;
}
.member-bio {
  font-size: 1.25em;
  line-height: 1.5em;
  padding-top: 2em;
  padding-bottom: 2.5em;
}
#edu-links {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-left: 1em;
  padding-right: 1em;
}
#edu-links h6 {
  display: none;
  line-height: 1.2em;
}
#edu-links a {
  font-size: 1.5em;
  line-height: 1.2em;
  color: var(--font-color-main);
  text-decoration: none;
  font-family: akzidenz-grotesk-next-pro, sans-serif;
  font-weight: 400;
  font-style: normal;
  letter-spacing: normal;
  border: 2px solid var(--nero);
  border-radius: 50px;
  padding-top: 0.75em;
  padding-bottom: 0.75em;
  padding-right: 1em;
  padding-left: 1em;
}
.reverse {
  display: flex;
  flex-direction: column-reverse;
}
/* DESKTOP 1 [GLOBAL] */
@media (min-width: 1280px) {
  #team-member {
    padding-right: 12em;
  }
  .member-img-container {
    border-radius: 100%;
    width: 26em;
    height: 26em;
    border: 4px solid var(--nero);
  }
  #top-section {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  .member-name {
    font-size: 4em;
    padding: 0;
    padding-top: 0.5em;
  }
  .member-title {
    font-size: 2em;
    margin-bottom: 1.5em;
  }
  .member-bio {
    padding: 0;
    font-size: 1.5em;
    line-height: 1.5em;
  }
  #edu-links {
    position: relative;
    bottom: 0;
    grid-column: 2;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-end;
    padding: 0;
    gap: 0.5em;
  }
  #edu-links a,
  #edu-links h6 {
    font-size: 1em;
  }
  .reverse {
    display: unset;
  }
}
</style>
