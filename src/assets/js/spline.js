import { Application } from '@splinetool/runtime';

// Store references to prevent memory leaks
let homeSplineApp = null;
let homeSplineCanvas = null;

export function homeSpline(){
  // Clean up any existing instance first
  cleanupHomeSpline();

  const canvas = document.getElementById('home-spline');
  if (!canvas) {
    console.warn('Canvas element with id "home-spline" not found');
    return null;
  }

  // Check for WebGL support
  if (!isWebGLSupported()) {
    console.warn('WebGL is not supported in this browser');
    return null;
  }

  try {
    homeSplineCanvas = canvas;

    // Add WebGL context loss handlers
    addWebGLContextHandlers(canvas, () => {
      console.log('WebGL context lost for home spline');
      cleanupHomeSpline();
    }, () => {
      console.log('WebGL context restored for home spline');
      // Reinitialize if needed
      homeSpline();
    });

    homeSplineApp = new Application(canvas);

    homeSplineApp.load('https://prod.spline.design/FCbn4L9mentHyEzd/scene.splinecode')
      .catch(error => {
        console.error('Failed to load Spline scene:', error);
        cleanupHomeSpline();
      });

    return homeSplineApp;
  } catch (error) {
    console.error('Error initializing Spline application:', error);
    cleanupHomeSpline();
    return null;
  }
}

export function cleanupHomeSpline() {
  if (homeSplineApp) {
    try {
      // Dispose of the Spline application and free resources
      if (typeof homeSplineApp.dispose === 'function') {
        homeSplineApp.dispose();
      }

      // Clear WebGL context if available
      if (homeSplineCanvas) {
        const gl = homeSplineCanvas.getContext('webgl') || homeSplineCanvas.getContext('experimental-webgl');
        if (gl && typeof gl.getExtension === 'function') {
          const loseContextExt = gl.getExtension('WEBGL_lose_context');
          if (loseContextExt) {
            loseContextExt.loseContext();
          }
        }
      }
    } catch (error) {
      console.warn('Error during Spline cleanup:', error);
    }

    homeSplineApp = null;
    homeSplineCanvas = null;
  }
}

function addWebGLContextHandlers(canvas, onLost, onRestored) {
  canvas.addEventListener('webglcontextlost', (event) => {
    event.preventDefault();
    onLost();
  });

  canvas.addEventListener('webglcontextrestored', () => {
    onRestored();
  });
}

function isWebGLSupported() {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}
