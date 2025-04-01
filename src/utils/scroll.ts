import { isBrowser } from 'utils/is-browser'
import { WatchedValue } from './WatchedValue'

let lockerStack = 0

let body: HTMLElement | null = null
let html: HTMLElement | null = null

if (isBrowser) {
  body = document.body
  html = document.documentElement
}

const bodyLockClass = 'body-scroll-lock'
const htmlLockClass = 'html-scroll-lock'

export const getScroll = () =>
  window.pageYOffset ||
  document.documentElement.scrollTop ||
  document.body.scrollTop ||
  0

export const scrollState = {
  pos: 0,
}

export const scrollPos = new WatchedValue(0)

let savedScroll = 0

const handleScroll = () => {
  scrollState.pos = lockerStack > 0 ? savedScroll : getScroll()
  scrollPos.set(scrollState.pos)
}

export const scrollTo = (y: number) => {
  if (!body) return
  if (lockerStack) {
    body.style.top = `-${y}px`
    scrollPos.set(y)
    savedScroll = y
  } else {
    window.scrollTo(0, y)
  }
}

if (isBrowser) {
  handleScroll()
  window.addEventListener('scroll', handleScroll)
}

// Scroll Locker
export const lockScroll = () => {
  if (!body || !html) return
  if (++lockerStack > 1) return
  const scroll = scrollPos.value
  savedScroll = scroll
  body.classList.add(bodyLockClass)
  html.classList.add(htmlLockClass)
  body.style.top = `-${scroll}px`
}

// Scroll Unlocker
export const unlockScroll = () => {
  if (!body || !html) return
  if (--lockerStack > 0) return
  body.classList.remove(bodyLockClass)
  html.classList.remove(htmlLockClass)
  body.style.top = ''
  window.scrollTo(0, savedScroll)
}
