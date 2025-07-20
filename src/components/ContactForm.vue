<script setup>
import { updateLocalTime } from '@/assets/js/utils'
import { onMounted, ref } from 'vue'

onMounted(() => {
  updateLocalTime()
  const localTimeElement = document.getElementById('local-time')
  if (localTimeElement) {
    setInterval(() => {
      updateLocalTime()
    }, 1000)
  }
})

const name = ref('')
const number = ref('')
const email = ref('')
const message = ref('')

async function submitForm() {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: name.value, email: email.value, message: message.value }),
  })

  const result = await res.json()
  if (res.ok) {
    alert('Message sent!')
    name.value = email.value = message.value = ''
  } else {
    alert(result.error || 'Error submitting form')
  }
}
</script>
<template>
  <div id="contact-spline">
    <spline-viewer
      url="https://prod.spline.design/zgZj9HR7euKqCYFg/scene.splinecode"
    ></spline-viewer>
  </div>
  <div id="contact" class="clickable df-pad">
    <div class="contact-close">
      <h2>Close</h2>
      <div id="x"></div>
    </div>
    <div id="contact-form-header">
      <h1>Contact.</h1>
    </div>
    <div id="description">
      <p>
        Whether you're a fellow researcher, a clinician, a potential collaborator, or someone
        interested in our work, we’re here to connect. Reach out using the form or via email — we’re
        always open to new conversations that help push cancer research forward.
      </p>
      <h2>shawn@arc.cheo.ca</h2>
    </div>
    <div id="local">
      <h3>Ottawa ON, Canada</h3>
      <h1 id="local-time"></h1>
    </div>
    <div id="divider"></div>
    <div id="form-container">
      <form id="contact-form">
        <div id="name-container" class="form-field">
          <input
            type="text"
            id="name"
            name="name"
            autocomplete="on"
            required
            v-model="name"
            placeholder="Full name"
          />
        </div>
        <div id="row">
          <div id="phone-container" class="form-field">
            <input
              type="text"
              id="phone"
              name="number"
              autocomplete="on"
              v-model="number"
              placeholder="Phone"
            />
          </div>
          <div id="email-container" class="form-field">
            <input
              type="text"
              id="email"
              name="email"
              autocomplete="on"
              required
              v-model="email"
              placeholder="Email"
            />
          </div>
        </div>
        <div id="message-container" class="form-field">
          <textarea
            type="message"
            id="message"
            name="message"
            autocomplete="off"
            v-model="message"
            required
            placeholder="Message"
          >
          </textarea>
        </div>
        <div id="submit-container">
          <button id="submit" @click.prevent="submitForm">Send message</button>
          <p>
            By submitting this form, you consent to Beug Lab storing your information for the
            purpose of responding to your inquiry. We do not offer medical advice or consultations.
          </p>
        </div>
      </form>
    </div>
  </div>
</template>
<style scoped>
#contact-spline {
  z-index: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}
#contact {
  z-index: 1;
  position: relative;
  color: var(--font-color-dark);
  height: 100%;
}
.contact-close {
  cursor: pointer;
  z-index: 2;
  position: absolute;
  top: 0.5em;
  right: 1em;
}
.contact-close h2 {
  font-size: 1.25em;
}
#links {
  display: none;
  flex-direction: row;
  text-wrap: wrap;
}
.contact-close,
#description,
#links,
#local {
  opacity: 0;
  y: 50px;
}
#links a {
  color: var(--font-color-dark);
}
#description h2,
#links h2 {
  margin: 0;
}
#contact-form-header {
  position: relative;
  opacity: 0;
  padding-top: 4em;
  padding-bottom: 1em;
}
#contact-form-header h1 {
  font-size: 4em;
}
#description {
  padding-bottom: 0em;
  font-size: 1.25em;
}
#description p {
  line-height: 1.5em;
  padding-bottom: 0.5em;
}
#local {
  padding-top: 2em;
}
#local h1 {
  height: fit-content;
}
#form-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}
#contact-form {
  opacity: 0;
  width: 100%;
}
#form-container input,
#form-container textarea {
  font-family: akzidenz-grotesk-next-pro, sans-serif;
  font-weight: 100;
  font-style: normal;
  letter-spacing: normal;
  width: 100%;
  background: transparent;
  border: 1px solid #22222254;
  padding: 0.75em;
  border-radius: 10px;
  font-size: 1em;
}
#form-container textarea {
  min-width: 100%;
  min-height: 8em;
  resize: none;
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
#submit-container {
  width: fit-content;
  padding-top: 1em;
}
#submit {
  background-color: var(--nero);
  color: var(--blanco);
  font-family: akzidenz-grotesk-next-pro, sans-serif;
  font-weight: 100;
  font-style: normal;
  letter-spacing: normal;
  font-size: 1em;
  border-radius: 50px;
  border: none;
  padding-left: 1.5em;
  padding-right: 1.5em;
  padding-top: 0.75em;
  padding-bottom: 0.75em;
}
#submit-container p {
  line-height: 1.5em;
  color: #22222272;
  padding-top: 1.5em;
}
#divider {
  width: 100%;
  height: 1px;
  background-color: #22222254;
  margin-top: 3em;
  margin-bottom: 4em;
}
/* TABLET 2 [GLOBAL] */
@media (min-width: 1000px) {
  #contact {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(10, 1fr);
    height: 100%;
    padding-right: 0em !important;
  }
  #contact-form-header {
    padding: 0;
    grid-column: 1 / span 4;
    grid-row: 2;
  }
  #contact-form-header h1 {
    font-size: 4.5em;
  }
  #description {
    grid-column: 1 / span 5;
    grid-row: 3 / span 2;
    font-size: 1.25em;
    padding-left: 0.5em;
    padding-top: 1em;
    padding-bottom: 1em;
  }
  #description p {
    font-size: 1em;
    line-height: 1.3em;
  }
  #local {
    display: unset;
    grid-column: 1 / span 3;
    grid-row: 8 / span 2;
    padding-left: 1em;
  }
  #form-container {
    grid-column: 7 / span 6;
    grid-row: 1 / span 12;
    backdrop-filter: blur(10px);
    background-color: #2222220a;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  #contact-form {
    width: 100%;
    padding-left: 3em;
    padding-right: 3em;
  }
}
/* DESKTOP 1 [GLOBAL] */
@media (min-width: 1280px) {
  .contact-close {
    top: 1em;
    right: 2em;
  }
  .contact-close h2 {
    font-size: 1.5em;
  }
  #contact {
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(10, 1fr);
  }
  #contact-form-header {
    padding: 0;
    grid-column: 1 / span 4;
    grid-row: 3;
  }
  #contact-form-header h1 {
    font-size: 6.5em;
  }
  #description {
    grid-column: 1 / span 4;
    grid-row: 4 / span 2;
    font-size: 1.25em;
    padding-left: 1em;
    padding-top: 1em;
    padding-bottom: 1em;
  }
  #description p {
    font-size: 1.1em;
    line-height: 1.3em;
  }
  #description h2 {
    font-size: 1.25em;
    padding-top: 1em;
  }
  #local {
    display: unset;
    grid-column: 1 / span 3;
    grid-row: 8 / span 2;
    padding-left: 1em;
  }
  #local {
    line-height: 2.5em;
  }
  #local h1 {
    font-size: 3.25em;
  }
  #form-container {
    grid-column: 7 / span 4;
    grid-row: 1 / span 12;
  }
  #contact-form {
    padding-left: 4em;
    padding-right: 4em;
  }
  #row {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1em;
  }
  #form-container input,
  #form-container textarea {
    padding: 1em;
    font-size: 1em;
  }
  #form-container textarea {
    min-height: 100%;
  }
  #submit {
    font-size: 1em;
    padding-top: 0.75em;
    padding-bottom: 0.75em;
    padding-left: 2em;
    padding-right: 2em;
  }
  #submit-container p {
    display: block;
    width: 100%;
    padding-top: 1.5em;
  }
  #divider {
    display: none;
  }
}
/* DESKTOP 4 (Standard pc Monitor) */
@media only screen and (min-width: 1920px) {
  #contact-form-header h1 {
    font-size: 7.5em;
  }
  #description p {
    font-size: 1.25em;
  }
}
</style>
