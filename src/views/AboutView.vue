<template>
  <div id="main-content">
    <div id="section-1">
      <div id="experience-container">
        <video id="experience-video" autoplay muted playsinline loop preload="auto">
          <source src="../assets/content/video/BeugLab-ShowreelPreview.mp4" type="video/mp4" />
        </video>
        <div class="experience-content">
          <div id="h-top">
            <h1>We are</h1>
          </div>
          <div id="h-bottom">
            <h1>Beug Lab</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
#main-content {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
#section-1 {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
#section-1-heading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
#section-1-heading h1 {
  font-size: 8em;
  color: #181818;
}
#experience-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--nero);
  overflow: hidden;
}
#experience-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 75%;
  scale: 1.05;
}
.experience-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--blanco);
}
.experience-content h1 {
  text-transform: uppercase;
}
/* DESKTOP 1 [GLOBAL] */
@media (min-width: 1280px) {
  .experience-content h1 {
    font-size: 14em;
  }
  #h-top,
  #h-bottom {
    position: absolute;
  }
  #h-top {
    top: 20%;
    left: 2.5%;
  }
  #h-bottom {
    bottom: 20%;
    right: 2.5%;
  }
}
</style>
