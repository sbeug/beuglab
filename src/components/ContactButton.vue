<template>
  <div id="contact-button-wrapper">
    <router-link to="/contact" id="contact-button">
      <p>Contact us</p>
      <div class="circle"></div>
      <div class="dot"></div>
    </router-link>
  </div>
</template>
<style scoped>
#contact-button {
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--nero);
  border-radius: 25px;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  padding-left: 1.5em;
  padding-right: 1.5em;
  width: fit-content;
}
#contact-button p {
  font-family: akzidenz-grotesk-next-pro, sans-serif;
  font-weight: 300;
  font-style: normal;
  letter-spacing: normal;
  color: var(--font-color-main);
}
.circle {
  width: 1em;
  height: 1em;
  border: 1px solid var(--nero);
  border-radius: 50%;
  margin-left: 1em;
}
.dot {
  width: 4px;
  height: 4px;
  background-color: var(--nero);
  border-radius: 50%;
  margin-left: 0.5em;
}
/* TABLET 2 [GLOBAL] */
@media (min-width: 1000px) {
  p {
    font-size: 1.25em;
  }
  .circle {
    width: 1.5em;
    height: 1.5em;
  }
}
</style>
