<script setup>
import { immunoDefender } from '@/assets/js/immunoDefender'
import { onMounted, onBeforeUnmount } from 'vue'

let keydownHandler
let gameCleanup

onMounted(() => {
  gameCleanup = immunoDefender()

  keydownHandler = function (e) {
    // Check if the pressed key is Space (key code 32 or key === ' ')
    if (e.code === 'Space' || e.keyCode === 32) {
      // Prevent default scroll behavior
      e.preventDefault()
    }
  }

  window.addEventListener('keydown', keydownHandler, false)
})

onBeforeUnmount(() => {
  if (keydownHandler) {
    window.removeEventListener('keydown', keydownHandler, false)
  }

  if (gameCleanup && typeof gameCleanup === 'function') {
    gameCleanup()
  }
})
</script>
<template>
  <div id="immuno-defender-container">
    <canvas id="gameCanvas" width="800" height="600"></canvas>
    <div id="ui">
      <div id="livesDisplay">Lives: 5</div>
      <div id="ammoDisplay">Antibodies: 30/30</div>
      <div id="scoreDisplay">Score: 0</div>
    </div>

    <div id="startScreen" class="df-pad">
      <h1>Immuno Defender</h1>
      <p>Control your immune cell to destroy cancer cells!</p>
      <ul>
        <li>DESKTOP ONLY!</li>
        <li>Use WASD or Arrow keys to move</li>
        <li>Press SPACE to shoot antibodies</li>
        <li>Collect power-ups to refill ammo and gain abilities</li>
        <li>Lives regenerate slowly over time (1 life per 30 seconds)</li>
      </ul>
      <button id="startButton">Start Game</button>
    </div>

    <div id="gameOverScreen" class="hide">
      <h1>Game Over</h1>
      <p id="finalScore">Your Score: 0</p>
      <button id="restartButton">Play Again</button>
    </div>
  </div>
</template>
<style scoped>
#immuno-defender-container {
  margin: 0;
  padding: 0;
  background-color: #f8f8f8;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  font-family: akzidenz-grotesk-next-pro, sans-serif;
  font-weight: 400;
  font-style: normal;
  letter-spacing: normal;
  color: white;
  overflow: hidden;
}

#gameCanvas {
  position: relative;
  border-radius: 10px 10px 0 0;
  box-shadow: 0 0 20px rgba(36, 95, 255, 0.3);
  background-color: #222222;
  max-width: 100%;
  max-height: 90vh;
}

#ui {
  width: 800px;
  max-width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 15px;
  background: transparent;
  border-radius: 0 0 10px 10px;
  backdrop-filter: blur(5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

#ui div {
  background-color: #2222226d;
  padding: 8px 15px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  font-family: akzidenz-grotesk-next-pro, sans-serif;
  font-weight: 400;
  font-style: normal;
  letter-spacing: normal;
}

#livesDisplay::before {
  content: '❤️';
  margin-right: 5px;
}

#ammoDisplay::before {
  content: '🔹';
  margin-right: 5px;
}

#scoreDisplay::before {
  content: '🏆';
  margin-right: 5px;
}

#gameOverScreen,
#startScreen {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(6, 7, 33, 0.8);
  z-index: 2;
  backdrop-filter: blur(5px);
}

button {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 10px;
  cursor: pointer;
  border-radius: 50px;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  box-shadow: 0 4px 14px rgba(0, 70, 255, 0.4);
  transition: all 0.2s ease;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 70, 255, 0.6);
}

h1 {
  color: #3b82f6;
  font-size: 2.5rem;
  margin-bottom: 5px;
  text-shadow: 0 0 15px rgba(59, 130, 246, 0.5);
  text-align: center;
  line-height: 1em;
}

#startScreen p,
#gameOverScreen p {
  font-size: 1.2rem;
  margin-bottom: 20px;
  text-align: center;
  max-width: 600px;
}

#startScreen ul {
  background-color: rgba(59, 130, 246, 0.1);
  padding: 20px 40px;
  border-radius: 8px;
  margin-top: 1em;
  margin-bottom: 20px;
}

#startScreen li {
  margin: 10px 0;
}

#finalScore {
  font-size: 2rem;
  margin: 20px;
  color: #3b82f6;
}

.hide {
  display: none !important;
}

@media (min-width: 1280px) {
  h1 {
    font-size: 4em;
    line-height: 1.5em;
  }
  #startScreen ul {
    margin-top: 2em;
  }
}
</style>
