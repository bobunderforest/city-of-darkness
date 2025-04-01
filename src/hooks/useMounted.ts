import { useEffect, useState } from 'react'

export const useMounted = () => {
  const [isMounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  return isMounted
}
