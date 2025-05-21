export function updateLocalTime() {
  const now = new Date()
  const timeString = now.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
  document.getElementById('local-time').textContent = timeString
}
