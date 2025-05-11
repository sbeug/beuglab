import gsap from 'gsap'
import Expo from 'gsap'
import SplitType from 'split-type'

export function homePageLoadAnimation() {
  new SplitType('#hero-heading', { types: 'chars' })

  const homePageTimeline = new gsap.timeline({
    paused: false,
    duration: 2,
  })
  homePageTimeline.set(
    '#hero-heading',
    {
      display: 'none',
      visibility: 'hidden',
    },
    0,
  )
  homePageTimeline.from(
    '#hero-img',
    {
      top: '50%',
      width: '100%',
      height: '100%',
      ease: 'power2.out',
      duration: 1,
    },
    0.5,
  )
  homePageTimeline.set(
    '#hero-heading',
    {
      display: 'block',
      visibility: 'visible',
    },
    1,
  )
  homePageTimeline.from(
    '#hero-heading h1 div',
    {
      opacity: 0,
      y: 150,
      ease: 'power3.out',
      stagger: 0.1,
      duration: 1.5,
      filter: 'blur(10px)',
    },
    1.25,
  )
}

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
      xPercent: -100,
      ease: Expo.easeInOut,
      duration: 0.5,
    },
    0.15,
  )
  dropDownTimeline.to(
    '#dropdown-menu-filter',
    {
      xPercent: -100,
      ease: Expo.easeInOut,
      duration: 0.5,
    },
    0.15,
  )
  dropDownTimeline.set(
    '#menu-list ul li',
    {
      y: 75,
      opacity: '0%',
    },
    0,
  )
  dropDownTimeline.to(
    '#menu-list ul li',
    {
      y: 0,
      opacity: '100%',
      stagger: 0.1,
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

export function DesktopSubmenuAnimation() {
  // For the About submenu in desktop nav
  const aboutLinkElement = document.querySelector('#menu-link-about')
  const aboutSubmenu = document.querySelector('.sub-menu-about')

  if (aboutLinkElement && aboutSubmenu) {
    gsap.set(aboutSubmenu, {
      opacity: 0,
      visibility: 'hidden',
      y: -10,
      display: 'flex',
    })

    const aboutSubmenuTimeline = gsap.timeline({ paused: true })

    aboutSubmenuTimeline
      .to(aboutSubmenu, {
        opacity: 1,
        visibility: 'visible',
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
      })
      .to(
        aboutSubmenu.querySelectorAll('li'),
        {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          duration: 0.5,
          ease: 'power2.out',
        },
        '-=0.15',
      )
    // Create a flag to track if we're hovering over either element
    let isMenuHovered = false

    aboutLinkElement.addEventListener('mouseenter', () => {
      isMenuHovered = true
      aboutSubmenuTimeline.play()
    })

    aboutSubmenu.addEventListener('mouseenter', () => {
      isMenuHovered = true
    })

    aboutLinkElement.addEventListener('mouseleave', () => {
      isMenuHovered = false
      setTimeout(() => {
        if (!isMenuHovered) {
          aboutSubmenuTimeline.reverse()
        }
      }, 150)
    })

    aboutSubmenu.addEventListener('mouseleave', () => {
      isMenuHovered = false
      setTimeout(() => {
        if (!isMenuHovered) {
          aboutSubmenuTimeline.reverse()
        }
      }, 150)
    })
  }
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

export function menuUnderline() {
  const underLineWrapper = document.querySelectorAll('#menu li')
  underLineWrapper.forEach((el) => {
    const thisUnderline = el.querySelector('.menu-underline')

    if (thisUnderline) {
      const mouseEnter = () => {
        gsap.to(thisUnderline, {
          width: '100%',
          duration: 0.5,
          ease: 'power4.out',
        })
      }
      const mouseLeave = () => {
        gsap.to(thisUnderline, {
          width: '100%',
          duration: 0.5,
          x: '110%',
          ease: 'power4.out',
          onComplete: () => {
            gsap.set(thisUnderline, {
              x: '0%',
              width: '0%',
            })
          },
        })
      }
      el.addEventListener('mouseenter', mouseEnter)
      el.addEventListener('mouseleave', mouseLeave)
    }
  })
}
