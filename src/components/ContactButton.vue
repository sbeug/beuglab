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
  border: 1px solid #5a5a5a;
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
  color: #f8f8f8;
}
.circle {
  width: 1em;
  height: 1em;
  border: 1px solid #f8f8f8;
  border-radius: 50%;
  margin-left: 1em;
}
.dot {
  width: 4px;
  height: 4px;
  background-color: #f8f8f8;
  border-radius: 50%;
  margin-left: 0.5em;
}
</style>
