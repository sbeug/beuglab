<template>
  <div id="footer">
    <img id="default-background" src="@/assets/content/images/defaultBackground.png" />
    <div id="footer-title">
      <h6>Understanding Disease to Advance Tomorrow's Therapies.</h6>
    </div>
    <div id="bottom-bar">
      <div id="contact">
        <h6>johnsmith@gmail.com</h6>
        <h6>45.4006474 - 75.6521784</h6>
        <div id="socials">
          <a href="https://www.linkedin.com/" target="_blank">Linkedin ↗</a>
          <a href="https://www.instagram.com/" target="_blank">Linkedin ↗</a>
        </div>
      </div>
      <div id="column-1">
        <router-link to="/about">About</router-link>
        <router-link to="/about/team">Team</router-link>
        <router-link to="/about/dr-beug">Dr. Beug</router-link>
      </div>
      <div id="column-2">
        <router-link to="/about">Publications</router-link>
        <router-link to="/about/research">Research</router-link>
        <router-link to="/about">Gallery</router-link>
      </div>
      <div id="column-3">
        <router-link to="/contact">Contact</router-link>
        <router-link to="/careers">Join us</router-link>
        <router-link to="/asteroids">Asteroids</router-link>
      </div>
      <div id="credits">
        <p>© 2025 Beug Lab | All rights reserved</p>
        <p>Website by 982studios®</p>
      </div>
    </div>
  </div>
</template>
<style scoped>
#footer {
  z-index: 1;
  position: relative;
  margin: 0;
  width: 100vw;
  height: 100vh;
  display: grid;
  padding-left: 4em;
  padding-right: 4em;
}
#default-background {
  z-index: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
#footer-title {
  z-index: 1;
  position: relative;
}
#footer-title h6 {
  font-size: 1em;
  color: #f8f8f8;
  line-height: 1em;
}
#contact h6 {
  font-size: 1.75em;
  color: #f8f8f8;
  font-family: akzidenz-grotesk-next-pro, sans-serif;
  font-weight: 300;
}
#socials {
  margin-top: 1em;
}
#contact a,
#column-1 a,
#column-2 a,
#column-3 a,
#credits p {
  font-size: 1.25em;
  color: #f8f8f8;
  font-family: akzidenz-grotesk-next-pro, sans-serif;
  font-weight: 300;
  font-style: normal;
  letter-spacing: normal;
  margin-right: 1em;
  text-decoration: none;
}
#bottom-bar {
  z-index: 1;
  position: relative;
}

/* DESKTOP 1 [GLOBAL] */
@media (min-width: 1280px) {
  #footer {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(10, 1fr);
  }
  #footer-title {
    grid-row: 3 / span 3;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  #footer-title h6 {
    font-size: 6em;
    text-align: center;
    width: 60%;
  }
  #bottom-bar {
    grid-row: 8 / span 10;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(4, 1fr);
  }
  #contact {
    grid-column: 1 / span 4;
    grid-row: 1 / span 2;
  }
  #column-1,
  #column-2,
  #column-3 {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }
  #column-1 {
    grid-column: 8;
  }
  #column-2 {
    grid-column: 10;
  }
  #column-3 {
    grid-column: 12;
  }
  #credits {
    grid-column: 1 / span 12;
    grid-row: 4;
    display: flex;
    flex-direction: row;
    gap: 8em;
  }
}
</style>
