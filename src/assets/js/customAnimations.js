import gsap from 'gsap'
import Expo from 'gsap'

export function DropDownMenuAnimation() {
  const dropDownTimeline = new gsap.timeline({
    paused: true,
    duration: 1,
  })
  dropDownTimeline.to(
    '#dropdown-menu',
    {
      opacity: '100%',
    },
    0,
  )
  dropDownTimeline.to(
    '#menu-button',
    {
      ease: 'power2.out',
      rotation: 360,
      duration: 1,
      scale: 0.8,
    },
    0,
  )
  dropDownTimeline.to(
    '#line-one',
    {
      y: 5,
      ease: 'power4.out',
      rotation: 45,
      duration: 0.05,
    },
    0.1,
  )
  dropDownTimeline.to(
    '#line-two',
    {
      y: -5,
      ease: 'power4.out',
      rotation: -45,
      duration: 0.01,
    },
    0.1,
  )
  dropDownTimeline.to(
    '#dropdown-menu',
    {
      yPercent: 100,
      ease: Expo.easeInOut,
      duration: 0.5,
    },
    0.15,
  )
  dropDownTimeline.to(
    '#dropdown-menu-filter',
    {
      yPercent: 100,
      ease: Expo.easeInOut,
      duration: 0.5,
    },
    0.15,
  )
  dropDownTimeline.to(
    '#menu-list ul li',
    {
      x: -100,
      opacity: '100%',
      stagger: 0.15,
      ease: Expo.easeInOut,
    },
    0.5,
  )
  dropDownTimeline.reverse(1)

  document.addEventListener('click', function (event) {
    if (event.target.matches('#menu-button')) {
      dropDownTimeline.reversed(!dropDownTimeline.reversed())
    }
  })
  document.addEventListener('click', function (event) {
    if (event.target.matches('.menu-link-2')) {
      dropDownTimeline.reversed(!dropDownTimeline.reversed())
    }
  })
  document.addEventListener('click', function (event) {
    if (event.target.matches('.sub-link')) {
      dropDownTimeline.reversed(!dropDownTimeline.reversed())
    }
  })
}

export function SublistAnimation() {
  const sublistTimelineAbout = new gsap.timeline({
    paused: true,
    defaults: { duration: 0.5 },
  })

  const about = document.getElementById('sub-list-about')

  sublistTimelineAbout.to(
    about,
    {
      opacity: 1,
      ease: Expo.easeInOut,
      duration: 0.75,
    },
    0,
  )

  const sublistTimelineGallery = new gsap.timeline({
    paused: true,
    defaults: { duration: 0.5 },
  })

  const gallery = document.getElementById('sub-list-gallery')

  sublistTimelineGallery.to(
    gallery,
    {
      opacity: 1,
      ease: Expo.easeInOut,
      duration: 0.75,
    },
    0,
  )

  const sublistTimelineContact = new gsap.timeline({
    paused: true,
    defaults: { duration: 0.5 },
  })

  const contact = document.getElementById('sub-list-contact')

  sublistTimelineContact.to(
    contact,
    {
      opacity: 1,
      ease: Expo.easeInOut,
      duration: 0.75,
    },
    0,
  )

  const aboutElement = document.getElementById('about')

  if (aboutElement) {
    aboutElement.addEventListener('mouseenter', () => {
      sublistTimelineGallery.reverse()
      sublistTimelineContact.reverse()
      setTimeout(() => {
        sublistTimelineAbout.play()
      }, 1000)
    })
  }

  const galleryElement = document.getElementById('gallery')

  if (galleryElement) {
    galleryElement.addEventListener('mouseenter', () => {
      sublistTimelineContact.reverse()
      sublistTimelineAbout.reverse()
      setTimeout(() => {
        sublistTimelineGallery.play()
      }, 1000)
    })
  }

  const contactElement = document.getElementById('contact')

  if (contactElement) {
    contactElement.addEventListener('mouseenter', () => {
      sublistTimelineGallery.reverse()
      sublistTimelineAbout.reverse()
      setTimeout(() => {
        sublistTimelineContact.play()
      }, 1000)
    })
  }
}
