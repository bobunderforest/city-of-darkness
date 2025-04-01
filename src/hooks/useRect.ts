import { useLayoutEffect, useState } from 'react'

export const useRect = (ref: React.RefObject<HTMLElement | null>) => {
  const [rect, setRect] = useState(getRect(ref ? ref.current : null))

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    const handleResize = () => {
      setRect(getRect(el))
    }

    handleResize()

    if (typeof ResizeObserver === 'function') {
      let resizeObserver: ResizeObserver | null = new ResizeObserver(() =>
        handleResize(),
      )
      resizeObserver.observe(el)
      return () => {
        if (!resizeObserver) return
        resizeObserver.disconnect()
        resizeObserver = null
      }
    } else {
      window.addEventListener('resize', handleResize)
      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [ref.current])

  return rect
}

function getRect(element: HTMLElement | null | undefined) {
  if (!element) {
    return {
      bottom: 0,
      height: 0,
      left: 0,
      right: 0,
      top: 0,
      width: 0,
    }
  }

  return element.getBoundingClientRect()
}
