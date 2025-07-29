export function immunoDefender() {
  // Game Constants
  const GAME_WIDTH = 800
  const GAME_HEIGHT = 600
  const MAX_LIVES = 5
  const MAX_AMMO = 30
  const LIFE_REGEN_TIME = 30000 // 30 seconds to regenerate a life
  const AMMO_REGEN_TIME = 1000 // 1 second to regenerate an ammo
  const PLAYER_SIZE = 20
  const ANTIBODY_SPEED = 8
  const PLAYER_SPEED = 5
  const PLAYER_ROTATION_SPEED = 0.1
  const CANCER_COUNT_START = 4
  const POWERUP_SPAWN_CHANCE = 0.005 // Chance per frame
  const IMMUNITY_TIME = 1500 // Immunity time after getting hit (ms)

  // Cleanup tracking
  let gameRunning = true
  let animationFrameId = null

  // Event handlers for cleanup
  const keyDownHandler = (e) => (keys[e.key] = true)
  const keyUpHandler = (e) => (keys[e.key] = false)
  const loadHandler = init

  // Colors - Modern palette
  const COLORS = {
    player: {
      main: '#2563EB', // Blue
      secondary: '#1D4ED8', // Darker blue
      receptor: '#60A5FA', // Lighter blue
    },
    cancer: {
      base: '#BE123C', // Red
      nucleus: '#7F1D1D', // Dark red
    },
    antibody: '#FFFFFF', // White
    background: '#060721', // Dark blue
    particles: {
      bg: 'rgba(147, 197, 253, 0.15)', // Light blue with transparency
      hit: '#FECACA', // Light red
      explosion: '#FCA5A5', // Red
    },
    powerups: {
      ammo: '#38BDF8', // Cyan
      rapidFire: '#FACC15', // Yellow
      wideShot: '#D946EF', // Magenta
      shield: '#4ADE80', // Green
      extraLife: '#EC4899', // Pink
    },
  }
  // Game Variables
  let canvas, ctx
  let player
  let antibodies = []
  let cancerCells = []
  let powerUps = []
  let keys = {}
  let gameOver = false
  let score = 0
  let gameActive = false
  let lastLifeRegenTime = 0
  let lastAmmoRegenTime = 0
  let particles = []
  let backgroundParticles = []
  // UI Elements
  const livesDisplay = document.getElementById('livesDisplay')
  const ammoDisplay = document.getElementById('ammoDisplay')
  const scoreDisplay = document.getElementById('scoreDisplay')
  const gameOverScreen = document.getElementById('gameOverScreen')
  const startScreen = document.getElementById('startScreen')
  const finalScoreDisplay = document.getElementById('finalScore')
  const startButton = document.getElementById('startButton')
  const restartButton = document.getElementById('restartButton')
  // Initialize Game
  function init() {
    canvas = document.getElementById('gameCanvas')
    ctx = canvas.getContext('2d')

    // Create player (immune cell)
    resetPlayer()

    // Create initial cancer cells
    createInitialCancerCells()

    // Create background particles
    createBackgroundParticles()

    // Event listeners
    window.addEventListener('keydown', keyDownHandler)
    window.addEventListener('keyup', keyUpHandler)

    startButton.addEventListener('click', startGame)
    restartButton.addEventListener('click', restartGame)

    // Game loop setup (but don't start it yet)
    animationFrameId = window.requestAnimationFrame(gameLoop)
  }
  function resetPlayer() {
    player = {
      x: GAME_WIDTH / 2,
      y: GAME_HEIGHT / 2,
      radius: PLAYER_SIZE,
      angle: 0,
      lives: MAX_LIVES,
      ammo: MAX_AMMO,
      immune: false,
      immuneTime: 0,
      powerups: {
        rapidFire: false,
        rapidFireTimer: 0,
        wideShot: false,
        wideShotTimer: 0,
        shield: false,
        shieldTimer: 0,
      },
    }
  }
  function startGame() {
    gameActive = true
    gameOver = false
    score = 0
    lastLifeRegenTime = Date.now()
    lastAmmoRegenTime = Date.now()
    startScreen.classList.add('hide')
    updateUI()
  }
  function restartGame() {
    antibodies = []
    cancerCells = []
    powerUps = []
    particles = []
    resetPlayer()
    createInitialCancerCells()
    gameOverScreen.classList.add('hide')
    startGame()
  }
  function createInitialCancerCells() {
    cancerCells = []
    for (let i = 0; i < CANCER_COUNT_START; i++) {
      createCancerCell(40 + Math.random() * 30)
    }
  }
  function createCancerCell(size, x, y, vx, vy) {
    const buffer = 50 // Keep away from center

    // If position isn't specified, create random position (avoiding center)
    if (x === undefined || y === undefined) {
      let position = getRandomPosition(buffer)
      x = position.x
      y = position.y

      // Random velocity if not specified
      vx = vx || (Math.random() - 0.5) * 2
      vy = vy || (Math.random() - 0.5) * 2
      // The cell's speed depends on size (smaller = faster)
      const speedFactor = 40 / size
      vx *= speedFactor
      vy *= speedFactor
      cancerCells.push({
        x: x,
        y: y,
        radius: size,
        vx: vx,
        vy: vy,
        color: COLORS.cancer.base,
        rotation: 0,
        rotationSpeed: (Math.random() - 0.5) * 0.05,
        vertices: generateCancerCellVertices(size),
        health: Math.floor(size / 10),
      })
    }
  }
  function getRandomPosition(buffer) {
    // This function ensures enemies don't spawn too close to the player
    let x, y
    const centerX = GAME_WIDTH / 2
    const centerY = GAME_HEIGHT / 2
    const safeRadius = 150 // Safe distance from center

    do {
      x = buffer + Math.random() * (GAME_WIDTH - buffer * 2)
      y = buffer + Math.random() * (GAME_HEIGHT - buffer * 2)
    } while (Math.hypot(x - centerX, y - centerY) < safeRadius)

    return { x, y }
  }
  function generateCancerCellVertices(radius) {
    // Create irregular shapes for cancer cells
    const vertices = []
    const steps = 10 + Math.floor(radius / 10)

    for (let i = 0; i < steps; i++) {
      const angle = (i / steps) * Math.PI * 2
      const radiusVariation = radius * (0.8 + Math.random() * 0.4)
      const x = Math.cos(angle) * radiusVariation
      const y = Math.sin(angle) * radiusVariation
      vertices.push({ x, y })
    }

    return vertices
  }
  function createBackgroundParticles() {
    backgroundParticles = []
    const count = 100

    for (let i = 0; i < count; i++) {
      backgroundParticles.push({
        x: Math.random() * GAME_WIDTH,
        y: Math.random() * GAME_HEIGHT,
        radius: 0.5 + Math.random() * 2,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      })
    }
  }
  function createPowerUp(x, y) {
    const types = ['ammo', 'rapidFire', 'wideShot', 'shield', 'extraLife']
    const type = types[Math.floor(Math.random() * types.length)]

    let color, size
    switch (type) {
      case 'ammo':
        color = COLORS.powerups.ammo
        size = 10
        break
      case 'rapidFire':
        color = COLORS.powerups.rapidFire
        size = 12
        break
      case 'wideShot':
        color = COLORS.powerups.wideShot
        size = 12
        break
      case 'shield':
        color = COLORS.powerups.shield
        size = 15
        break
      case 'extraLife':
        color = COLORS.powerups.extraLife
        size = 15
        break
    }

    powerUps.push({
      x: x,
      y: y,
      type: type,
      radius: size,
      color: color,
      creationTime: Date.now(),
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
    })
  }
  function createParticles(x, y, count, color, size, speed) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const velocity = Math.random() * speed

      particles.push({
        x: x,
        y: y,
        radius: size * (0.5 + Math.random() * 0.5),
        color: color,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        life: 30 + Math.random() * 20,
        maxLife: 50,
      })
    }
  }
  function shootAntibody() {
    if (player.ammo <= 0) return

    // Basic shot
    antibodies.push({
      x: player.x + Math.cos(player.angle) * player.radius,
      y: player.y + Math.sin(player.angle) * player.radius,
      vx: Math.cos(player.angle) * ANTIBODY_SPEED,
      vy: Math.sin(player.angle) * ANTIBODY_SPEED,
      radius: 3,
      life: 60, // Frames before disappearing
    })

    // Wide shot powerup
    if (player.powerups.wideShot) {
      const spreadAngle = 0.3 // ~17 degrees

      // Left spread shot
      antibodies.push({
        x: player.x + Math.cos(player.angle - spreadAngle) * player.radius,
        y: player.y + Math.sin(player.angle - spreadAngle) * player.radius,
        vx: Math.cos(player.angle - spreadAngle) * ANTIBODY_SPEED,
        vy: Math.sin(player.angle - spreadAngle) * ANTIBODY_SPEED,
        radius: 3,
        life: 60,
      })

      // Right spread shot
      antibodies.push({
        x: player.x + Math.cos(player.angle + spreadAngle) * player.radius,
        y: player.y + Math.sin(player.angle + spreadAngle) * player.radius,
        vx: Math.cos(player.angle + spreadAngle) * ANTIBODY_SPEED,
        vy: Math.sin(player.angle + spreadAngle) * ANTIBODY_SPEED,
        radius: 3,
        life: 60,
      })
    }

    player.ammo--

    // Play sound effect (to be implemented)
    // playSound('shoot');
  }
  // Game Loop
  function gameLoop(timestamp) {
    if (!gameRunning) return

    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT)

    // Draw background
    drawBackground()

    if (gameActive && !gameOver) {
      update(timestamp)
    }

    // Always draw game elements for smoother transitions
    draw()

    animationFrameId = window.requestAnimationFrame(gameLoop)
  }
  function update(timestamp) {
    // Handle input
    handleInput()

    // Update player
    updatePlayer(timestamp)

    // Update entities
    updateAntibodies()
    updateCancerCells()
    updatePowerUps()
    updateParticles()

    // Check collisions
    checkCollisions()

    // Spawn powerups randomly
    if (Math.random() < POWERUP_SPAWN_CHANCE) {
      const position = getRandomPosition(20)
      createPowerUp(position.x, position.y)
    }

    // Regenerate lives and ammo over time
    regenerateLifeAndAmmo(timestamp)

    // Update UI
    updateUI()

    // Check if game over
    if (player.lives <= 0) {
      endGame()
    }
  }
  function handleInput() {
    // Rotation (left/right arrow keys or A/D)
    if (keys['ArrowLeft'] || keys['a'] || keys['A']) {
      player.angle -= PLAYER_ROTATION_SPEED
    }
    if (keys['ArrowRight'] || keys['d'] || keys['D']) {
      player.angle += PLAYER_ROTATION_SPEED
    }

    // Movement (up/down arrow keys or W/S)
    if (keys['ArrowUp'] || keys['w'] || keys['W']) {
      player.x += Math.cos(player.angle) * PLAYER_SPEED
      player.y += Math.sin(player.angle) * PLAYER_SPEED
    }
    if (keys['ArrowDown'] || keys['s'] || keys['S']) {
      player.x -= Math.cos(player.angle) * PLAYER_SPEED * 0.6
      player.y -= Math.sin(player.angle) * PLAYER_SPEED * 0.6
    }

    // Shooting (spacebar)
    if (keys[' '] && player.ammo > 0) {
      const now = Date.now()
      const fireDelay = player.powerups.rapidFire ? 100 : 250 // Rapid fire shoots faster

      if (!player.lastShotTime || now - player.lastShotTime > fireDelay) {
        shootAntibody()
        player.lastShotTime = now
      }
    }

    // Keep player within bounds
    player.x = Math.max(player.radius, Math.min(GAME_WIDTH - player.radius, player.x))
    player.y = Math.max(player.radius, Math.min(GAME_HEIGHT - player.radius, player.y))
  }
  function updatePlayer(_timestamp) {
    // Update immunity status
    if (player.immune) {
      if (Date.now() - player.immuneTime > IMMUNITY_TIME) {
        player.immune = false
      }
    }

    // Update powerups
    const now = Date.now()

    if (player.powerups.rapidFire && now > player.powerups.rapidFireTimer) {
      player.powerups.rapidFire = false
    }

    if (player.powerups.wideShot && now > player.powerups.wideShotTimer) {
      player.powerups.wideShot = false
    }

    if (player.powerups.shield && now > player.powerups.shieldTimer) {
      player.powerups.shield = false
    }
  }
  function updateAntibodies() {
    for (let i = antibodies.length - 1; i >= 0; i--) {
      const antibody = antibodies[i]

      // Move antibody
      antibody.x += antibody.vx
      antibody.y += antibody.vy

      // Decrease lifetime
      antibody.life--

      // Remove if off-screen or expired
      if (
        antibody.life <= 0 ||
        antibody.x < 0 ||
        antibody.x > GAME_WIDTH ||
        antibody.y < 0 ||
        antibody.y > GAME_HEIGHT
      ) {
        antibodies.splice(i, 1)
      }
    }
  }
  function updateCancerCells() {
    // Add more cancer cells if there are too few
    if (cancerCells.length < CANCER_COUNT_START + Math.floor(score / 1000)) {
      createCancerCell(40 + Math.random() * 30)
    }

    for (let i = 0; i < cancerCells.length; i++) {
      const cell = cancerCells[i]

      // Move cancer cell
      cell.x += cell.vx
      cell.y += cell.vy
      cell.rotation += cell.rotationSpeed

      // Wrap around screen
      if (cell.x < -cell.radius) cell.x = GAME_WIDTH + cell.radius
      if (cell.x > GAME_WIDTH + cell.radius) cell.x = -cell.radius
      if (cell.y < -cell.radius) cell.y = GAME_HEIGHT + cell.radius
      if (cell.y > GAME_HEIGHT + cell.radius) cell.y = -cell.radius
    }
  }
  function updatePowerUps() {
    const now = Date.now()

    for (let i = powerUps.length - 1; i >= 0; i--) {
      const powerUp = powerUps[i]

      // Move powerup
      powerUp.x += powerUp.vx
      powerUp.y += powerUp.vy

      // Bounce off edges
      if (powerUp.x - powerUp.radius < 0 || powerUp.x + powerUp.radius > GAME_WIDTH) {
        powerUp.vx *= -1
      }
      if (powerUp.y - powerUp.radius < 0 || powerUp.y + powerUp.radius > GAME_HEIGHT) {
        powerUp.vy *= -1
      }

      // Remove if too old (15 seconds)
      if (now - powerUp.creationTime > 15000) {
        powerUps.splice(i, 1)
      }
    }
  }
  function updateParticles() {
    // Update background particles
    for (const particle of backgroundParticles) {
      particle.x += particle.vx
      particle.y += particle.vy

      // Wrap around screen
      if (particle.x < 0) particle.x = GAME_WIDTH
      if (particle.x > GAME_WIDTH) particle.x = 0
      if (particle.y < 0) particle.y = GAME_HEIGHT
      if (particle.y > GAME_HEIGHT) particle.y = 0
    }

    // Update effect particles
    for (let i = particles.length - 1; i >= 0; i--) {
      const particle = particles[i]

      particle.x += particle.vx
      particle.y += particle.vy
      particle.life--

      // Apply slight drag
      particle.vx *= 0.99
      particle.vy *= 0.99

      // Remove if expired
      if (particle.life <= 0) {
        particles.splice(i, 1)
      }
    }
  }
  function checkCollisions() {
    // Check antibody vs cancer cell collisions
    for (let i = antibodies.length - 1; i >= 0; i--) {
      const antibody = antibodies[i]

      for (let j = cancerCells.length - 1; j >= 0; j--) {
        const cancer = cancerCells[j]
        const distance = Math.hypot(antibody.x - cancer.x, antibody.y - cancer.y)

        if (distance < antibody.radius + cancer.radius) {
          // Cancer cell is hit
          cancer.health--

          // Create particles for hit effect
          createParticles(antibody.x, antibody.y, 5, '#FFFFFF', 2, 3)

          // Remove antibody
          antibodies.splice(i, 1)

          if (cancer.health <= 0) {
            // Cancer cell is destroyed

            // Create explosion particles
            createParticles(cancer.x, cancer.y, 20, cancer.color, 3, 4)

            // Add score
            score += Math.floor(cancer.radius)

            // Potentially spawn power-up
            if (Math.random() < 0.2) {
              createPowerUp(cancer.x, cancer.y)
            }

            // Split into smaller cells if large enough
            if (cancer.radius > 20) {
              for (let k = 0; k < 2; k++) {
                const newSize = cancer.radius * 0.6
                const angle = Math.random() * Math.PI * 2
                const speed = 1 + Math.random()

                createCancerCell(
                  newSize,
                  cancer.x,
                  cancer.y,
                  Math.cos(angle) * speed,
                  Math.sin(angle) * speed,
                )
              }
            }

            // Remove the cancer cell
            cancerCells.splice(j, 1)

            // Play sound effect (to be implemented)
            // playSound('explosion');
          }

          break // Antibody hit something, stop checking
        }
      }
    }

    // Check player vs cancer cell collisions
    if (!player.immune && !player.powerups.shield) {
      for (let i = 0; i < cancerCells.length; i++) {
        const cancer = cancerCells[i]
        const distance = Math.hypot(player.x - cancer.x, player.y - cancer.y)

        if (distance < player.radius + cancer.radius * 0.8) {
          // Player is hit
          player.lives--
          player.immune = true
          player.immuneTime = Date.now()

          // Create particles for hit effect
          createParticles(player.x, player.y, 30, '#FF5555', 4, 5)

          // Play sound effect (to be implemented)
          // playSound('hit');

          break
        }
      }
    }

    // Check player vs power-up collisions
    for (let i = powerUps.length - 1; i >= 0; i--) {
      const powerUp = powerUps[i]
      const distance = Math.hypot(player.x - powerUp.x, player.y - powerUp.y)

      if (distance < player.radius + powerUp.radius) {
        // Player collected power-up
        applyPowerUp(powerUp)

        // Create particles for collection effect
        createParticles(powerUp.x, powerUp.y, 15, powerUp.color, 3, 4)

        // Remove power-up
        powerUps.splice(i, 1)

        // Play sound effect (to be implemented)
        // playSound('powerUp');
      }
    }
  }
  function applyPowerUp(powerUp) {
    const now = Date.now()

    switch (powerUp.type) {
      case 'ammo':
        player.ammo = Math.min(player.ammo + 15, MAX_AMMO)
        break
      case 'rapidFire':
        player.powerups.rapidFire = true
        player.powerups.rapidFireTimer = now + 8000 // 8 seconds
        break
      case 'wideShot':
        player.powerups.wideShot = true
        player.powerups.wideShotTimer = now + 10000 // 10 seconds
        break
      case 'shield':
        player.powerups.shield = true
        player.powerups.shieldTimer = now + 6000 // 6 seconds
        break
      case 'extraLife':
        player.lives = Math.min(player.lives + 1, MAX_LIVES)
        break
    }
  }
  function regenerateLifeAndAmmo(_timestamp) {
    const now = Date.now()

    // Regenerate lives
    if (player.lives < MAX_LIVES && now - lastLifeRegenTime > LIFE_REGEN_TIME) {
      player.lives++
      lastLifeRegenTime = now
    }

    // Regenerate ammo
    if (player.ammo < MAX_AMMO && now - lastAmmoRegenTime > AMMO_REGEN_TIME) {
      player.ammo++
      lastAmmoRegenTime = now
    }
  }
  function endGame() {
    gameOver = true
    gameActive = false
    finalScoreDisplay.textContent = `Your Score: ${score}`
    gameOverScreen.classList.remove('hide')
  }
  function updateUI() {
    livesDisplay.textContent = `Lives: ${player.lives}`
    ammoDisplay.textContent = `Antibodies: ${player.ammo}/${MAX_AMMO}`
    scoreDisplay.textContent = `Score: ${score}`

    // Show active power-ups in UI
    let powerupText = ''
    if (player.powerups.rapidFire) powerupText += '🔥 '
    if (player.powerups.wideShot) powerupText += '⩖ '
    if (player.powerups.shield) powerupText += '🛡️ '

    if (powerupText) {
      ammoDisplay.textContent += ` | ${powerupText}`
    }
  }
  function drawBackground() {
    // Draw background with gradient
    const gradient = ctx.createRadialGradient(
      GAME_WIDTH / 2,
      GAME_HEIGHT / 2,
      0,
      GAME_WIDTH / 2,
      GAME_HEIGHT / 2,
      Math.max(GAME_WIDTH, GAME_HEIGHT),
    )
    gradient.addColorStop(0, '#0F172A')
    gradient.addColorStop(1, '#060721')

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT)

    // Draw decorative grid lines
    ctx.strokeStyle = 'rgba(147, 197, 253, 0.05)'
    ctx.lineWidth = 1

    // Horizontal grid lines
    for (let y = 0; y < GAME_HEIGHT; y += 40) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(GAME_WIDTH, y)
      ctx.stroke()
    }

    // Vertical grid lines
    for (let x = 0; x < GAME_WIDTH; x += 40) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, GAME_HEIGHT)
      ctx.stroke()
    }

    // Draw background particles (like blood cells, plasma, etc.)
    for (const particle of backgroundParticles) {
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
      ctx.fillStyle = COLORS.particles.bg
      ctx.fill()
    }
  }
  function draw() {
    // Draw particles
    for (const particle of particles) {
      ctx.beginPath()
      ctx.arc(
        particle.x,
        particle.y,
        particle.radius * (particle.life / particle.maxLife),
        0,
        Math.PI * 2,
      )
      ctx.fillStyle = particle.color
      ctx.globalAlpha = particle.life / particle.maxLife
      ctx.fill()
      ctx.globalAlpha = 1
    }

    // Draw antibodies
    for (const antibody of antibodies) {
      // Draw antibody (Y-shaped)
      ctx.save()
      ctx.translate(antibody.x, antibody.y)
      ctx.rotate(Math.atan2(antibody.vy, antibody.vx))

      // Draw Y shape
      ctx.beginPath()
      ctx.moveTo(0, -3)
      ctx.lineTo(4, -6)
      ctx.moveTo(0, -3)
      ctx.lineTo(-4, -6)
      ctx.moveTo(0, -3)
      ctx.lineTo(0, 6)

      ctx.strokeStyle = COLORS.antibody
      ctx.lineWidth = 2
      ctx.stroke()

      ctx.restore()
    }

    // Draw cancer cells
    for (const cell of cancerCells) {
      ctx.save()
      ctx.translate(cell.x, cell.y)
      ctx.rotate(cell.rotation)

      // Draw irregular shape
      ctx.beginPath()
      ctx.moveTo(cell.vertices[0].x, cell.vertices[0].y)

      for (let i = 1; i < cell.vertices.length; i++) {
        ctx.lineTo(cell.vertices[i].x, cell.vertices[i].y)
      }

      ctx.closePath()
      ctx.fillStyle = cell.color
      ctx.fill()

      // Draw nucleus
      ctx.beginPath()
      ctx.arc(0, 0, cell.radius * 0.4, 0, Math.PI * 2)
      ctx.fillStyle = COLORS.cancer.nucleus
      ctx.fill()

      ctx.restore()
    }

    // Draw power-ups
    for (const powerUp of powerUps) {
      ctx.save()
      ctx.translate(powerUp.x, powerUp.y)

      // Draw outer circle with pulsating effect
      const age = Date.now() - powerUp.creationTime
      const pulse = 1 + Math.sin(age * 0.01) * 0.2

      ctx.beginPath()
      ctx.arc(0, 0, powerUp.radius * pulse, 0, Math.PI * 2)
      ctx.fillStyle = powerUp.color
      ctx.fill()

      // Draw icon based on type
      ctx.fillStyle = 'white'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.font = '10px Arial'

      let icon = ''
      switch (powerUp.type) {
        case 'ammo':
          icon = '+'
          break
        case 'rapidFire':
          icon = '⚡'
          break
        case 'wideShot':
          icon = '⩖'
          break
        case 'shield':
          icon = '◯'
          break
        case 'extraLife':
          icon = '❤'
          break
      }

      ctx.fillText(icon, 0, 0)
      ctx.restore()
    }

    // Draw player (immune cell)
    ctx.save()
    ctx.translate(player.x, player.y)
    ctx.rotate(player.angle)

    // Create glow effect
    if (player.powerups.shield || player.immune) {
      const glowRadius = player.radius * 1.5
      const glow = ctx.createRadialGradient(0, 0, player.radius * 0.8, 0, 0, glowRadius)

      if (player.powerups.shield) {
        glow.addColorStop(0, 'rgba(74, 222, 128, 0.1)')
        glow.addColorStop(1, 'rgba(74, 222, 128, 0)')
      } else if (player.immune) {
        glow.addColorStop(0, 'rgba(255, 255, 255, 0.2)')
        glow.addColorStop(1, 'rgba(255, 255, 255, 0)')
      }

      ctx.beginPath()
      ctx.arc(0, 0, glowRadius, 0, Math.PI * 2)
      ctx.fillStyle = glow
      ctx.fill()
    }

    // Draw cell body with gradient
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, player.radius)
    gradient.addColorStop(0, COLORS.player.main)
    gradient.addColorStop(1, COLORS.player.secondary)

    ctx.beginPath()
    ctx.arc(0, 0, player.radius, 0, Math.PI * 2)

    // Flashing effect when immune
    if (player.immune) {
      const flashSpeed = Date.now() % 200 < 100
      ctx.fillStyle = flashSpeed ? '#FFFFFF' : gradient
    } else {
      ctx.fillStyle = gradient
    }

    ctx.fill()

    // Add subtle inner shadow for 3D effect
    ctx.beginPath()
    ctx.arc(0, 0, player.radius, 0, Math.PI * 2)
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)'
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw shield if active
    if (player.powerups.shield) {
      ctx.beginPath()
      ctx.arc(0, 0, player.radius * 1.4, 0, Math.PI * 2)

      // Animated shield effect
      const shieldAnimSpeed = (Date.now() % 2000) / 2000
      const shieldWidth = 3 + Math.sin(shieldAnimSpeed * Math.PI * 2) * 1.5

      const shieldGradient = ctx.createLinearGradient(
        -player.radius * 1.4,
        0,
        player.radius * 1.4,
        0,
      )
      shieldGradient.addColorStop(0, 'rgba(74, 222, 128, 0.2)')
      shieldGradient.addColorStop(0.5, 'rgba(74, 222, 128, 0.8)')
      shieldGradient.addColorStop(1, 'rgba(74, 222, 128, 0.2)')

      ctx.strokeStyle = shieldGradient
      ctx.lineWidth = shieldWidth
      ctx.stroke()
    }

    // Draw direction indicator (cell nucleus)
    ctx.beginPath()
    ctx.arc(player.radius * 0.4, 0, player.radius * 0.25, 0, Math.PI * 2)
    ctx.fillStyle = COLORS.player.secondary
    ctx.fill()

    // Draw receptors/spikes with gradient
    const receptorCount = 12
    for (let i = 0; i < receptorCount; i++) {
      const angle = (i / receptorCount) * Math.PI * 2
      const x1 = Math.cos(angle) * player.radius
      const y1 = Math.sin(angle) * player.radius
      const x2 = Math.cos(angle) * (player.radius * 1.3)
      const y2 = Math.sin(angle) * (player.radius * 1.3)

      const receptorGradient = ctx.createLinearGradient(x1, y1, x2, y2)
      receptorGradient.addColorStop(0, COLORS.player.secondary)
      receptorGradient.addColorStop(1, COLORS.player.receptor)

      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.strokeStyle = receptorGradient
      ctx.lineWidth = 2.5
      ctx.lineCap = 'round'
      ctx.stroke()

      // Add receptor bulb at the end
      ctx.beginPath()
      ctx.arc(x2, y2, 3, 0, Math.PI * 2)
      ctx.fillStyle = COLORS.player.receptor
      ctx.fill()
    }

    ctx.restore()

    // Draw active powerup indicators
    if (player.powerups.rapidFire || player.powerups.wideShot) {
      ctx.save()
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'
      ctx.textAlign = 'center'
      ctx.font = '14px Arial'

      let text = ''
      if (player.powerups.rapidFire) text += 'Rapid Fire! '
      if (player.powerups.wideShot) text += 'Wide Shot! '

      ctx.fillText(text, GAME_WIDTH / 2, 30)
      ctx.restore()
    }
  }

  // Cleanup function
  function cleanup() {
    gameRunning = false

    if (animationFrameId) {
      window.cancelAnimationFrame(animationFrameId)
      animationFrameId = null
    }

    // Remove event listeners
    window.removeEventListener('keydown', keyDownHandler)
    window.removeEventListener('keyup', keyUpHandler)
    window.removeEventListener('load', loadHandler)

    if (startButton) {
      startButton.removeEventListener('click', startGame)
    }
    if (restartButton) {
      restartButton.removeEventListener('click', restartGame)
    }

    // Clear game state
    antibodies = []
    cancerCells = []
    powerUps = []
    particles = []
    backgroundParticles = []
    keys = {}
  }

  // Start the game
  window.addEventListener('load', loadHandler)

  // Return cleanup function
  return cleanup
}
