import { getPosition } from 'utils/getPosition'
import { useLayoutEffect, useRef, useState } from 'react'

export const usePosition = <E extends HTMLElement = HTMLElement>(
  refProp?: React.RefObject<E | null>,
) => {
  const ref = useRef<E | null>(null)
  const [rect, setRect] = useState(
    calcPosition(refProp ? refProp.current : ref.current),
  )

  useLayoutEffect(() => {
    const el = refProp ? refProp.current : ref.current
    if (!el) return

    const handleResize = () => {
      setRect(calcPosition(el))
    }

    handleResize()

    if (typeof ResizeObserver === 'function') {
      let resizeObserver: ResizeObserver | null = new ResizeObserver(() =>
        handleResize(),
      )
      resizeObserver.observe(el)
      resizeObserver.observe(document.body)
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

  return [refProp || ref, rect] as const
}

function calcPosition(element: HTMLElement | null | undefined) {
  if (!element) {
    return {
      left: 0,
      top: 0,
      height: 0,
    }
  }

  return getPosition(element)
}
