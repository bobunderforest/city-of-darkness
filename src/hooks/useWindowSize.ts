import { useEffect, useState } from 'react'
import { isBrowser } from 'utils/is-browser'

const getSize = () =>
  [
    document.documentElement.clientWidth,
    document.documentElement.clientHeight,
  ] as const

export const useWindowSize = () => {
  const [size, setSize] = useState<readonly [number, number]>(
    !isBrowser ? [0, 0] : getSize(),
  )

  useEffect(() => {
    const handleResize = () => {
      setSize(getSize())
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return size
}
