import { useState, useEffect } from 'react'
import { isBrowser } from 'utils/is-browser'

export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState<number>(
    isBrowser ? window.scrollY : 0,
  )

  useEffect(() => {
    let ticking = false

    const updatePosition = () => {
      ticking = false
      setScrollPosition(window.scrollY)
    }

    const handleScroll = () => {
      if (!ticking) {
        ticking = true
        window.requestAnimationFrame(updatePosition)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return scrollPosition
}
