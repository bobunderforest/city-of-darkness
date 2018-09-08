import measureText from 'utils/measureText'
import { dewi } from 'utils/fontObserver'
import scroll from 'utils/scroll'

const letters = document.querySelectorAll('.kwc-letter')

// const genTexts = (text: string, n: number) => {
//   const mover = document.createElement('div')
//   mover.classList.add('kwc-title-mover')
//   mover.innerHTML = Array.from(Array(n))
//     .map(() => `<div class="kwc-title-text">${text}</div>`)
//     .join('')
//   return mover
// }

let scrollers: (() => void)[] = []
let lastRenderedScroll = 0

const render = () => {
  scrollers = []

  const rootEl =
    document.compatMode === 'BackCompat'
      ? document.body
      : document.documentElement
  // const winH = Math.min(rootEl.clientHeight, window.innerHeight)
  const winW = rootEl.clientWidth

  if (letters) {
    letters.forEach((letter: HTMLDivElement, i) => {
      const text = String(letter.dataset.text) + '&nbsp;&nbsp;'
      const textsWraps = letter.querySelectorAll('.kwc-letter-text')

      const textW = measureText(text, 'kwc-letter-text')
      const repeats = Array.from(Array(Math.ceil(winW / textW) * 2))
      const fullText = [...repeats].map(() => text).join('')

      const textEls = Array.from(textsWraps).map(() => {
        const el = document.createElement('div')
        el.classList.add('kwc-letter-text-itm')
        el.innerHTML = fullText
        return el
      })

      textsWraps.forEach((el: HTMLDivElement, i) => {
        el.innerHTML = ''
        el.appendChild(textEls[i])
      })

      const handleScroll = () => {
        const pos = (scroll.pos * 0.85) % textW

        textsWraps.forEach((el: HTMLDivElement, i) => {
          const textEl = textEls[i]
          const offset = el.offsetLeft - pos + textEl.clientWidth / 2
          textEl.style.transform = `translateX(-${offset}px)`
        })
      }

      handleScroll()
      scrollers[i] = handleScroll
    })
  }
}

dewi.load().then(() => {
  render()
})

window.addEventListener('resize', render)

const raf = () => {
  if (lastRenderedScroll !== scroll.pos) {
    scrollers.forEach(s => s())
    lastRenderedScroll = scroll.pos
  }
  window.requestAnimationFrame(raf)
}

window.requestAnimationFrame(raf)

// Navigation related js
const anime = require('vendor/anime');

console.log(anime);


const navBtn = document.querySelector('.nav-btn');
const menu = document.querySelector('.kwc-menu');

const menuCols = document.querySelectorAll('.menu-col');

function animateLines() {
  anime({
    target: menuCols,
    opacity: 1,
    duration: 600,
    easing: 'easeInOutQuart'
  })
}

if (navBtn !== null && menu !== null) {
  navBtn.addEventListener('click', function name() {
    if (menu.classList.contains('open')) {
      menu.classList.remove('open');
      return;
    }
    menu.classList.add('open');
    animateLines();
  })
}
