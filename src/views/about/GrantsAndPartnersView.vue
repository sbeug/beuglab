<template>
  <div id="main-content" class="main-content df-pad">
    <h2>Grants and Partners</h2>
    <p>
      The Beug Lab is grateful for the support of our funding partners and collaborators. We
      acknowledge the following grants and partners that have contributed to our research:
    </p>
    <ul>
      <li><strong>Canadian Institutes of Health Research (CIHR)</strong> - Operating Grant</li>
      <li><strong>Genome Canada</strong> - Genomics Innovation Network</li>
      <li><strong>Ontario Research Fund</strong> - Research Excellence Program</li>
      <li><strong>CHEO Research Institute</strong> - Collaborative Research Initiatives</li>
    </ul>
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
}
/* DESKTOP 1 [GLOBAL] */
@media (min-width: 1280px) {
  #main-content {
    padding-top: 8em;
  }
  h2 {
    font-size: 4em;
    border-bottom: 2px solid var(--nero);
  }
  #support-section h2 {
    font-size: 4em;
    padding-top: 2em;
  }
  #logos-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 2em;
    padding-top: 4em;
  }
  .inst-logo {
    width: 20em;
    height: auto;
  }
}
</style>
