<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import MiniGame from '@/components/MiniGame.vue'

const route = useRoute()
const gameKey = ref(0)

watch(
  () => route.fullPath,
  () => {
    gameKey.value++
  },
  { immediate: true },
)

onMounted(() => {
  if (!sessionStorage.getItem('gameLoadedOnce')) {
    sessionStorage.setItem('gameLoadedOnce', 'true')
    location.reload()
  } else {
    sessionStorage.removeItem('gameLoadedOnce')
  }
})
</script>
<template>
  <div>
    <MiniGame :key="gameKey" />
  </div>
</template>
<style scoped></style>
