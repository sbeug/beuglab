import { Application } from '@splinetool/runtime'

export function heroSpline() {
  const canvas = document.getElementById('hero-spline')
  const app = new Application(canvas)
  app.load('https://prod.spline.design/wTEYGtQaHWugxvMZ/scene.splinecode')

  return app
}
