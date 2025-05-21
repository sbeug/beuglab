<script setup></script>
<template>
  <div id="contact-form" class="clickable">
    <div class="contact-close">
      <h2>Close</h2>
      <div id="x"></div>
    </div>
    <div id="contact-form-header">
      <h2>Contact.</h2>
    </div>
    <div id="form-container">
      <form id="contact-form">
      <div id="name-container" class="form-field">
        <label for="name">Name*</label>
        <input 
        type="text" 
        id="name" 
        name="name" 
        autocomplete="on" 
        required
        v-model="name">
      </div>
      <div id="number-container" class="form-field">
        <label for="number">Number</label>
        <input 
        type="text" 
        id="number" 
        name="number" 
        autocomplete="on"
        v-model="number">
      </div>
      <div id="email-container" class="form-field">
        <label for="number">Email*</label>
        <input 
        type="text" 
        id="email" 
        name="email" 
        autocomplete="on" 
        required
        v-model="email">
      </div>
      <div id="message-container" class="form-field">
        <label for="message">Message*</label>
        <textarea type="message" id="message" name="message" autocomplete="off" required>
        </textarea>
      </div>
      </form>
    </div>
  </div>
</template>
<style scoped>
#contact-form {
  color: black;
}
.contact-close {
  cursor: pointer;
}
#form-container {
  width: 100%;
  height: 100%;
}
#form-container label {
  font-family: akzidenz-grotesk-next-pro, sans-serif;
  font-weight: 400;
  font-style: normal;
  letter-spacing: normal;
  font-size: 1em;
  color: black;
}
.form-field {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  height: fit-content;
  margin-bottom: 1em;
}
/* DESKTOP 1 [GLOBAL] */
@media (min-width: 1280px) {
  .contact-close {
    position: absolute;
    top: 2em;
    right: 2em;
  }
  #contact-form-header h2{
    font-size: 10em;
  }
}
</style>
