<template>
  <div id="main-content" class="main-content df-pad">
    <div id="affiliations-section">
      <h2>Affiliations</h2>
      <div id="affiliation-links" class="clickable">
        <a href="https://www.cheoresearch.ca/">Cheo Research Intitute</a>
        <a href="https://www.uottawa.ca/faculty-medicine/biochemistry-microbiology-immunology"
          >University of Ottawa Faculty of Medicine</a
        >
        <a href="https://www.uottawa.ca/faculty-medicine/center-infection-immunity-inflammation"
          >Centre for Infection, Immunity and Inflammation</a
        >
        <a
          href="https://www.chairs-chaires.gc.ca/chairholders-titulaires/profile-eng.aspx?profileId=4791"
          >Canada Research Chair</a
        >
      </div>
    </div>
    <div id="support-section">
      <h2>Supported By</h2>
      <div id="logos-container">
        <img
          src="../../assets/content/icons/Cheo-logo-black.png"
          alt="Cheo Logo"
          class="inst-logo"
        />
        <img
          src="../../assets/content/icons/SickKids-logo.png"
          alt="SickKids Logo"
          class="inst-logo"
        />
        <img src="../../assets/content/icons/CIHR-logo.png" alt="CIHR Logo" class="inst-logo" />
        <img
          src="../../assets/content/icons/CRS-logo.png"
          alt="Cancer Research Societey Logo"
          class="inst-logo"
        />
        <img
          src="../../assets/content/icons/brainCancerCan-logo.png"
          alt="Brain Cancer Canada Logo"
          class="inst-logo"
        />
      </div>
    </div>
  </div>
</template>
<style scoped>
#main-content {
  position: relative;
  min-height: 100vh;
  padding-top: 4em;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
#affiliation-links a {
  color: var(--font-color-main);
  text-decoration: none;
  font-family: akzidenz-grotesk-next-pro, sans-serif;
  font-weight: 300;
  font-style: normal;
  transition: all 0.5s ease;
}
#affiliation-links a:hover {
  color: var(--font-color-hover);
}
h2 {
  font-size: 2.5em;
}
#logos-container {
  padding-top: 2em;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2.5em;
}
.inst-logo {
  width: 10em;
  height: auto;
  place-self: center;
}
#support-section {
  padding-top: 2em;
}
/* TABLET 2 [GLOBAL] */
@media (min-width: 1000px) {
  #main-content {
    padding-top: 4em;
    align-items: center;
    justify-content: flex-start;
    text-align: center;
  }
  h2 {
    font-size: 3em;
  }
  #logos-container {
    grid-template-columns: repeat(3, 1fr);
  }
  .inst-logo {
    width: 14em;
  }
}
/* DESKTOP 1 [GLOBAL] */
@media (min-width: 1280px) {
  #main-content {
    padding-top: 6em;
  }
  #affiliations-section {
    padding-bottom: 8em;
    width: 100%;
  }
  #affiliations-section h2 {
    text-align: center;
  }
  #affiliation-links {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 4em;
    padding-top: 1em;
  }
  #affiliation-links a {
    font-size: 1.5em;
  }
  h2 {
    font-size: 4em;
  }
  #support-section {
    padding: 0;
  }
  #support-section h2 {
    font-size: 4em;
    text-align: center;
  }
  #logos-container {
    grid-template-columns: repeat(5, 1fr);
    grid-row: repeat(2, 1fr);
    gap: 4em;
    padding-top: 4em;
  }
  .inst-logo {
    width: 18em;
  }
}
</style>
