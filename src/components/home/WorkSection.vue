<script setup>
import { ref, onMounted } from 'vue'
import { sanity } from '@/assets/js/sanity.js'

const sectionTwoTitle = ref('')
const sectionTwoText = ref('')
const error = ref(false)

onMounted(async () => {
  try {
    const query = `*[_type == "homePage"][0] {
      sectionTwoTitle,
      sectionTwoText
    }`
    const data = await sanity.fetch(query)
    sectionTwoTitle.value = data.sectionTwoTitle
    sectionTwoText.value = data.sectionTwoText
  } catch (error) {
    error.value = true
  }
})
</script>

<template>
  <div id="ourwork-section" class="section df-pad">
    <div class="section-heading">
      <p>02</p>
      <h6>{{ sectionTwoTitle }}</h6>
      <h6 v-if="error">Our Work</h6>
    </div>
    <div id="ourwork-statement" class="section-statement">
      <h6>{{ sectionTwoText }}</h6>
      <h6 v-if="error">
        Investigating the inhibitor of apoptosis proteins (IAPs) and their control of cell death,
        inflammation, and anti-tumour immunity.
      </h6>
    </div>
  </div>
</template>

<style scoped>
.section {
  z-index: 1;
  position: relative;
  width: 100vw;
  height: 100%;
  padding-bottom: 18em;
  background: #e9e9e9;
}
.section-heading {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}
.section-heading h6 {
  font-size: 2rem;
  line-height: 1em;
  padding-left: 0.5em;
}
.section-heading p {
  font-family: new-science-extended, sans-serif;
  font-weight: 700;
  font-style: normal;
  letter-spacing: normal;
  font-size: 0.5em;
  border: 1px dashed var(--nero);
  border-radius: 100%;
  height: 5em;
  width: 5em;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(-15px);
}
.section p,
.section h6 {
  color: var(--font-color-main);
}
.section-statement {
  padding-top: 2em;
}
.section-statement h6 {
  font-size: 2rem;
  line-height: 1em;
}
#ourwork-statement h6 {
  line-height: 1.2em;
  font-size: 2em;
}

/* TABLET 1 [GLOBAL] */
@media (min-width: 768px) {
  .section-heading p {
    font-size: 0.75em;
  }
  .section-statement h6 {
    font-size: 3em;
    line-height: 1.2em;
  }
  #ourwork-statement h6 {
    font-size: 2.5em;
    line-height: 1.2em;
  }
}
/* TABLET 2 [GLOBAL] */
@media (min-width: 1000px) {
  .section-heading h6 {
    font-size: 2.5rem;
    line-height: 1.2em;
  }
  .section-statement h6 {
    font-size: 3.5rem;
    line-height: 1.2em;
  }
  #ourwork-statement h6 {
    font-size: 3rem;
    line-height: 1.2em;
  }
}
/* DESKTOP 1 [GLOBAL] */
@media (min-width: 1280px) {
  .section {
    padding-bottom: 24em;
  }
  .section-heading {
    align-items: center;
  }
  .section-heading p {
    font-size: 1rem;
    line-height: 1em;
    height: 5em;
    width: 5em;
    transform: translateY(0);
  }
  .section-heading h6 {
    font-size: 2rem;
    padding-left: 3em;
  }
  .section-statement {
    padding-top: 4em;
    padding-left: 8em;
  }
  .section-statement h6 {
    width: 75%;
  }
  #ourwork-statement h6 {
    font-size: 3.5rem;
  }
}
/* DESKTOP 2 [GLOBAL] */
@media (min-width: 1440px) {
  #ourwork-statement h6 {
    font-size: 4rem;
  }
}
/* DESKTOP 3 [GLOBAL] */
@media (min-width: 1728px) {
  #ourwork-statement h6 {
    font-size: 4.5rem;
  }
}
/* DESKTOP 4 [GLOBAL] */
@media (min-width: 1920px) {
}
/* DESKTOP 5 [GLOBAL] */
@media (min-width: 2160px) {
  #ourwork-statement h6 {
    font-size: 5rem;
  }
}
</style>
