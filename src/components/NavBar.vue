<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { DropDownMenuAnimation, SublistAnimation } from '@/assets/js/customAnimations'
onMounted(() => {
  DropDownMenuAnimation()
  SublistAnimation()
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
          <h1>B_Lab</h1>
        </router-link>
      </div>
      <div id="menu">
        <li>
          <router-link to="/" class="menu-link">Home</router-link>
        </li>
        <li>
          <router-link to="/about" class="menu-link">About</router-link>
        </li>
        <li>
          <router-link to="/publications" class="menu-link">Publications</router-link>
        </li>
        <li>
          <router-link to="/gallery" class="menu-link">Gallery</router-link>
        </li>
        <li>
          <router-link to="/contact" class="menu-link">Contact</router-link>
        </li>
      </div>
      <div id="menu-button">
        <div class="line" id="line-one"></div>
        <div class="line" id="line-two"></div>
      </div>
      <div></div>
      <div id="dropdown-menu-filter"></div>
      <div id="dropdown-menu">
        <div id="menu-list">
          <ul>
            <li>
              <router-link to="/" class="menu-link-2">Home</router-link>
            </li>
            <li>
              <router-link to="/about" class="menu-link-2" id="about">About</router-link>
              <div id="sub-list-about">
                <router-link to="/about/team" class="sub-link">Team</router-link>
                <router-link to="/about/dr-beug" class="sub-link">Dr. Beug</router-link>
                <router-link to="/about/research" class="sub-link">Research</router-link>
                <router-link to="/about/grants-and-partners" class="sub-link"
                  >Grants & Partners</router-link
                >
              </div>
            </li>
            <li>
              <router-link to="/publications" class="menu-link-2" id="publications"
                >Publications</router-link
              >
            </li>
            <li>
              <router-link to="/gallery" class="menu-link-2" id="gallery">Gallery</router-link>
              <div id="sub-list-gallery">
                <router-link to="/gallery/asteroids" class="sub-link">Asteroids</router-link>
              </div>
            </li>
            <li>
              <router-link to="/contact" class="menu-link-2" id="contact">Contact</router-link>
              <div id="sub-list-contact">
                <router-link to="/contact/careers" class="sub-link">Careers</router-link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#navbar-blur {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 7vh;
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
}
#navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 7vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 1em;
  padding-right: 1em;
  border-bottom: solid 1px #181818;
  background: transparent;
}
#dropdown-menu {
  z-index: 9;
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  transform: translateY(-100%);
  will-change: transform, opacity, visibility;
  background: transparent;
}
#dropdown-menu-filter {
  z-index: 8;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  transform: translateY(-100%);
  background-color: rgba(248, 248, 248, 1);
  backdrop-filter: blur(10px);
}
#menu-button {
  z-index: 10;
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 4em;
  height: 2.5em;
}
.line {
  width: 2.5em;
  height: 3px;
  background-color: #181818;
  margin-bottom: 0.5em;
  transition: all 0.3s ease-in-out;
}
#menu {
  display: none;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: row;
  list-style: none;
}
.menu-link {
  font-family: new-science-extended, sans-serif;
  font-weight: 500;
  font-style: normal;
  letter-spacing: normal;
  color: #181818;
  margin-right: 3em;
  opacity: 100%;
}
a {
  text-decoration: none;
}
#logo h1 {
  color: #181818;
  font-size: 1em;
  text-transform: uppercase;
}
#menu-list {
  position: relative;
  width: 100vw;
  height: 100vh;
}
#menu-list ul {
  list-style: none;
  padding: 0;
  padding-top: 6em;
  padding-right: 4em;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  height: 100%;
}
#menu-list ul li {
  text-align: right;
}
#menu-list ul li a {
  margin: 0;
}
.menu-link-2 {
  font-family: new-science-extended, sans-serif;
  font-weight: 700;
  font-style: normal;
  letter-spacing: normal;
  color: #181818;
  margin-right: 3em;
  opacity: 100%;
  text-transform: uppercase;
  line-height: 1em;
}
/* DESKTOP 4 (Standard pc Monitor) -------------------------------------------------------------------------------------------*/
@media only screen and (min-width: 1920px) {
  #navbar {
    padding-left: 8em;
    padding-right: 8em;
  }
  #menu {
    display: flex;
    margin-right: 4em;
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
  }
  #sub-list-about,
  #sub-list-gallery,
  #sub-list-contact {
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
    font-family: new-science-extended, sans-serif;
    font-weight: 700;
    font-style: normal;
    letter-spacing: normal;
    color: #181818;
    opacity: 100%;
    text-transform: uppercase;
    border-top: solid 2px #181818;
    text-wrap: nowrap;
  }
}
</style>
