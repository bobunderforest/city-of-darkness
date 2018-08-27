import 'vendor/numeric.min.js'
import { Vector, vec } from 'utils/Vector'
import initialState from 'utils/initialState'
import { getTransform } from 'utils/matrixTransform'
import bgMask from 'utils/mask'
require('vendor/parlin-noise')
const noise = (window as any).noise

const img = new Image()
img.src = 'http://ucraft.neekeesh.com/img/bg.jpg'

export const minmax = (min: number, value: number, max: number) =>
  Math.max(min, Math.min(max, value))

export interface TextDrawing {
  dur: number
  delay: number
  path: Vector[][]
  text: string
}

export interface State {
  bgH: number
  bgW: number
  debugMode: boolean
  hlRadius: number
  mouse: Vector
  mouseLeaved: number | null
  textDrawings: TextDrawing[]
  winH: number
  winW: number
}

export class Intro {
  canvas: HTMLCanvasElement
  darknessCanvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  darknessCtx: CanvasRenderingContext2D
  intoBody: HTMLElement
  // letters: TextProgs[]
  renderHooks: ((t: number) => void)[] = []
  scale: number =
    typeof window.devicePixelRatio === 'number' ? window.devicePixelRatio : 1

  state: State = {
    bgH: 1000,
    bgW: 1491,
    debugMode: false,
    hlRadius: 100,
    mouse: vec(0, 0),
    mouseLeaved: null,
    textDrawings: initialState,
    winH: -1,
    winW: -1,
  }

  constructor() {
    // this.letters = []
    this.intoBody = document.querySelector('.kwc-intro-body') as HTMLElement
    this.canvas = document.querySelector(
      '.kwc-intro-canvas',
    ) as HTMLCanvasElement
    this.darknessCanvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
    this.darknessCtx = this.darknessCanvas.getContext(
      '2d',
    ) as CanvasRenderingContext2D

    window.addEventListener('resize', () => {
      this.updateSizes()
      this.renderLetters()
    })

    window.addEventListener('mousemove', e => {
      this.state.mouse = vec(e.pageX, e.pageY)
    })

    this.canvas.addEventListener('mousemove', e => {
      if (this.state.mouseLeaved) this.state.mouseLeaved = null
    })

    this.canvas.addEventListener(
      'mouseleave',
      e => (this.state.mouseLeaved = Date.now()),
    )

    this.canvas.addEventListener(
      'touchmove',
      e => (this.state.mouse = vec(e.touches[0].pageX, e.touches[0].pageY)),
    )

    this.updateSizes()
    this.renderLetters()

    this.ctx.imageSmoothingEnabled = true
    this.darknessCtx.imageSmoothingEnabled = true

    noise.seed(Math.random())

    window.requestAnimationFrame(this.renderRaf)
  }

  renderRaf = (time: number) => {
    const ctx = this.ctx
    const { winW: w, winH: h } = this.state

    ctx.save()
    if (this.scale !== 1) ctx.scale(this.scale, this.scale)
    ctx.clearRect(0, 0, w, h)

    if (img.complete) {
      const { diffX, diffY, scale } = this.getRatiosDiffs()
      const sc = 1 / scale
      ctx.drawImage(
        img,
        -diffX * sc,
        -diffY * sc,
        img.width * sc,
        img.height * sc,
      )
    }

    if (!this.state.debugMode) this.renderDarkness(time)

    this.renderHooks.forEach(hook => hook(time))
    ctx.restore()

    window.requestAnimationFrame(this.renderRaf)
  }

  renderDarkness(time: number) {
    const ctx = this.darknessCtx

    const { winW: w, winH: h, mouse, hlRadius, mouseLeaved } = this.state

    const now = Date.now()
    const n = noise.simplex3(0, 0, (time % 5000) / 300)

    ctx.save()
    if (this.scale !== 1) ctx.scale(this.scale, this.scale)
    ctx.clearRect(0, 0, w, h)

    ctx.beginPath()
    bgMask.forEach((d, i) => {
      const { x, y } = this.restoreVec(d)
      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    })
    ctx.closePath()
    ctx.clip()
    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, w, h)

    const r = hlRadius - hlRadius * n * 0.01

    ctx.beginPath()
    var g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, r)

    g.addColorStop(1, 'rgba(255,255,255,0)')
    g.addColorStop(0.95, 'rgba(255,255,255,1)')
    g.addColorStop(0, 'rgba(255,255,255,1)')

    ctx.globalAlpha = minmax(
      0,
      1 - (mouseLeaved ? minmax(0, now - mouseLeaved, 200) / 200 : n * 0.2),
      1,
    )
    ctx.fillStyle = g
    ctx.globalCompositeOperation = 'xor'

    ctx.fillRect(mouse.x - r, mouse.y - r, r * 2, r * 2)

    ctx.restore()

    ctx.globalAlpha = 0.8
    this.ctx.globalCompositeOperation = 'multiply'
    this.ctx.drawImage(this.darknessCanvas, 0, 0, w, h)
  }

  measureText(text: string, size: number) {
    const textMeasure = document.createElement('div')
    textMeasure.classList.add('kwc-intro-text')
    textMeasure.textContent = text
    textMeasure.style.fontSize = size + 'px'
    textMeasure.style.position = 'absolute'
    textMeasure.style.visibility = 'hidden'
    document.body.appendChild(textMeasure)
    const textW = textMeasure.clientWidth
    document.body.removeChild(textMeasure)
    return textW
  }

  renderLetters = () => {
    const rv = this.restoreVec
    this.intoBody.innerHTML = ''

    this.state.textDrawings.forEach((itm, i) => {
      let globH = 0
      itm.path.forEach((p, j) => {
        const h = rv(p[1]).y - rv(p[0]).y
        globH += h
      })

      // Boxes where texts goes
      const stopBoxes = itm.path.slice(0, -1).map((p, j) => {
        const p1 = rv(p[0])
        const p2 = rv(p[1])
        const np1 = rv(itm.path[j + 1][0])
        const np2 = rv(itm.path[j + 1][1])
        const { x: x1, y: y1 } = p1
        const { x: x2, y: y2 } = p2
        const { x: nx1, y: ny1 } = np1
        const { x: nx2, y: ny2 } = np2
        return { x1, y1, x2, y2, nx1, ny1, nx2, ny2, p1, p2, np1, np2 }
      })

      let pathLength = 0
      let currOffset = 0

      const widths: number[] = []
      // const speedsCoeffs: number[] = []
      // const speeds: number[] = []

      stopBoxes.forEach(({ x1, y1, x2, y2, nx1, ny1, nx2, ny2 }, j) => {
        const w = nx1 - x1
        widths.push(w)
        pathLength += w
      })

      // stopBoxes.forEach(({ x1, y1, x2, y2, nx1, ny1, nx2, ny2 }, j) => {})

      globH /= itm.path.length
      globH *= 0.75
      const textW = this.measureText(itm.text, globH)
      pathLength += textW
      currOffset = textW

      stopBoxes.forEach(
        ({ x1, y1, x2, y2, nx1, ny1, nx2, ny2, p1, np1, p2, np2 }, j) => {
          const w = nx1 - x1

          // const h1 = y2 - y1
          // const h2 = ny2 - ny1
          // const h = (h1 + h2) / 2

          const h = globH

          // Perspective
          const perspective = document.createElement('div')
          perspective.classList.add('kwc-intro-text-perspective')
          perspective.style.width = w + 'px'
          perspective.style.height = h + 'px'
          const matrix = getTransform(
            [vec(0, 0), vec(w, 0), vec(0, h), vec(w, h)],
            [p1, np1, p2, np2],
          )
          perspective.style.transform = `matrix3d(${matrix})`

          // Text
          const text = document.createElement('div')
          text.classList.add('kwc-intro-text')
          text.textContent = itm.text
          text.style.fontSize = h + 'px'

          // Mover
          const textMover = document.createElement('div')
          textMover.classList.add('kwc-intro-text-mover')
          textMover.style.width = pathLength + 'px'
          textMover.style.left = -currOffset + 'px'
          textMover.style.animationDuration = itm.dur + 's'
          textMover.style.animationDelay = itm.delay + 's'

          // Appends
          textMover.appendChild(text)
          perspective.appendChild(textMover)
          this.intoBody.appendChild(perspective)

          // Next offset
          currOffset += w
        },
      )
    })
  }

  updateSizes = () => {
    const rootEl =
      document.compatMode === 'BackCompat'
        ? document.body
        : document.documentElement
    const h = Math.min(rootEl.clientHeight, window.innerHeight)
    const w = rootEl.clientWidth

    this.state.winW = w
    this.state.winH = h

    this.scale =
      typeof window.devicePixelRatio === 'number' ? window.devicePixelRatio : 1

    const canvases = [
      { c: this.canvas, ctx: this.ctx },
      { c: this.darknessCanvas, ctx: this.darknessCtx },
    ]
    canvases.forEach(({ c, ctx }) => {
      c.style.width = w + 'px'
      c.style.height = h + 'px'

      c.width = w * this.scale
      c.height = h * this.scale

      c.style.width = w + 'px'
      c.style.height = h + 'px'
    })

    this.state.hlRadius = Math.max(w / 7, h / 7)
  }

  getRatiosDiffs = () => {
    const { winW, winH, bgW, bgH } = this.state

    const winR = winW / winH
    const bgR = bgW / bgH

    const scale = winR < bgR ? bgH / winH : bgW / winW

    const diffX = (bgW - winW * scale) / 2
    const diffY = (bgH - winH * scale) / 2

    return { diffX, diffY, scale }
  }

  saveVec = (v: Vector) => {
    const { diffX, diffY, scale } = this.getRatiosDiffs()
    const x = scale * v.x + diffX
    const y = scale * v.y + diffY
    return vec(x, y)
  }

  restoreVec = (v: Vector) => {
    const { diffX, diffY, scale } = this.getRatiosDiffs()
    const x = (1 / scale) * (v.x - diffX)
    const y = (1 / scale) * (v.y - diffY)
    return vec(x, y)
  }
}
