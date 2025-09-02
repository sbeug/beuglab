<script setup>
import { onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute } from 'vue-router'
import { gsap } from 'gsap'

const route = useRoute()

// Store timelines and handlers for proper cleanup
let animationTimeline = null
let dropdownTimeline = null
let aboutSubmenuTimeline = null
let eventHandlers = []
let subMenuTimelines = new Map()
let isInitialized = false
let hasPlayedEntranceAnimation = false

// Utility function to safely add event listeners
function addEventHandler(element, event, handler, options = {}) {
  if (element && typeof handler === 'function') {
    element.addEventListener(event, handler, options)
    eventHandlers.push({ element, event, handler })
  }
}

// Cleanup function
function cleanupAnimations(allowDropdownReverse = false) {
  return new Promise((resolve) => {
    // If dropdown is open and we want to allow it to reverse, do that first
    if (allowDropdownReverse && dropdownTimeline && !dropdownTimeline.reversed()) {
      // Set up a one-time complete handler
      const handleComplete = () => {
        dropdownTimeline.eventCallback('onReverseComplete', null)
        performCleanup()
        resolve()
      }

      dropdownTimeline.eventCallback('onReverseComplete', handleComplete)
      dropdownTimeline.reverse()
    } else {
      performCleanup()
      resolve()
    }

    function performCleanup() {
      // Remove all event listeners
      eventHandlers.forEach(({ element, event, handler }) => {
        try {
          if (element && typeof element.removeEventListener === 'function') {
            element.removeEventListener(event, handler)
          }
        } catch (error) {
          console.warn('Error removing event listener:', error)
        }
      })
      eventHandlers = []

      // Kill all timelines
      if (animationTimeline) {
        animationTimeline.kill()
        animationTimeline = null
      }
      if (dropdownTimeline) {
        dropdownTimeline.kill()
        dropdownTimeline = null
      }
      if (aboutSubmenuTimeline) {
        aboutSubmenuTimeline.kill()
        aboutSubmenuTimeline = null
      }

      // Kill submenu timelines
      subMenuTimelines.forEach((timeline) => timeline.kill())
      subMenuTimelines.clear()

      // Kill any remaining tweens on navbar elements specifically
      gsap.killTweensOf([
        '#dropdown-menu',
        '#logo img',
        '#logo h3',
        '#menu-button',
        '.line',
        '.menu-underline',
      ])

      isInitialized = false
    }
  })
}

// Initialize all animations
async function initializeAnimations(isFirstLoad = false) {
  if (isInitialized) {
    await cleanupAnimations(true) // Allow dropdown to reverse before cleanup
  }

  try {
    // Initialize navbar animations
    initDropdownMenu()
    initMobileSubmenus()
    initDesktopSubmenu()
    initMenuUnderlines()

    // Always call initEntranceAnimation to ensure elements are visible
    // It will only play the animation on first load
    initEntranceAnimation()

    // Mark entrance animation as played on first load
    if (isFirstLoad) {
      hasPlayedEntranceAnimation = true
    }

    isInitialized = true
  } catch (error) {
    console.warn('Error initializing navbar animations:', error)
  }
}

// Initialize dropdown menu animation
function initDropdownMenu() {
  const dropdownMenu = document.querySelector('#dropdown-menu')
  const lineOne = document.querySelector('#line-one')
  const lineTwo = document.querySelector('#line-two')
  const menuItems = document.querySelectorAll('#menu-list ul li')
  const menuButton = document.querySelector('#menu-button')

  if (!dropdownMenu || !lineOne || !lineTwo || !menuButton) {
    console.warn('Dropdown menu elements not found, skipping initialization')
    return
  }

  // Set initial states
  gsap.set([lineOne, lineTwo], {
    transformOrigin: 'center center',
    force3D: true,
  })

  gsap.set(dropdownMenu, {
    visibility: 'hidden',
    xPercent: 100,
    opacity: 0,
    force3D: true,
  })

  if (menuItems.length > 0) {
    gsap.set(menuItems, {
      y: 50,
      opacity: 0,
      force3D: true,
    })
  }

  // Create dropdown timeline
  dropdownTimeline = gsap.timeline({
    paused: true,
    onStart: () => {
      document.body.style.overflow = 'hidden'
    },
    onReverseComplete: () => {
      document.body.style.overflow = ''
      const menu = document.querySelector('#dropdown-menu')
      if (menu) gsap.set(menu, { visibility: 'hidden' })
    },
  })

  dropdownTimeline
    .set(dropdownMenu, { visibility: 'visible' }, 0)
    .to(dropdownMenu, { opacity: 1, duration: 0.1, ease: 'power2.out' }, 0)
    .to([lineOne, lineTwo], { duration: 0.3, ease: 'power2.out' }, 0)
    .to(lineOne, { rotation: 45, y: 6, duration: 0.3, ease: 'power2.out' }, 0)
    .to(lineTwo, { rotation: -45, y: -6, duration: 0.3, ease: 'power2.out' }, 0)
    .to(dropdownMenu, { xPercent: 0, ease: 'power3.inOut', duration: 0.6 }, 0.1)

  if (menuItems.length > 0) {
    dropdownTimeline.to(
      menuItems,
      { y: 0, opacity: 1, stagger: 0.08, ease: 'power2.out', duration: 0.4 },
      0.5,
    )
  }

  dropdownTimeline.reverse()

  // Menu button click handler
  const handleMenuButtonClick = (event) => {
    event.preventDefault()
    event.stopPropagation()
    if (dropdownTimeline) {
      dropdownTimeline.reversed(!dropdownTimeline.reversed())
    }
  }

  // Document click handler for closing menu and handling navigation
  const handleDocumentClick = (event) => {
    const target = event.target

    // Check if click is on menu button or its children - let the button handler handle this
    if (target.closest('#menu-button')) {
      return // Let the button handler manage this
    }

    // Check if click is on menu links (DON'T close menu here - let route watcher handle it)
    if (
      (target.matches('.menu-link-2') || target.matches('.sub-link')) &&
      dropdownTimeline &&
      !dropdownTimeline.reversed()
    ) {
      // Don't reverse here - let the route watcher handle the graceful cleanup
      return
    }

    // Close menu if clicking outside when open
    if (dropdownTimeline && !dropdownTimeline.reversed() && !target.closest('#dropdown-menu')) {
      dropdownTimeline.reverse()
    }
  }

  addEventHandler(menuButton, 'click', handleMenuButtonClick)
  addEventHandler(document, 'click', handleDocumentClick)
}

// Initialize mobile submenus
function initMobileSubmenus() {
  const toggles = document.querySelectorAll('.sub-toggle')

  toggles.forEach((toggle) => {
    const subMenu = toggle.querySelector('.sub-list')
    const arrow = toggle.querySelector('.nav-arrow')

    if (!subMenu) return

    // Set initial state
    gsap.set(subMenu, {
      height: 0,
      opacity: 0,
      overflow: 'hidden',
      display: 'none',
      force3D: true,
    })

    if (arrow) {
      gsap.set(arrow, {
        rotation: 0,
        transformOrigin: 'center center',
        force3D: true,
      })
    }

    // Create timeline
    const subMenuTl = gsap.timeline({ paused: true })

    subMenuTl
      .set(subMenu, { display: 'flex' }, 0)
      .to(subMenu, { height: 'auto', duration: 0.4, ease: 'power2.out' }, 0)
      .to(subMenu, { opacity: 1, duration: 0.3, ease: 'power2.out' }, 0.1)

    if (arrow) {
      subMenuTl.to(arrow, { rotation: 90, duration: 0.4, ease: 'power2.out' }, 0)
    }

    subMenuTl.reverse()
    subMenuTimelines.set(toggle, subMenuTl)

    const clickHandler = (event) => {
      event.preventDefault()
      event.stopPropagation()
      subMenuTl.reversed() ? subMenuTl.play() : subMenuTl.reverse()
    }

    addEventHandler(toggle, 'click', clickHandler)
  })
}

// Initialize desktop submenu
function initDesktopSubmenu() {
  const aboutLinkElement = document.querySelector('#menu-link-about')
  const aboutSubmenu = document.querySelector('.sub-menu-about')

  if (!aboutLinkElement || !aboutSubmenu) {
    return
  }

  gsap.set(aboutSubmenu, {
    opacity: 0,
    visibility: 'hidden',
    y: -10,
    display: 'flex',
  })

  aboutSubmenuTimeline = gsap.timeline({ paused: true })

  aboutSubmenuTimeline
    .to(aboutSubmenu, {
      opacity: 1,
      visibility: 'visible',
      y: 0,
      duration: 0.3,
      ease: 'power2.out',
    })
    .to(
      aboutSubmenu.querySelectorAll('li'),
      {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        duration: 0.5,
        ease: 'power2.out',
      },
      '-=0.15',
    )

  let hoverTimeout = null

  const handleMouseEnter = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout)
      hoverTimeout = null
    }
    aboutSubmenuTimeline.play()
  }

  const handleMouseLeave = () => {
    if (hoverTimeout) clearTimeout(hoverTimeout)
    hoverTimeout = setTimeout(() => {
      aboutSubmenuTimeline.reverse()
    }, 150)
  }

  addEventHandler(aboutLinkElement, 'mouseenter', handleMouseEnter)
  addEventHandler(aboutLinkElement, 'mouseleave', handleMouseLeave)
  addEventHandler(aboutSubmenu, 'mouseenter', handleMouseEnter)
  addEventHandler(aboutSubmenu, 'mouseleave', handleMouseLeave)
}

// Initialize menu underlines
function initMenuUnderlines() {
  const underLineWrappers = document.querySelectorAll('#menu li')

  underLineWrappers.forEach((el) => {
    const underline = el.querySelector('.menu-underline')

    if (underline) {
      const mouseEnter = () => {
        gsap.to(underline, {
          width: '100%',
          duration: 0.5,
          ease: 'power4.out',
        })
      }

      const mouseLeave = () => {
        gsap.to(underline, {
          width: '100%',
          duration: 0.5,
          x: '110%',
          ease: 'power4.out',
          onComplete: () => {
            gsap.set(underline, {
              x: '0%',
              width: '0%',
            })
          },
        })
      }

      addEventHandler(el, 'mouseenter', mouseEnter)
      addEventHandler(el, 'mouseleave', mouseLeave)
    }
  })
}

// Initialize entrance animation
function initEntranceAnimation() {
  const logoImg = document.querySelector('#logo img')
  const logoH3 = document.querySelector('#logo h3')
  const menuButton = document.querySelector('#menu-button')

  // First ensure elements are visible by default
  if (logoImg) {
    gsap.set(logoImg, { opacity: 1 })
  }
  if (logoH3) {
    gsap.set(logoH3, { opacity: 1 })
  }
  if (menuButton) {
    gsap.set(menuButton, { opacity: 1 })
  }

  // Only play entrance animation if we haven't played it yet
  if (!hasPlayedEntranceAnimation) {
    animationTimeline = gsap.timeline()

    if (logoImg) {
      animationTimeline.from(
        logoImg,
        {
          opacity: 0,
          duration: 1,
          ease: 'power2.inOut',
        },
        0,
      )
    }

    if (logoH3) {
      animationTimeline.from(
        logoH3,
        {
          opacity: 0,
          duration: 1,
          delay: 0.25,
          ease: 'power2.inOut',
        },
        0,
      )
    }

    if (menuButton) {
      animationTimeline.from(
        menuButton,
        {
          opacity: 0,
          duration: 1,
          delay: 1,
          ease: 'power2.inOut',
        },
        0,
      )
    }
  }
}

onMounted(() => {
  // Small delay to ensure all elements are rendered
  setTimeout(async () => {
    await initializeAnimations(true) // Pass true for first load
  }, 100)
})

onBeforeUnmount(async () => {
  // Cleanup all animations and event listeners
  await cleanupAnimations(false)
})

// Watch for route changes and reinitialize if needed
watch(
  () => route.path,
  () => {
    // Reinitialize after a small delay to let the new route render
    setTimeout(async () => {
      if (isInitialized) {
        // Refresh navbar animations if needed (but not entrance animation)
        try {
          await initializeAnimations(false) // Pass false for route changes
        } catch (error) {
          console.warn('Error reinitializing navbar on route change:', error)
        }
      }
    }, 100)
  },
)
</script>

<template>
  <div>
    <div id="navbar-blur"></div>
    <div id="navbar">
      <div id="logo">
        <router-link to="/">
          <img src="../assets/BEUG LAB - Logo Concept 2.png" alt="Logo" id="logo-img" />
          <h3>Beug Lab</h3>
        </router-link>
      </div>
      <div id="menu">
        <li>
          <router-link to="/" class="menu-link">
            Home
            <div class="menu-underline"></div>
          </router-link>
        </li>
        <li>
          <router-link to="/about" class="menu-link" id="menu-link-about">
            About
            <div class="menu-underline"></div>
          </router-link>
          <ul class="sub-menu-about">
            <li>
              <router-link to="/about/team" class="">Team</router-link>
            </li>
            <li>
              <router-link to="/about/dr-beug" class="">Dr. Beug</router-link>
            </li>
            <li>
              <router-link to="/about/grants-and-partners" class="">Grants & Partners</router-link>
            </li>
          </ul>
        </li>
        <li>
          <router-link to="/publications" class="menu-link">
            Publications
            <div class="menu-underline"></div>
          </router-link>
        </li>
        <li>
          <router-link to="/gallery" class="menu-link">
            Gallery
            <div class="menu-underline"></div>
          </router-link>
        </li>
        <li>
          <a class="menu-link contact-open">
            Contact
            <div class="menu-underline"></div>
          </a>
        </li>
      </div>
      <div id="menu-button">
        <div class="line" id="line-one"></div>
        <div class="line" id="line-two"></div>
      </div>
      <div id="dropdown-menu">
        <div id="menu-list">
          <ul>
            <li class="menu-item">
              <router-link to="/" class="menu-link-2">Home</router-link>
            </li>
            <li id="about" class="sub-toggle menu-item">
              <div class="menu-link-wrapper">
                <router-link to="/about" class="menu-link-2">About</router-link>
                <img
                  class="nav-arrow"
                  id="nav-arrow-about"
                  src="../assets/content/icons/right-arrow-white.png"
                  alt="right-arrow"
                />
              </div>
              <ul id="sub-list-about" class="sub-list">
                <li>
                  <router-link to="/about/team" class="sub-link"
                    >Team
                    <img
                      class="circle-arrow"
                      src="../assets/content/icons/circle-arrow.png"
                      alt="circle-arrow"
                    />
                  </router-link>
                </li>
                <li>
                  <router-link to="/about/dr-beug" class="sub-link">
                    Dr. Beug
                    <img
                      class="circle-arrow"
                      src="../assets/content/icons/circle-arrow.png"
                      alt="circle-arrow"
                    />
                  </router-link>
                </li>
                <li>
                  <router-link to="/about/grants-and-partners" class="sub-link">
                    Grants & Partners
                    <img
                      class="circle-arrow"
                      src="../assets/content/icons/circle-arrow.png"
                      alt="circle-arrow"
                    />
                  </router-link>
                </li>
              </ul>
            </li>
            <li class="menu-item">
              <router-link to="/publications" class="menu-link-2" id="publications"
                >Publications</router-link
              >
            </li>
            <li id="gallery" class="sub-toggle menu-item">
              <div class="menu-link-wrapper">
                <router-link to="/gallery" class="menu-link-2">Gallery</router-link>
                <img
                  class="nav-arrow"
                  id="nav-arrow-gallery"
                  src="../assets/content/icons/right-arrow-white.png"
                  alt="right-arrow"
                />
              </div>
              <ul id="sub-list-gallery" class="sub-list">
                <li>
                  <router-link to="/gallery/immuno-defender" class="sub-link">
                    Immuno Defender
                    <img
                      class="circle-arrow"
                      src="../assets/content/icons/circle-arrow.png"
                      alt="circle-arrow"
                    />
                  </router-link>
                </li>
              </ul>
            </li>
            <li id="contact" class="sub-toggle menu-item">
              <a class="menu-link-2 contact-open">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#navbar-blur {
  z-index: 9;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 7vh;
  background-color: #e9e9e98a;
  backdrop-filter: blur(10px);
}
#navbar {
  z-index: 9;
  position: fixed;
  top: 0;
  left: 100;
  width: 100vw;
  max-width: 100vw;
  height: 7vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 1.5em;
  padding-right: 1em;
  border-bottom: solid 1px var(--nero);
  background: transparent;
}
#dropdown-menu {
  z-index: 9;
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  will-change: transform;
  background: transparent;
  opacity: 0%;
  visibility: hidden;
  background-color: #e9e9e9be;
  backdrop-filter: blur(15px);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}
#menu-button {
  z-index: 10;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  cursor: pointer;
  width: fit-content;
  height: 3em;
  -webkit-tap-highlight-color: transparent;
}
#menu-button :nth-child(2) {
  margin-bottom: 0 !important;
}
.line {
  width: 2em;
  height: 2px;
  background-color: var(--nero);
  margin-bottom: 0.5em;
  will-change: transform;
}
#menu {
  display: none;
  list-style: none;
  width: 100%;
}
#menu li {
  margin-right: 2em;
  height: 100%;
}
#menu a {
  cursor: pointer;
}
.menu-link {
  font-size: 1em;
  font-family: new-science, sans-serif;
  font-weight: 500;
  font-style: normal;
  letter-spacing: normal;
  color: var(--font-color-main);
  opacity: 100%;
  position: relative;
}
a {
  text-decoration: none;
}
#logo {
  z-index: 10;
  position: relative;
  width: 100%;
  height: fit-content;
  margin-right: 4em;
}
#logo-img {
  position: absolute;
  top: 50%;
  left: 0%;
  transform: translate(-50%, -50%);
  width: 1.5em;
  height: 1.5em;
}
#logo h3 {
  color: var(--font-color-main);
  font-size: 1em;
  margin-left: 1.5em;
  text-transform: capitalize;
}
.sub-menu-about {
  display: none;
}
#menu-list {
  position: relative;
  width: 100vw;
  height: 100vh;
}
#menu-list ul {
  list-style: none;
  padding-top: 5.5em;
  padding-right: 2em;
  padding-left: 2em;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
  will-change: height;
}
.menu-item {
  text-align: left;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 1em;
  -webkit-tap-highlight-color: transparent;
}
.menu-link-wrapper {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1em;
}
#menu-list ul li a {
  margin: 0;
}
.nav-arrow {
  width: 1.3em;
  height: 1.3em;
  transform: translateY(3px);
}
.menu-link-2 {
  font-size: 2.5em;
  font-family: new-science, sans-serif;
  font-weight: 500;
  font-style: normal;
  letter-spacing: normal;
  color: var(--font-color-main);
  margin: 0;
  opacity: 100%;
  line-height: 1em;
}
.sub-list {
  width: 100% !important;
  height: 0;
  max-height: fit-content;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0 !important;
  padding-right: 0.5em;
  margin: 0;
  display: none;
}
.sub-list li {
  width: 100%;
  margin-bottom: 0.5em !important;
  border-bottom: 1px dashed #2222225e;
}
.sub-link {
  font-size: 1.25em;
  font-family: new-science, sans-serif;
  font-weight: 500;
  font-style: normal;
  letter-spacing: normal;
  color: var(--font-color-main);
  opacity: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.circle-arrow {
  width: 1.1em;
  height: 1.1em;
  opacity: 50%;
  transform: rotate(180deg);
}
#about,
#gallery {
  margin: 0;
}
/* TABLET 1 [GLOBAL] */
@media (min-width: 768px) {
  #navbar {
    padding-left: 3em;
    padding-right: 3em;
  }
}
/* TABLET 2 [GLOBAL] */
@media (min-width: 1000px) {
  #navbar {
    z-index: 9;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding-left: 4em;
    padding-right: 4em;
  }
  #logo img {
    width: 2.25em;
    height: 2.25em;
  }
  #menu {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  #menu li {
    margin: 0;
    text-align: center;
  }
  .line {
    width: 2.5em;
    height: 3px;
  }
  .sub-menu-about {
    z-index: 1;
    position: fixed;
    top: 7%;
    left: 40%;
    transform: translate(-50%, -50%);
    min-width: fit-content;
    display: none;
    padding: 0;
  }
  .sub-menu-about li {
    margin: 0 !important;
    padding: 0.5em;
    padding-left: 1em;
    padding-right: 1em;
    white-space: nowrap;
    opacity: 0;
    list-style: none;
    border: 1px solid var(--nero);
    border-top: none;
    width: fit-content;
    background-color: #e9e9e98a;
    backdrop-filter: blur(10px);
  }
  .sub-menu-about li a {
    color: var(--font-color-main);
    font-family: akzidenz-grotesk-next-pro, sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 1em;
    text-decoration: none;
    transition: color 0.2s ease;
  }
  .sub-menu-about li a:hover {
    color: var(--font-color-hover);
  }
  #menu li {
    position: relative;
    overflow: hidden;
  }
  #menu-button {
    place-self: center end;
  }
}
/* DESKTOP 1 [GLOBAL] */
@media (min-width: 1280px) {
  #logo img {
    width: 2.5em;
    height: 2.5em;
  }
  #logo h3 {
    font-size: 1.25em;
    margin-left: 2em;
  }
  .menu-underline {
    position: absolute;
    bottom: 0%;
    width: 0%;
    height: 1.5px;
    background-color: var(--nero);
    will-change: width;
  }
  #navbar {
    padding-left: 4em;
    padding-right: 4em;
  }
  #menu {
    width: 100%;
  }
  .menu-link {
    font-size: 1rem;
    text-align: center;
  }
  #menu-list ul {
    padding-left: 4em;
    width: 50%;
  }
  .sub-list {
    width: 100%;
    padding: 0;
  }
  .menu-link-2 {
    font-size: 4em;
  }
  .nav-arrow {
    width: 2em;
    height: 2em;
    transform: translateY(3px);
  }
  .sub-link {
    font-size: 1.75em !important;
  }
}
/* DESKTOP 3 (Macbook pro 15 inch display) -----------------------------------------------------------------------------------*/
@media (min-width: 1440px) {
  .menu-link {
    font-size: 1.25rem;
  }
  .menu-link-2 {
    font-size: 6rem;
  }
}
/* DESKTOP 4 (Standard pc Monitor) */
@media (min-width: 1920px) {
  #navbar {
    padding-left: 4em;
    padding-right: 4em;
  }
  #logo {
    margin-right: 6em;
  }
  #logo h3 {
    font-size: 1.5rem;
  }
  #menu-button {
    top: 1em;
    right: 8em;
  }
  .menu-link-2 {
    font-size: 6rem;
    margin-right: 3em;
  }
  .sub-link {
    font-size: 1.5rem;
  }
}
/* DESKTOP 5 (4k + Larger) */
@media (min-width: 2160px) {
  #navbar {
    padding-left: 6em;
    padding-right: 6em;
  }
  #logo img {
    width: 3em;
    height: 3em;
  }
  #logo h3 {
    font-size: 1.5rem;
    margin-left: 2.5em;
  }
  .menu-link {
    font-size: 1.5rem;
  }
  .menu-link-2 {
    font-size: 8rem;
  }
  #menu-button {
    top: 1.5em;
    right: 10em;
  }
  .line {
    width: 3em;
    height: 4px;
  }
  .sub-link {
    font-size: 2.5rem !important;
  }
  .nav-arrow {
    width: 2.5em;
    height: 2.5em;
  }
  .circle-arrow {
    width: 1em;
    height: 1em;
  }
  #menu-list ul {
    padding-left: 6em;
    padding-top: 7em;
  }
}
</style>
