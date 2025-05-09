<script setup></script>

<template>
  <div>
    <div id="navbar">
      <div id="logo">
        <router-link to="/">
          <h2>B_Lab</h2>
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
        <div class="line"></div>
        <div class="line"></div>
      </div>
      <div id="dropdown-menu">
        <div id="menu-list">
          <ul>
            <li>
              <router-link to="/">Home</router-link>
            </li>
            <li>
              <router-link to="/about">About</router-link>
              <ul class="sub-list">
                <li>
                  <router-link to="/about/team">Team</router-link>
                </li>
                <li>
                  <router-link to="/about/dr-beug">Dr. Beug</router-link>
                </li>
                <li>
                  <router-link to="/about/research">Research</router-link>
                </li>
                <li>
                  <router-link to="/about/grants-and-partners">Grants & Partners</router-link>
                </li>
              </ul>
            </li>
            <li>
              <router-link to="/publications">Publications</router-link>
            </li>
            <li>
              <router-link to="/gallery">Gallery</router-link>
              <ul class="sub-list">
                <li>
                  <router-link to="/gallery/asteroids">Asteroids</router-link>
                </li>
              </ul>
            </li>
            <li>
              <router-link to="/contact">Contact</router-link>
              <ul class="sub-list">
                <li>
                  <router-link to="/contact/careers">Careers</router-link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 1em;
  padding-right: 1em;
}
#dropdown-menu {
  position: absolute;
  transform: translateY(-100vh);
  will-change: transform, opacity, visibility;
}
#menu-button {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 5em;
  height: 5em;
}
.line {
  width: 3em;
  height: 3px;
  background-color: #f8f8f8;
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
  margin-right: 4em;
}
#logo h2 {
  color: #f8f8f8;
  font-size: 2em;
}
/* DESKTOP 4 (Standard pc Monitor) -------------------------------------------------------------------------------------------*/
@media only screen and (min-width: 1920px) {
  #menu {
    display: flex;
  }
}
</style>
