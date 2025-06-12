<script setup>
import IconProffessor from '@/components/icons/IconProffessor.vue'
import IconScience from '@/components/icons/IconScience.vue'
import IconResearch from '@/components/icons/IconResearch.vue'
</script>
<template>
  <div id="main-content" class="main-content">
    <div id="introduction" class="section df-pad">
      <div id="intro-txt">
        <h1>Dr. Shawn Beug</h1>
        <h6>
          Dr. Shawn Beug is an internationally recognized cancer biologist specializing in the
          molecular mechanisms of tumor progression, metastasis, and treatment resistance. With a
          strong foundation in cell signaling, immune modulation, and cancer epigenetics, Dr. Beug
          leads cutting-edge research aimed at uncovering new therapeutic strategies for
          difficult-to-treat cancers. He holds multiple academic and leadership roles across
          top-tier Canadian institutions.
        </h6>
        <a class="button contact-open clickable">
          <p>Get in touch</p>
        </a>
        <div id="connect" class="clickable">
          <a href="https://ca.linkedin.com/in/shawn-beug-9711292b">LinkedIn</a>
          <a href="https://www.cheoresearch.ca/research/find-a-researcher/shawn-beug-phd/"
            >Cheo RI</a
          >
          <a href="https://www.uottawa.ca/faculty-medicine/dr-shawn-beug">University of Ottawa</a>
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
        <IconResearch class="pos-icon" style="scale: 4.5" />
        <h3>Canada Research Chair</h3>
        <p>(Tier 2) in Cancer Biology and Translational Research</p>
      </div>
    </div>
    <div id="research" class="section df-pad">
      <div id="research-txt">
        <h2>Research Focus</h2>
        <h6>
          Dr. Beug’s research centers on understanding how cancer cells evade therapeutic
          intervention and immune detection. His lab explores the dynamic interplay between the
          tumor microenvironment and cellular signaling pathways to uncover novel vulnerabilities in
          aggressive cancers.
        </h6>
        <h5>Key Areas of Investigation</h5>
      </div>
      <div id="areas">
        <div class="area">
          <h3>Mechanisms of therapeutic resistance</h3>
        </div>
        <div class="area">
          <h3>Tumor immune evasion</h3>
        </div>
        <div class="area">
          <h3>Epigenetic and transcriptional reprogramming</h3>
        </div>
        <div class="area">
          <h3>Identification of new drug targets</h3>
        </div>
      </div>
    </div>
    <div id="goal">
      <h3>
        His labs ultimate goal is to translate foundational research discoveries into clinically
        relevant therapies that can improve outcomes for patients with advanced cancers.
      </h3>
    </div>
    <div id="education" class="section df-pad">
      <div class="section-txt">
        <h2>Education and Training</h2>
        <p>
          Dr. Beug received his PhD in Pathology from Dalhousie University, where he studied cell
          signaling pathways in cancer development. He completed postdoctoral training at the
          Princess Margaret Cancer Centre (University Health Network) in Toronto, one of Canada’s
          leading cancer research institutions, under the mentorship of world-renowned experts in
          cancer biology and immunology.
        </p>
      </div>
      <div class="section-img">
        <img src="../../assets/content/images/BeugLab-Still-03.jpg" alt="tbd" />
      </div>
    </div>
    <div id="collab" class="section df-pad">
      <div class="section-img">
        <img src="../../assets/content/images/BeugLab-Still-04.jpg" alt="tbd" />
      </div>
      <div class="section-txt">
        <h2>Collaborations & Mentorship</h2>
        <p>
          Dr. Beug is deeply committed to fostering the next generation of biomedical researchers.
          His lab actively mentors undergraduate, graduate, and postdoctoral trainees. He also
          collaborates with clinicians, immunologists, and computational biologists to bridge the
          gap between lab discoveries and patient care
        </p>
      </div>
    </div>
    <div id="recognition" class="section df-pad">
      <div class="divider"></div>
      <h2>Recognition</h2>
      <div class="rec">
        <h3>Canada Research Chair (Tier 2) – Recognizing emerging leaders in health research.</h3>
      </div>
      <div class="rec">
        <h3>
          Multiple peer-reviewed grants and fellowships from national agencies, including CIHR and
          NSERC.
        </h3>
      </div>
      <div class="rec">
        <h3>
          Published in leading journals and frequently invited to speak at scientific conferences.
        </h3>
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
  padding-top: 4em;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0), rgba(233, 233, 233, 1));
}
#introduction h1 {
  font-size: 4em;
  line-height: 1em;
  padding-bottom: 0.5em;
}
#introduction h6 {
  font-size: 1.25em;
  line-height: 1.5em;
  padding-bottom: 2em;
}
#connect {
  padding-top: 2em;
}
#positions {
  z-index: 2;
  background-color: #2c2c2c;
  border-radius: 25px;
}
.position h3,
.position p {
  color: var(--blanco);
  text-align: center;
}
.pos-icon {
  width: 10em;
  height: 10em;
  margin-bottom: 1em;
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
  border-radius: 25px;
}
.divider {
  height: 2px;
  width: 100%;
  background-color: var(--nero);
  margin-bottom: 8em;
}
/* DESKTOP 1 [GLOBAL] */
@media (min-width: 1280px) {
  #main-content {
    min-height: 100vh;
  }
  #introduction {
    display: flex;
    flex-basis: 0;
  }
  #intro-txt {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }
  #introduction h1 {
    font-size: 8em;
    line-height: 1.1em;
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
    margin-right: 2em;
  }
  #pfp-container {
    position: relative;
    width: auto;
  }
  #pfp-circle {
    z-index: 1;
    position: absolute;
    top: 2%;
    border: 6px solid var(--nero);
    width: 70em;
    height: 70em;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  #pfp,
  #pfp-overlay {
    width: 100%;
    height: 100%;
    object-fit: cover;
    padding: 2.5em;
    border-radius: 50%;
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
  #connect a {
    font-family: akzidenz-grotesk-next-pro, sans-serif;
    font-weight: 700;
    font-style: italic;
    letter-spacing: normal;
    font-size: 1.5em;
    color: var(--font-color-main);
    transition: all 0.5s ease;
  }
  #connect a:hover {
    color: var(--font-color-hover);
  }
  #positions {
    border-radius: 50px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2em;
  }
  .position {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 4em;
  }
  .position h3 {
    font-size: 2em;
  }
  .position p {
    font-size: 1.25em;
  }
  .pos-icon {
    width: 10em;
    height: 10em;
    margin-bottom: 2em;
  }
  #research {
    padding-top: 4em;
    padding-bottom: 4em;
  }
  #research-txt {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding-top: 8em;
    padding-bottom: 8em;
  }
  #research-txt h2 {
    font-size: 7em;
  }
  #research-txt h6 {
    width: 50%;
    font-size: 1.25em;
    line-height: 1.5em;
    padding-bottom: 2em;
    padding-right: 8em;
  }
  #research-txt h5 {
    font-size: 1.25em;
    padding-left: 2em;
    padding-right: 2em;
    padding-bottom: 0.5em;
    padding-top: 0.5em;
    border: 2px solid var(--nero);
    border-radius: 50px;
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
  .area h3 {
    font-size: 2em;
    line-height: 1.25em;
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
  .section-txt h2 {
    font-size: 6em;
    line-height: 1.25em;
    width: 100%;
  }
  .section-txt p {
    font-size: 1.25em;
    line-height: 1.5em;
    padding-top: 2em;
  }
  #collab,
  #education {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding-top: 12em;
  }
  #education p {
    padding-right: 8em;
  }
  #collab .section-txt {
    padding-left: 8em;
  }
  #recognition {
    padding-top: 14em;
    padding-bottom: 14em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  #recognition h2 {
    font-size: 5em;
    padding-bottom: 0.5em;
  }
  .rec {
    padding-top: 1em;
  }
  .rec h3 {
    font-size: 1.5em;
  }
}
</style>
