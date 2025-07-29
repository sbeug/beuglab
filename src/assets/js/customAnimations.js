import gsap from 'gsap'
import Expo from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

export function homePageLoadAnimation() {
  new SplitType('#hero-heading', { types: 'chars' })

  const homePageTimeline = new gsap.timeline({
    paused: false,
    duration: 2,
  })
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
    0,
  )
  homePageTimeline.from(
    '#mobile-heading',
    {
      opacity: 0,
      y: 50,
      ease: 'power3.out',
      duration: 1,
      filter: 'blur(10px)',
    },
    1,
  )
  homePageTimeline.from(
    '#hero-c2a',
    {
      opacity: 0,
      y: 50,
      ease: 'power3.out',
      duration: 1,
      filter: 'blur(10px)',
    },
    1.25,
  )

  // Return cleanup function
  return () => {
    homePageTimeline.kill()
  }
}

export function DropDownMenuAnimation() {
  // Store handlers for cleanup
  const handlers = []

  const dropDownTimeline = new gsap.timeline({
    paused: true,
    duration: 1,
  })
  dropDownTimeline.set(
    '#dropdown-menu',
    {
      visibility: 'visible',
    },
    0,
  )
  dropDownTimeline.to(
    '#line-one',
    {
      y: 5,
      ease: 'power4.out',
      rotation: 45,
      duration: 0.01,
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
      stagger: 0.05,
      ease: Expo.easeInOut,
    },
    0.5,
  )
  dropDownTimeline.reverse(1)

  const menuButtonHandler = function (event) {
    if (event.target.matches('#menu-button')) {
      dropDownTimeline.reversed(!dropDownTimeline.reversed())
    }
  }

  const menuLinkHandler = function (event) {
    if (event.target.matches('.menu-link-2')) {
      dropDownTimeline.reversed(!dropDownTimeline.reversed())
    }
  }

  const subLinkHandler = function (event) {
    if (event.target.matches('.sub-link')) {
      dropDownTimeline.reversed(!dropDownTimeline.reversed())
    }
  }

  document.addEventListener('click', menuButtonHandler)
  document.addEventListener('click', menuLinkHandler)
  document.addEventListener('click', subLinkHandler)

  handlers.push(
    { type: 'click', handler: menuButtonHandler },
    { type: 'click', handler: menuLinkHandler },
    { type: 'click', handler: subLinkHandler },
  )

  // Return cleanup function
  return () => {
    handlers.forEach(({ type, handler }) => {
      document.removeEventListener(type, handler)
    })
    dropDownTimeline.kill()
  }
}

export function subMenuDrop() {
  const handlers = []
  const toggles = document.querySelectorAll('.sub-toggle')

  toggles.forEach((toggle) => {
    let isOpen = false
    const subMenu = toggle.querySelector('.sub-list')

    const subMenuTl = new gsap.timeline({
      paused: true,
      duration: 1,
    })
    subMenuTl.fromTo(
      subMenu,
      { height: 0, opacity: 0, overflow: 'visible' },
      {
        height: 'auto',
        opacity: 1,
        ease: 'power2.out',
      },
      0,
    )
    subMenuTl.to(
      '.circle-arrow',
      {
        rotation: 135,
        ease: 'power2.out',
        duration: 0.5,
      },
      0,
    )

    const clickHandler = () => {
      if (isOpen) {
        subMenuTl.reverse()
      } else {
        subMenuTl.play()
      }
      isOpen = !isOpen
    }

    toggle.addEventListener('click', clickHandler)
    handlers.push({ element: toggle, type: 'click', handler: clickHandler, timeline: subMenuTl })
  })

  const aboutFlair = new gsap.timeline({
    paused: true,
    duration: 0.5,
  })
  const galleryFlair = new gsap.timeline({
    paused: true,
    duration: 0.5,
  })
  const contactFlair = new gsap.timeline({
    paused: true,
    duration: 0.5,
  })
  aboutFlair.to(
    '#nav-arrow-about',
    {
      rotation: 90,
      ease: 'power2.out',
      duration: 0.5,
    },
    0,
  )
  galleryFlair.to(
    '#nav-arrow-gallery',
    {
      rotation: 90,
      ease: 'power2.out',
      duration: 0.5,
    },
    0,
  )
  contactFlair.to(
    '#nav-arrow-contact',
    {
      rotation: 90,
      ease: 'power2.out',
      duration: 0.5,
    },
    0,
  )
  aboutFlair.from(
    '#sub-list-about li',
    {
      x: 50,
      opacity: 0,
      ease: 'power2.out',
      stagger: 0.05,
    },
    0,
  )

  const aboutToggle = document.getElementById('about')
  let isAboutOpen = false
  const aboutHandler = () => {
    if (isAboutOpen === false) {
      aboutFlair.play()
      isAboutOpen = true
    } else if (isAboutOpen === true) {
      aboutFlair.reverse()
      isAboutOpen = false
    }
  }

  if (aboutToggle) {
    aboutToggle.addEventListener('click', aboutHandler)
    handlers.push({
      element: aboutToggle,
      type: 'click',
      handler: aboutHandler,
      timeline: aboutFlair,
    })
  }

  const galleryToggle = document.getElementById('gallery')
  let isGalleryOpen = false
  const galleryHandler = () => {
    if (isGalleryOpen === false) {
      galleryFlair.play()
      isGalleryOpen = true
    } else if (isGalleryOpen === true) {
      galleryFlair.reverse()
      isGalleryOpen = false
    }
  }

  if (galleryToggle) {
    galleryToggle.addEventListener('click', galleryHandler)
    handlers.push({
      element: galleryToggle,
      type: 'click',
      handler: galleryHandler,
      timeline: galleryFlair,
    })
  }

  const contactToggle = document.getElementById('contact')
  let isContactOpen = false
  const contactHandler = () => {
    if (isContactOpen === false) {
      contactFlair.play()
      isContactOpen = true
    } else if (isContactOpen === true) {
      contactFlair.reverse()
      isContactOpen = false
    }
  }

  if (contactToggle) {
    contactToggle.addEventListener('click', contactHandler)
    handlers.push({
      element: contactToggle,
      type: 'click',
      handler: contactHandler,
      timeline: contactFlair,
    })
  }

  // Return cleanup function
  return () => {
    handlers.forEach(({ element, type, handler, timeline }) => {
      element.removeEventListener(type, handler)
      if (timeline) {
        timeline.kill()
      }
    })
  }
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

  // Return cleanup function - for now return empty function since this needs more complex refactoring
  return () => {
    // TODO: Implement proper cleanup for DesktopSubmenuAnimation
  }
}

export function subMenuHover(menuSelector = '.sub-drop') {
  const menuItems = document.querySelectorAll(menuSelector)

  menuItems.forEach((item) => {
    const subMenu = item.querySelector('.sub-list')

    if (!subMenu) return
    gsap.set(subMenu, { height: 0, opacity: 0 })

    const subMenuTl = new gsap.timeline({
      paused: true,
      duration: 1,
    })
    subMenuTl.to(
      subMenu,
      {
        height: 'auto',
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
      },
      0,
    )
    subMenuTl.to(
      '#nav-arrow-about',
      {
        rotate: 90,
        duration: 1,
        ease: 'power2.out',
      },
      0,
    )
    subMenuTl.from(
      '.sub-list li',
      {
        y: 50,
        opacity: 0,
        stagger: 0.05,
        ease: 'power2.out',
      },
      0.1,
    )
    subMenuTl.from(
      '.sub-link',
      {
        x: 20,
        opacity: 0,
        stagger: 0.05,
        duration: 0.5,
        ease: 'power2.out',
      },
      0.35,
    )
    subMenuTl.to(
      '.circle-arrow',
      {
        rotate: 135,
        duration: 0.5,
        ease: 'power2.out',
      },
      0.35,
    )
    let isOpen = false
    item.addEventListener('click', () => {
      if (!isOpen) {
        gsap.set(subMenu, { display: 'flex' })
        subMenuTl.play()
        isOpen = true
      } else {
        subMenuTl.reverse()
        isOpen = false
      }
    })
  })

  // Return cleanup function - minimal for now
  return () => {
    // TODO: Add proper cleanup for subMenuHover
  }
}

export function menuUnderline() {
  const handlers = []
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

      handlers.push(
        { element: el, type: 'mouseenter', handler: mouseEnter },
        { element: el, type: 'mouseleave', handler: mouseLeave },
      )
    }
  })

  // Return cleanup function
  return () => {
    handlers.forEach(({ element, type, handler }) => {
      element.removeEventListener(type, handler)
    })
  }
}

export function dragToScroll() {
  const container = document.getElementById('team-members-section')
  const track = document.getElementById('members-track')

  if (!container || !track) return

  let isDragging = false
  let startX = 0
  let currentTranslate = 0
  let prevTranslate = 0

  const dragStart = new gsap.timeline({
    paused: true,
    duration: 0.5,
  })

  dragStart.to(
    '#team-description',
    {
      opacity: 0,
      filter: 'blur(10px)',
      ease: 'power2.out',
    },
    0,
  )

  dragStart.to(
    '#team-c2a',
    {
      opacity: 0,
      filter: 'blur(10px)',
      ease: 'power2.out',
    },
    0.1,
  )

  const clamp = (num, min, max) => Math.max(min, Math.min(num, max))

  const setTranslate = (x) => {
    track.style.transform = `translate3d(${x}px, 0, 0)`
  }

  const reverseTimelineIfAtStart = () => {
    if (currentTranslate === 0) {
      dragStart.reverse()
    }
  }

  const onStart = (e) => {
    isDragging = true
    startX = (e.type.includes('mouse') ? e.pageX : e.touches[0].clientX) - prevTranslate
    container.style.cursor = 'grabbing'

    if (screen.width > 768) {
      dragStart.play()
    }
  }

  const onMove = (e) => {
    if (!isDragging) return

    const x = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX
    currentTranslate = x - startX

    const maxTranslate = 0
    const minTranslate = container.offsetWidth - (track.scrollWidth + window.innerWidth * 0.5)

    currentTranslate = clamp(currentTranslate, minTranslate, maxTranslate)
    setTranslate(currentTranslate)
  }

  const onEnd = () => {
    isDragging = false
    prevTranslate = currentTranslate
    container.style.cursor = 'grab'

    if (screen.width > 768) {
      reverseTimelineIfAtStart()
    }
  }

  container.style.cursor = 'grab'

  container.addEventListener('mousedown', onStart)
  window.addEventListener('mousemove', onMove)
  window.addEventListener('mouseup', onEnd)

  container.addEventListener('touchstart', onStart)
  container.addEventListener('touchmove', onMove)
  container.addEventListener('touchend', onEnd)

  // Return cleanup function
  return () => {
    container.removeEventListener('mousedown', onStart)
    window.removeEventListener('mousemove', onMove)
    window.removeEventListener('mouseup', onEnd)
    container.removeEventListener('touchstart', onStart)
    container.removeEventListener('touchmove', onMove)
    container.removeEventListener('touchend', onEnd)
    dragStart.kill()
  }
}

export function teamViewAnimations() {
  const sidebar = document.querySelector('#side-bar')
  const mobileButton = document.querySelector('#mobile-btn')
  const footer = document.querySelector('#footer')
  const arrow = document.querySelector('#arrow')

  if (window.innerWidth < 768) {
    const memberMenuTimeline = new gsap.timeline({
      paused: true,
      duration: 0.5,
    })
    memberMenuTimeline.to(
      sidebar,
      {
        ease: Expo.easeInOut,
        duration: 0.5,
        left: '0%',
      },
      0,
    )
    memberMenuTimeline.to(
      arrow,
      {
        ease: Expo.easeInOut,
        duration: 0.1,
        opacity: 0,
      },
      0,
    )
    memberMenuTimeline.to(
      arrow,
      {
        ease: Expo.easeInOut,
        duration: 0.1,
        transform: 'scaleX(-1)',
      },
      0.1,
    )
    memberMenuTimeline.to(
      arrow,
      {
        ease: Expo.easeInOut,
        duration: 0.25,
        opacity: 1,
      },
      0.2,
    )
    let isMenuOpen = false
    if (mobileButton) {
      mobileButton.addEventListener('click', () => {
        console.log('clicked')
        if (isMenuOpen) {
          memberMenuTimeline.reverse()
        } else {
          memberMenuTimeline.play()
        }
        isMenuOpen = !isMenuOpen
      })
    }
    const memberLinks = document.querySelectorAll('.member-link')
    memberLinks.forEach((member) => {
      member.addEventListener('click', () => {
        memberMenuTimeline.reverse()
        isMenuOpen = false
      })
    })
  }
  if (window.innerWidth > 768) {
    if (!sidebar || !footer) return

    gsap.registerPlugin(ScrollTrigger)

    gsap.to(sidebar, {
      scrollTrigger: {
        trigger: footer,
        start: 'top 100%',
        end: 'top 10%',
        scrub: true,
      },
      opacity: 0,
      duration: 0.25,
      ease: 'power4.out',
    })
  }

  // Return cleanup function - minimal for now
  return () => {
    // TODO: Add proper cleanup for teamViewAnimations
  }
}

export function ContactForm() {
  const handlers = []
  const contactOpen = document.querySelectorAll('.contact-open')
  const contactContainer = document.querySelector('#contact-container')
  const contactWrapper = document.querySelector('#contact-wrapper')
  const contactClose = document.querySelector('.contact-close')

  const contactTimeline = new gsap.timeline({
    paused: true,
    duration: 1,
  })
  contactTimeline.set(
    contactWrapper,
    {
      visibility: 'visible',
    },
    0,
  )
  contactTimeline.to(
    contactWrapper,
    {
      height: '100vh',
      ease: 'power4.out',
      duration: 1.5,
    },
    0,
  )
  contactTimeline.to(
    '#contact-spline',
    {
      opacity: '100%',
      ease: 'power1.out',
      duration: 1,
    },
    0.25,
  )
  contactTimeline.to(
    '.contact-close',
    {
      opacity: '100%',
      yPercent: 0,
      ease: 'power3.out',
      duration: 0.5,
    },
    0.25,
  )
  contactTimeline.to(
    '#contact-form-header',
    {
      opacity: '100%',
      yPercent: 0,
      ease: 'power3.out',
      duration: 1,
    },
    0.5,
  )
  contactTimeline.to(
    '#description',
    {
      opacity: '100%',
      ease: 'power3.out',
      duration: 1,
    },
    0.75,
  )
  contactTimeline.to(
    '#local',
    {
      opacity: '100%',
      ease: 'power3.out',
      duration: 1,
    },
    1,
  )
  contactTimeline.to(
    '#contact-form',
    {
      opacity: '100%',
      ease: 'power3.out',
      duration: 1,
    },
    1.25,
  )

  // Handle existing .contact-open elements
  contactOpen.forEach((el) => {
    const openHandler = () => {
      contactTimeline.play()
      contactContainer.style.pointerEvents = 'auto'
    }
    el.addEventListener('click', openHandler)
    handlers.push({ element: el, type: 'click', handler: openHandler })
  })

  // Use event delegation to handle both .open-contact and any future .contact-open elements
  const delegateHandler = (e) => {
    if (e.target.closest('.open-contact') || e.target.closest('.contact-open')) {
      contactTimeline.play()
      contactContainer.style.pointerEvents = 'auto'
    }
  }
  document.addEventListener('click', delegateHandler)
  handlers.push({ element: document, type: 'click', handler: delegateHandler })

  const closeHandler = () => {
    contactTimeline.reverse()
    contactContainer.style.pointerEvents = 'none'
  }

  if (contactClose) {
    contactClose.addEventListener('click', closeHandler)
    handlers.push({ element: contactClose, type: 'click', handler: closeHandler })
  }

  // Return cleanup function
  return () => {
    handlers.forEach(({ element, type, handler }) => {
      element.removeEventListener(type, handler)
    })
    contactTimeline.kill()
  }
}
