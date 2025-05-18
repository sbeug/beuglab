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
      stagger: 0.05,
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

export function subMenuHover(menuSelector = '.sub-drop') {
  const menuItems = document.querySelectorAll(menuSelector)

  menuItems.forEach((item) => {
    const subMenu = item.querySelector('.sub-list')

    if (!subMenu) return
    gsap.set(subMenu, { height: 0, opacity: 0 })

    let isOpen = false
    item.addEventListener('click', () => {
      if (isOpen === false) {
        gsap.set(subMenu, { display: 'flex' })

        gsap.to(subMenu, {
          height: 'auto',
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
        })
        isOpen = true
      } else if (isOpen === true) {
        gsap.to(subMenu, {
          height: 0,
          opacity: 0,
          duration: 0.5,
          ease: 'power2.out',
        })
        isOpen = false
      }
    })
  })
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

export function dragToScroll() {
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

  function reverseTimelineIfAtStart() {
    if (currentTranslate === 0) {
      dragStart.reverse()
    }
  }

  const container = document.getElementById('team-members-section')
  const track = document.getElementById('members-track')

  let isDragging = false
  let startX = 0
  let currentTranslate = 0
  let prevTranslate = 0

  const clamp = (num, min, max) => Math.max(min, Math.min(num, max))

  function setTranslate(x) {
    track.style.transform = `translate3d(${x}px, 0, 0)`
  }

  function onStart(e) {
    isDragging = true
    startX = (e.type.includes('mouse') ? e.pageX : e.touches[0].clientX) - prevTranslate
    container.style.cursor = 'grabbing'
    if (screen.width > 768) {
      dragStart.play()
    }
  }

  function onMove(e) {
    if (!isDragging) return
    const x = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX
    currentTranslate = x - startX

    const maxTranslate = 0
    const minTranslate = container.offsetWidth - (track.scrollWidth + window.innerWidth * 0.5)

    currentTranslate = clamp(currentTranslate, minTranslate, maxTranslate)
    setTranslate(currentTranslate)
  }

  function onEnd() {
    isDragging = false
    prevTranslate = currentTranslate
    container.style.cursor = 'grab'
    if (screen.width > 768) {
      reverseTimelineIfAtStart()
    }
  }

  container.addEventListener('mousedown', onStart)
  window.addEventListener('mousemove', onMove)
  window.addEventListener('mouseup', onEnd)

  container.addEventListener('touchstart', onStart)
  container.addEventListener('touchmove', onMove)
  container.addEventListener('touchend', onEnd)
}

export function teamViewAnimations() {
  // Get the sidebar and footer elements
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
}
