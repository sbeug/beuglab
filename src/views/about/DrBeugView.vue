<script setup>
import IconProffessor from '@/components/icons/IconProffessor.vue'
import IconScience from '@/components/icons/IconScience.vue'
import IconResearch from '@/components/icons/IconResearch.vue'
</script>
<template>
  <div id="main-content" class="main-content">
    <div id="introduction" class="section">
      <div id="intro-txt" class="df-pad">
        <h1 id="name">Dr. Shawn Beug</h1>
        <h6>
          Dr. Shawn Beug is an internationally recognized cancer biologist specializing in the
          molecular mechanisms of tumor progression, metastasis, and treatment resistance. With a
          strong foundation in cell signaling, immune modulation, and cancer epigenetics, Dr. Beug
          leads cutting-edge research aimed at uncovering new therapeutic strategies for
          difficult-to-treat cancers. He holds multiple academic and leadership roles across
          top-tier Canadian institutions.
        </h6>
        <div class="button open-contact clickable">
          <p>Get in touch</p>
        </div>
        <div id="connect" class="clickable">
          <a href="https://ca.linkedin.com/in/shawn-beug-9711292b">LinkedIn ↗</a>
          <a href="https://www.cheoresearch.ca/research/find-a-researcher/shawn-beug-phd/"
            >CHEO RI ↗</a
          >
          <a href="https://www.uottawa.ca/faculty-medicine/dr-shawn-beug"
            >University of Ottawa ↗</a
          >
        </div>
      </div>
      <div id="pfp-container">
        <div id="pfp-circle">
          <div id="pfp-overlay"></div>
          <img
            src="../../assets/content/images/team/ShawnBeug.jpeg"
            alt="Dr. Shawn Beug"
            id="pfp"
          />
        </div>
      </div>
    </div>
    <div id="positions" class="section">
      <div id="pos-1" class="position">
        <IconProffessor class="pos-icon" />
        <h3>Assistant Prof</h3>
        <p>
          Department of Biochemistry, Microbiology and Immunology, Faculty of Medicine, University
          of Ottawa
        </p>
      </div>
      <div id="pos-2" class="position">
        <IconScience class="pos-icon" />
        <h3>Scientist</h3>
        <p>CHEO Research Institute, Cancer Therapeutics Program</p>
      </div>
      <div id="pos-3" class="position">
        <IconResearch class="pos-icon" id="iconfix" />
        <h3>Canada Research Chair</h3>
        <p>(Tier 2) in Cancer Biology and Translational Research</p>
      </div>
    </div>
    <div id="research" class="section df-pad">
      <div id="research-txt">
        <h1>Research Focus</h1>
        <h6>
          Dr. Beug’s research centers on understanding how cancer cells evade therapeutic
          intervention and immune detection. His lab explores the dynamic interplay between the
          tumor microenvironment and cellular signaling pathways to uncover novel vulnerabilities in
          aggressive cancers.
        </h6>
        <h6>Key Areas of Investigation:</h6>
      </div>
      <div id="areas">
        <div class="area">
          <h6>Mechanisms of therapeutic resistance</h6>
        </div>
        <div class="area">
          <h6>Tumor immune evasion</h6>
        </div>
        <div class="area">
          <h6>Identification of new drug targets</h6>
        </div>
      </div>
    </div>
    <div id="goal">
      <h3>
        His labs ultimate goal is to translate foundational research discoveries into clinically
        relevant therapies that can improve outcomes for patients with advanced cancers.
      </h3>
    </div>
    <div id="education" class="section">
      <div class="section-txt df-pad">
        <h1>Education & Training</h1>
        <h6>
          Dr. Beug received his PhD in Pathology from Dalhousie University, where he studied cell
          signaling pathways in cancer development. He completed postdoctoral training at the
          Princess Margaret Cancer Centre (University Health Network) in Toronto, one of Canada’s
          leading cancer research institutions, under the mentorship of world-renowned experts in
          cancer biology and immunology.
        </h6>
      </div>
      <div class="section-img">
        <img src="../../assets/content/images/BeugLab-Still-03.jpg" alt="tbd" />
      </div>
    </div>
    <div id="collab" class="section">
      <div class="section-img">
        <img src="../../assets/content/images/BeugLab-Still-04.jpg" alt="tbd" />
      </div>
      <div class="section-txt df-pad">
        <h1>Collaborations & Mentorship</h1>
        <h6>
          Dr. Beug is deeply committed to fostering the next generation of biomedical researchers.
          His lab actively mentors undergraduate, graduate, and postdoctoral trainees. He also
          collaborates with clinicians, immunologists, and computational biologists to bridge the
          gap between lab discoveries and patient care
        </h6>
      </div>
    </div>
    <div id="recognition" class="section df-pad">
      <div class="divider"></div>
      <h1>Recognition</h1>
      <div class="rec">
        <h6>Canada Research Chair (Tier 2) – Recognizing emerging leaders in health research.</h6>
      </div>
      <div class="rec">
        <h6>
          Multiple peer-reviewed grants and fellowships from national agencies, including CIHR and
          NSERC.
        </h6>
      </div>
      <div class="rec">
        <h6>
          Published in leading journals and frequently invited to speak at scientific conferences.
        </h6>
      </div>
    </div>
  </div>
</template>
<style scoped>
.section {
  position: relative;
  width: 100%;
  height: 100%;
}
#introduction {
  z-index: 1;
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(0deg, rgba(255, 255, 255, 0), rgba(233, 233, 233, 1));
  display: flex;
  flex-basis: 0;
  flex-direction: column-reverse;
  padding-bottom: 4em;
}
#intro-txt {
  position: relative;
  z-index: 2;
}
#name {
  font-size: 2.75em;
  line-height: 1em;
  padding-bottom: 1em;
  text-transform: uppercase;
}
#introduction h6 {
  font-size: 1.25em;
  line-height: 1.5em;
  padding-bottom: 2em;
  text-align: justify;
}
#connect {
  padding-top: 2em;
}
#pfp-container {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
}
#pfp-circle {
  z-index: 1;
}
#pfp,
#pfp-overlay {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
#pfp-overlay {
  position: absolute;
  top: 0;
  left: 0;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0),
    rgba(233, 233, 233, 0.1),
    rgba(233, 233, 233, 1)
  );
}
#connect {
  display: none;
}
#positions {
  z-index: 2;
  border-radius: 25px;
}
.position {
  background-color: #2c2c2c;
  border-radius: 50px;
  margin-left: 1em;
  margin-right: 1em;
  margin-bottom: 1em;
  padding: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.position h3,
.position p {
  color: var(--blanco);
  text-align: center;
}
.position h3 {
  font-size: 1.5em;
  padding-bottom: 0.5em;
}
.pos-icon {
  width: 5em;
  height: 5em;
  margin-bottom: 1em;
}
#research {
  padding-top: 5em;
  padding-bottom: 6em;
}
#research-txt :nth-child(1) {
  font-size: 2.5em;
  line-height: 1.1em;
  text-transform: uppercase;
}
#research-txt h6 {
  font-size: 1.25em;
  line-height: 1.5em;
  padding-top: 2em;
  padding-bottom: 1em;
}
#research-txt :nth-child(3) {
  font-size: 1.5em;
  padding-top: 1em;
  padding-bottom: 0;
}
.area {
  padding-top: 1em;
}
.area h6 {
  font-size: 1.25em;
  line-height: 1.5em;
  font-style: italic;
}
#goal {
  width: 100%;
  padding-top: 4em;
  padding-bottom: 4em;
  padding-left: 1em;
  padding-right: 1em;
  display: flex;
  justify-content: center;
  background-color: #22222220;
}
#goal h3 {
  font-size: 1.5em;
  text-align: center;
  line-height: 1.5em;
}
.section-txt {
  padding-top: 4em;
  padding-bottom: 4em;
}
.section-txt :nth-child(1) {
  font-size: 1.75em;
  line-height: 1.25em;
  width: 100%;
  padding-bottom: 0.5em;
  text-transform: uppercase;
}
.section-txt h6 {
  font-size: 1.25em;
  line-height: 1.5em;
  padding-top: 1em;
  padding-bottom: 1em;
}
.section-img {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.section-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
#collab {
  display: flex;
  flex-direction: column-reverse;
}
#recognition {
  padding-top: 5em;
  padding-bottom: 6em;
}
#recognition :nth-child(2) {
  font-size: 2em;
  line-height: 1.25em;
  text-transform: uppercase;
}
.rec {
  padding-top: 2em;
}
.rec h6 {
  font-size: 1.25em;
  line-height: 1.5em;
}
.divider {
  display: none;
  height: 2px;
  width: 100%;
  background-color: var(--nero);
  margin-bottom: 8em;
}
/* TABLET 2 [GLOBAL] */
@media (min-width: 1000px) {
  #introduction {
    flex-direction: row;
    padding: 0;
    padding-top: 4em;
    max-height: 100vh;
    overflow: hidden;
  }
  #intro-txt {
    width: 100%;
    padding-top: 2em;
  }
  #name {
    font-size: 4em !important;
    line-height: 1.1em !important;
    padding-bottom: 0.5em !important;
  }
  #intro-txt h6 {
    font-size: 1em;
    padding-bottom: 2em;
  }
  #pfp-circle {
    position: absolute;
    top: 0%;
    left: -10%;
    border: 4px solid var(--nero);
    width: 36em;
    height: 36em;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  #connect {
    display: block;
    padding-top: 3em;
  }
  #connect a {
    font-family: akzidenz-grotesk-next-pro, sans-serif;
    font-weight: 200;
    letter-spacing: normal;
    font-size: 1em;
    color: var(--font-color-main);
    transition: all 0.5s ease;
    margin-right: 1.5em;
    text-decoration: none;
  }
  #positions {
    display: flex;
    flex-direction: row;
    padding-left: 1em;
    padding-right: 1em;
  }
  .position {
    width: 100%;
  }
  #research-txt :nth-child(1) {
    font-size: 5em;
    padding-bottom: 0.5em;
  }
  #goal h3 {
    font-size: 2em;
  }
  #collab,
  #education {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  #recognition {
    background-color: #22222220;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
/* DESKTOP 1 [GLOBAL] */
@media (min-width: 1280px) {
  #main-content {
    min-height: 100vh;
  }
  #introduction {
    flex-direction: row;
    padding: 0;
    padding-top: 4em;
  }
  #intro-txt {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding-top: 0em;
  }
  #name {
    font-size: 4em !important;
  }
  #introduction h6 {
    font-size: 1.25em;
    line-height: 1.5em;
    padding-bottom: 2em;
    width: 80%;
  }
  .button p {
    font-size: 1.25em;
  }
  #connect {
    padding-top: 4em;
  }
  #connect a {
    font-size: 1.5em;
  }
  #pfp-container {
    width: auto;
  }
  #pfp-circle {
    position: absolute;
    top: 0%;
    border: 6px solid var(--nero);
    width: 48em;
    height: 48em;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  #pfp-overlay {
    position: absolute;
    top: 0;
    left: 0;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0),
      rgba(233, 233, 233, 0.1),
      rgba(233, 233, 233, 1)
    );
    z-index: 1;
  }
  #pfp,
  #pfp-overlay {
    width: 100%;
    height: 100%;
    object-fit: cover;
    padding: 2.5em;
    border-radius: 50%;
  }
  #connect a:hover {
    color: var(--font-color-hover);
  }
  #positions {
    margin: 0;
    border-radius: 50px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 4em;
  }
  .position {
    background-color: #2c2c2c80;
    backdrop-filter: blur(10px);
    justify-content: flex-start;
    padding: 3em;
    border: 2px solid var(--blanco);
  }
  .position h3 {
    font-size: 1.75em;
  }
  .position p {
    font-size: 1.25em;
  }
  .pos-icon {
    width: 7em;
    height: 7em;
    margin-bottom: 2em;
  }
  #research-txt {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding-top: 8em;
    padding-bottom: 8em;
  }
  #research-txt :nth-child(1) {
    padding: 0 !important;
    width: 100% !important;
    font-size: 5em;
  }
  #research-txt h6 {
    width: 50%;
    font-size: 1.25em;
    line-height: 1.5em;
    padding-top: 2em;
    padding-bottom: 2em;
    padding-right: 8em;
  }
  #research-txt :nth-child(3) {
    font-size: 2.5em;
    width: 100% !important;
  }
  #areas {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    gap: 2em;
    padding-bottom: 4em;
  }
  .area {
    background-color: #4e4e4ec2;
    backdrop-filter: blur(10px);
    width: 25em;
    height: 18em;
    padding: 2em;
    color: var(--blanco);
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
  }
  .area h6 {
    font-size: 2em;
    line-height: 1.25em;
    font-style: normal;
  }
  #goal {
    width: 100%;
    padding: 8em;
    display: flex;
    justify-content: center;
    backdrop-filter: blur(10px);
    background-color: #22222220;
  }
  #goal h3 {
    font-size: 3em;
    text-align: center;
    line-height: 1.5em;
  }
  .section-txt {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding-top: 4em;
    padding-bottom: 4em;
  }
  .section-txt :nth-child(1) {
    font-size: 3em;
    line-height: 1.25em !important;
    width: 100%;
    padding: 0 !important;
  }
  .section-txt h6 {
    font-size: 1.25em;
    line-height: 1.5em;
    padding-top: 2em;
  }
  .section-img img {
    border-radius: 25px;
  }
  #education img {
    margin-right: 8em;
  }
  #collab img {
    margin-left: 8em;
  }
  #collab,
  #education {
    margin: 0;
    padding-top: 12em;
  }
  #education p {
    padding-right: 8em;
  }
  #education .section-txt {
    padding-right: 8em;
  }
  #collab .section-txt {
    padding-left: 8em;
  }
  #recognition {
    background-color: transparent;
    padding-top: 14em;
    padding-bottom: 14em;
  }
  #recognition :nth-child(2) {
    font-size: 3em;
    padding-bottom: 0.5em;
  }
  .rec {
    width: 50%;
    padding-top: 2em;
  }
  .rec h6 {
    font-size: 2em;
    text-align: center;
  }
  .divider {
    display: block;
  }
}
/* DESKTOP 4 (Macbook Pro 15-Inch -------------------------------------------------------------------------------------------*/
@media (min-width: 1440px) {
  #name {
    font-size: 5.5em;
  }
  #pfp-circle {
    transform: translate(-12%, -4%);
  }
}
/* DESKTOP 4 (Standard pc Monitor) -------------------------------------------------------------------------------------------*/
@media (min-width: 1920px) {
  #name {
    font-size: 5.5em !important;
    text-align: left !important;
  }
  #intro-txt h1 {
    padding-bottom: 0.5em;
  }
  #intro-txt h6 {
    font-size: 1.25em;
    padding-bottom: 2em;
  }
  #research-txt h6,
  .section-txt h6 {
    font-size: 1.5em;
  }
  #pfp-circle {
    transform: translate(-0%, 2%);
    width: 55em;
    height: 55em;
  }
  .section-txt :nth-child(1),
  #recognition :nth-child(2) {
    font-size: 4em;
  }
}
</style>
