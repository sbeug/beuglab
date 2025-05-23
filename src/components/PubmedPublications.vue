<script setup>
import { ref, onMounted } from 'vue'

const papers = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const response = await fetch('/api/scrape')
    const data = await response.json()
    papers.value = data
  } catch (err) {
    console.error('Error fetching papers:', err)
  } finally {
    loading.value = false
  }
})
</script>
<template>
  <div id="publications-container">
    <div v-if="loading" id="spinner-container">
      <div id="spinner"></div>
    </div>
    <ul v-if="papers.length" id="publications-list">
      <li v-for="(paper, index) in papers" :key="index" class="publication clickable">
        <h3 class="paper-title">
          <a :href="paper.url" target="_blank" rel="noopener">{{ paper.title }}</a>
        </h3>
        <p class="paper-authors"><strong>Authors:</strong> {{ paper.authors }}</p>
        <p class="paper-journal"><strong>Journal:</strong> {{ paper.journal }}</p>
      </li>
    </ul>
  </div>
</template>
<style scoped>
#publications-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  color: var(--font-color-main);
}
#publications-list {
  list-style-type: none;
  padding: 0;
}
.publication {
  margin-top: 1em;
  margin-bottom: 1em;
  padding-top: 1em;
  padding-bottom: 1em;
  padding-left: 1.5em;
  padding-right: 1.5em;
  background-color: #22222210;
  border-radius: 20px;
  transition: all 0.5s ease;
}
a {
  color: var(--font-color-main);
}
a:hover {
  color: #2222228e;
}
#spinner-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5em;
  width: 100%;
  padding-top: 2em;
}
#spinner {
  width: 50px;
  height: 50px;
  border: 6px solid rgba(0, 0, 0, 0.1);
  border-top-color: #f8f8f8;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
/* DESKTOP 1 [GLOBAL] */
@media (min-width: 1280px) {
  #publications-list {
    padding-left: 8em;
    padding-right: 8em;
  }
  .publication {
    margin-top: 3em;
    margin-bottom: 3em;
    padding-top: 1.5em;
    padding-bottom: 1.5em;
    padding-left: 2em;
    padding-right: 2em;
  }
  .publication:hover {
    transform: scale(1.03);
  }
  .paper-title {
    font-size: 1.5em;
  }
  .paper-authors,
  .paper-journal {
    font-size: 1.25em;
  }
}
</style>
