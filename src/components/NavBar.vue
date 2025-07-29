<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import {
  DropDownMenuAnimation,
  subMenuDrop,
  DesktopSubmenuAnimation,
  menuUnderline,
} from '@/assets/js/customAnimations'
import { gsap } from 'gsap'

// Store cleanup functions
let cleanupFunctions = []

onMounted(() => {
  // Store cleanup functions returned by animation functions
  cleanupFunctions.push(DropDownMenuAnimation())
  cleanupFunctions.push(subMenuDrop())
  cleanupFunctions.push(DesktopSubmenuAnimation())
  cleanupFunctions.push(menuUnderline())

  gsap.set('#dropdown-menu', {
    visibility: 'hidden',
    xPercent: 100,
  })
  gsap.from('#logo img', {
    opacity: 0,
    duration: 1,
    ease: 'power2.inOut',
  })
  gsap.from('#logo h3', {
    opacity: 0,
    duration: 1,
    delay: 0.25,
    ease: 'power2.inOut',
  })
  gsap.from('#menu-button', {
    opacity: 0,
    duration: 1,
    delay: 1,
    ease: 'power2.inOut',
  })
})

onBeforeUnmount(() => {
  // Clean up all animations and event listeners
  cleanupFunctions.forEach((cleanup) => {
    if (typeof cleanup === 'function') {
      cleanup()
    }
  })
  gsap.killTweensOf('*')
})
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
  background-color: #e9e9e98a;
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
  width: 100%;
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
    padding-left: 4em;
    padding-right: 4em;
  }
  #logo img {
    width: 2.5em;
    height: 2.5em;
  }
  #menu {
    display: flex;
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
}
/* DESKTOP 1 [GLOBAL] */
@media (min-width: 1280px) {
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
  .menu-link {
    font-size: 1.25em;
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
/* DESKTOP 2 (Macbook pro 13 inch display) -----------------------------------------------------------------------------------*/
@media screen and (min-width: 1280px) and (-webkit-min-device-pixel-ratio: 2) and (min-resolution: 192dpi) {
  .menu-underline {
    height: 1px;
    bottom: -1px;
  }
  #navbar {
    padding-left: 4em;
    padding-right: 4em;
  }
}
/* DESKTOP 3 (Macbook pro 15 inch display) -----------------------------------------------------------------------------------*/
@media screen and (min-width: 1440px) and (-webkit-min-device-pixel-ratio: 2) {
  .menu-link-2 {
    font-size: 6em;
  }
}
/* DESKTOP 4 (Standard pc Monitor) */
@media only screen and (min-width: 1920px) {
  #navbar {
    padding-left: 4em;
    padding-right: 4em;
  }
  #logo {
    margin-right: 6em;
  }
  #logo h1 {
    font-size: 1.5em;
  }
  #menu-button {
    top: 1em;
    right: 8em;
  }
  .menu-link-2 {
    font-size: 6em;
    margin-right: 3em;
  }
  .sub-link {
    font-size: 1.5em;
  }
}
</style>
