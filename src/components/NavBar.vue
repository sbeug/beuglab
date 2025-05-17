<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import {
  DropDownMenuAnimation,
  DesktopSubmenuAnimation,
  SublistAnimation,
  menuUnderline,
} from '@/assets/js/customAnimations'
onMounted(() => {
  DropDownMenuAnimation()
  DesktopSubmenuAnimation()
  SublistAnimation()
  menuUnderline()
})
onBeforeUnmount(() => {
  // Cleanup code here
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
              <router-link to="/about/research" class="">Research</router-link>
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
          <router-link to="/contact" class="menu-link">
            Contact
            <div class="menu-underline"></div>
          </router-link>
        </li>
      </div>
      <div id="menu-button">
        <div class="line" id="line-one"></div>
        <div class="line" id="line-two"></div>
      </div>
      <div id="dropdown-menu-filter"></div>
      <div id="dropdown-menu">
        <div id="menu-list">
          <ul>
            <li>
              <router-link to="/" class="menu-link-2">Home</router-link>
              <img
                class="nav-arrow"
                src="../assets/content/icons/right-arrow-white.png"
                alt="right-arrow"
              />
            </li>
            <li id="about">
              <router-link to="/about" class="menu-link-2">About</router-link>
              <img
                class="nav-arrow"
                src="../assets/content/icons/right-arrow-white.png"
                alt="right-arrow"
              />
            </li>
            <div id="sub-list-about" class="sub-list">
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
                <router-link to="/about/research" class="sub-link">
                  Research
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
            </div>
            <li>
              <router-link to="/publications" class="menu-link-2" id="publications"
                >Publications</router-link
              >
              <img
                class="nav-arrow"
                src="../assets/content/icons/right-arrow-white.png"
                alt="right-arrow"
              />
            </li>
            <li id="gallery">
              <router-link to="/gallery" class="menu-link-2">Gallery</router-link>
              <img
                class="nav-arrow"
                src="../assets/content/icons/right-arrow-white.png"
                alt="right-arrow"
              />
            </li>
            <div id="sub-list-gallery" class="sub-list">
              <li>
                <router-link to="/gallery/asteroids" class="sub-link">
                  Immuno Defender
                  <img
                    class="circle-arrow"
                    src="../assets/content/icons/circle-arrow.png"
                    alt="circle-arrow"
                  />
                </router-link>
              </li>
            </div>
            <li id="contact">
              <router-link to="/contact" class="menu-link-2">Contact</router-link>
              <img
                class="nav-arrow"
                src="../assets/content/icons/right-arrow-white.png"
                alt="right-arrow"
              />
            </li>
            <div id="sub-list-contact" class="sub-list">
              <li>
                <router-link to="/contact/careers" class="sub-link">
                  Careers
                  <img
                    class="circle-arrow"
                    src="../assets/content/icons/circle-arrow.png"
                    alt="circle-arrow"
                  />
                </router-link>
              </li>
            </div>
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
  background-color: rgba(83, 35, 35, 0.322);
  backdrop-filter: blur(10px);
}
#navbar {
  z-index: 9;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 7vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 1.5em;
  padding-right: 1em;
  border-bottom: solid 1px #f8f8f8;
  background: transparent;
}
#dropdown-menu {
  z-index: 9;
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  transform: translateX(100%);
  will-change: transform, opacity, visibility;
  background: transparent;
  animation: dropmenu-enter 2s ease-in-out forwards;
  opacity: 0%;
}
#dropdown-menu-filter {
  z-index: 8;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  transform: translateX(100%);
  background-color: rgba(83, 35, 35, 0.4);
  backdrop-filter: blur(15px);
  animation: dropmenu-enter 2s ease-in-out forwards;
  opacity: 0%;
}
@keyframes dropmenu-enter {
  0% {
    opacity: 0;
  }
  90% {
    opacity: 0;
  }
  100% {
    opacity: 100%;
  }
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
  height: 2.5em;
  transform: translateY(3px);
}
.line {
  width: 2em;
  height: 2px;
  background-color: #f8f8f8;
  margin-bottom: 0.5em;
  transition: all 0.3s ease-in-out;
}
#menu {
  display: none;
  list-style: none;
}
#menu li {
  margin-right: 3em;
  height: 100%;
}
.menu-link {
  font-family: new-science, sans-serif;
  font-weight: 500;
  font-style: normal;
  letter-spacing: normal;
  color: #f8f8f8;
  opacity: 100%;
  position: relative;
}
a {
  text-decoration: none;
}
#logo {
  z-index: 10;
  position: relative;
  width: fit-content;
  height: fit-content;
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
  color: #f8f8f8;
  font-size: 1em;
  margin-left: 1.5em;
  text-transform: uppercase;
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
}
#menu-list ul li {
  text-align: left;
  margin: 0;
  margin-bottom: 1.25em;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
}
#menu-list ul li a {
  margin: 0;
}
.nav-arrow {
  width: 1.3em;
  height: 1.3em;
  transform: translateY(-3px);
}
.menu-link-2 {
  font-size: 2em;
  font-family: new-science, sans-serif;
  font-weight: 500;
  font-style: normal;
  letter-spacing: normal;
  color: #f8f8f8;
  margin: 0;
  opacity: 100%;
  line-height: 1em;
}
.sub-list {
  width: 96%;
  font-display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding-right: 0.5em;
  padding-bottom: 1em;
}
.sub-list li {
  margin-bottom: 0.5em !important;
  border-bottom: 1px dashed #f8f8f86f;
}
.sub-link {
  font-size: 1em;
  font-family: new-science, sans-serif;
  font-weight: 500;
  font-style: normal;
  letter-spacing: normal;
  color: #f8f8f8;
  opacity: 100%;
  margin: 0;
  padding: 0;
  padding-bottom: 0.5em;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.circle-arrow {
  width: 1.1em;
  height: 1.1em;
  transform: rotate(135deg);
  opacity: 50%;
}
#about img,
#gallery img,
#contact img {
  transform: rotate(90deg);
}
/* TABLET 1 [GLOBAL] */
@media (min-width: 768px) {
  #navbar {
    padding-left: 3em;
    padding-right: 3em;
  }
}
/* TABLET 3 [GLOBAL] */
@media (min-width: 1180px) {
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
    left: 45%;
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
    border: 1px solid #f8f8f8;
    border-top: none;
    width: fit-content;
    background-color: rgba(83, 35, 35, 0.4);
    backdrop-filter: blur(10px);
  }
  .sub-menu-about li a {
    color: #f8f8f8;
    font-family: akzidenz-grotesk-next-pro, sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 1em;
    text-decoration: none;
    transition: color 0.2s ease;
  }
  .sub-menu-about li a:hover {
    color: #555;
  }
  #menu li {
    position: relative;
    overflow: hidden;
  }
}
/* DESKTOP 1 [GLOBAL] */
@media (min-width: 1280px) {
  #logo h3 {
    margin-left: 2em;
  }
  .menu-underline {
    position: absolute;
    bottom: 0%;
    width: 0%;
    height: 1.5px;
    background-color: #f8f8f8;
    will-change: width;
  }
  #navbar {
    padding-left: 4em;
    padding-right: 4em;
  }
}
/* DESKTOP 2 (Macbook pro 13 inch display) -----------------------------------------------------------------------------------*/
@media screen and (min-width: 1280px) and (-webkit-min-device-pixel-ratio: 2) and (min-resolution: 192dpi) {
  .menu-underline {
    height: 1px;
    bottom: -1px;
  }
  #navbar {
    padding-left: 6em;
    padding-right: 6em;
  }
}
/* DESKTOP 4 (Standard pc Monitor) */
@media only screen and (min-width: 1920px) {
  #navbar {
    padding-left: 4em;
    padding-right: 4em;
  }
  #logo h1 {
    font-size: 1.5em;
  }
  #menu-button {
    top: 1em;
    right: 8em;
  }
  .menu-link-2 {
    font-size: 8em;
    margin-right: 3em;
  }
  .sub-list {
    height: fit-content;
    overflow: hidden;
    position: fixed;
    width: fit-content !important;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    opacity: 0;
    will-change: opacity;
  }
  #sub-list-about {
    top: 275%;
    left: -250%;
  }
  #sub-list-gallery {
    top: 75%;
    left: -162%;
  }
  #sub-list-contact {
    top: 37%;
    left: -158.5%;
  }
  .sub-link {
    font-size: 3em;
    border-top: solid 2px #f8f8f8;
    text-wrap: nowrap;
  }
}
</style>
