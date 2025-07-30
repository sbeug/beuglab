import gsap from 'gsap'
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
  const handlers = []

  const dropdownMenu = document.querySelector('#dropdown-menu')
  const lineOne = document.querySelector('#line-one')
  const lineTwo = document.querySelector('#line-two')
  const menuItems = document.querySelectorAll('#menu-list ul li')
  const menuButton = document.querySelector('#menu-button')

  if (!dropdownMenu || !lineOne || !lineTwo || !menuButton) {
    console.warn('Dropdown menu elements not found')
    return () => {}
  }

  gsap.set([lineOne, lineTwo], {
    transformOrigin: 'center center',
    force3D: true,
  })

  gsap.set(dropdownMenu, {
    visibility: 'hidden',
    xPercent: 100,
    opacity: 0,
    force3D: true,
  })

  gsap.set(menuItems, {
    y: 50,
    opacity: 0,
    force3D: true,
  })

  const dropDownTimeline = new gsap.timeline({
    paused: true,
    duration: 1,
    onStart: () => {
      // Prevent body scroll on mobile when menu opens
      document.body.style.overflow = 'hidden'
    },
    onReverseComplete: () => {
      // Re-enable body scroll when menu closes
      document.body.style.overflow = ''
      // Hide the menu completely when animation is done
      gsap.set(dropdownMenu, { visibility: 'hidden' })
    },
  })
  dropDownTimeline
    .set(
      dropdownMenu,
      {
        visibility: 'visible',
      },
      0,
    )
    .to(
      dropdownMenu,
      {
        opacity: 1,
        duration: 0.1,
        ease: 'power2.out',
      },
      0,
    )
    .to(
      [lineOne, lineTwo],
      {
        duration: 0.3,
        ease: 'power2.out',
        transformOrigin: 'center center',
      },
      0,
    )
    .to(
      lineOne,
      {
        rotation: 45,
        y: 6,
        duration: 0.3,
        ease: 'power2.out',
      },
      0,
    )
    .to(
      lineTwo,
      {
        rotation: -45,
        y: -6,
        duration: 0.3,
        ease: 'power2.out',
      },
      0,
    )
    .to(
      dropdownMenu,
      {
        xPercent: 0,
        ease: 'power3.inOut',
        duration: 0.6,
      },
      0.1,
    )
    .to(
      menuItems,
      {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        ease: 'power2.out',
        duration: 0.4,
      },
      0.5,
    )

  dropDownTimeline.reverse()

  // Use event delegation for better performance
  const handleClick = function (event) {
    const target = event.target

    // Check if click is on menu button or its children
    if (target.closest('#menu-button')) {
      event.preventDefault()
      dropDownTimeline.reversed(!dropDownTimeline.reversed())
      return
    }

    // Check if click is on menu links
    if (target.matches('.menu-link-2') || target.matches('.sub-link')) {
      dropDownTimeline.reversed(!dropDownTimeline.reversed())
      return
    }
  }

  // Prevent touch scrolling on mobile when menu is open
  const handleTouchMove = function (event) {
    if (!dropDownTimeline.reversed()) {
      event.preventDefault()
    }
  }

  // Add single event listener with delegation
  document.addEventListener('click', handleClick, { passive: false })
  document.addEventListener('touchmove', handleTouchMove, { passive: false })
  handlers.push(
    { type: 'click', handler: handleClick },
    { type: 'touchmove', handler: handleTouchMove },
  )

  return () => {
    handlers.forEach(({ type, handler }) => {
      document.removeEventListener(type, handler)
    })
    // Ensure body scroll is re-enabled on cleanup
    document.body.style.overflow = ''
    dropDownTimeline.kill()
  }
}

export function subMenuDrop() {
  const handlers = []
  const toggles = document.querySelectorAll('.sub-toggle')

  toggles.forEach((toggle) => {
    let isOpen = false
    const subMenu = toggle.querySelector('.sub-list')
    const arrow = toggle.querySelector('.nav-arrow')

    if (!subMenu) return

    // Set initial state with hardware acceleration
    gsap.set(subMenu, {
      height: 0,
      opacity: 0,
      overflow: 'hidden',
      display: 'none',
      force3D: true,
    })

    if (arrow) {
      gsap.set(arrow, {
        rotation: 0,
        transformOrigin: 'center center',
        force3D: true,
      })
    }

    const subMenuTl = new gsap.timeline({
      paused: true,
      onReverseComplete: () => {
        // Hide the submenu completely when reverse animation completes
        gsap.set(subMenu, { display: 'none' })
      },
    })

    // Optimized animation with better performance
    subMenuTl
      .set(
        subMenu,
        {
          display: 'flex',
        },
        0,
      )
      .to(
        subMenu,
        {
          height: 'auto',
          duration: 0.4,
          ease: 'power2.out',
        },
        0,
      )
      .to(
        subMenu,
        {
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out',
        },
        0.1,
      )

    if (arrow) {
      subMenuTl.to(
        arrow,
        {
          rotation: 90,
          duration: 0.4,
          ease: 'power2.out',
        },
        0,
      )
    }

    const clickHandler = (event) => {
      event.preventDefault()
      event.stopPropagation()

      if (isOpen) {
        subMenuTl.reverse()
      } else {
        subMenuTl.play()
      }
      isOpen = !isOpen
    }

    toggle.addEventListener('click', clickHandler, { passive: false })
    handlers.push({ element: toggle, type: 'click', handler: clickHandler, timeline: subMenuTl })
  })

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
    memberMenuTimeline.to(sidebar, sidebar, {
      ease: 'expo.inOut',
      duration: 0.5,
      left: '0%',
    })
    memberMenuTimeline.to(arrow, arrow, {
      ease: 'expo.inOut',
      duration: 0.1,
      opacity: 0,
    })
    memberMenuTimeline.to(arrow, arrow, {
      ease: 'expo.inOut',
      duration: 0.1,
      transform: 'scaleX(-1)',
    })
    memberMenuTimeline.to(arrow, arrow, {
      ease: 'expo.inOut',
      duration: 0.25,
      opacity: 1,
    })
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
