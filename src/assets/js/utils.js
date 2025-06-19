import { ref, onMounted, onBeforeUnmount } from 'vue'
export function updateLocalTime() {
  const now = new Date()
  const timeString = now.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
  document.getElementById('local-time').textContent = timeString
}
export function useReloadOnBreakpointChange() {
  const screenSize = ref(getSizeCategory())

  function getSizeCategory() {
    const width = window.innerWidth
    if (width < 768) return 'mobile'
    if (width < 1024) return 'tablet'
    return 'desktop'
  }

  function handleResize() {
    const newSize = getSizeCategory()
    if (newSize !== screenSize.value) {
      location.reload()
    }
  }

  onMounted(() => {
    window.addEventListener('resize', handleResize)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize)
  })
}
