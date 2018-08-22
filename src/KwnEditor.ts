import { Delegate } from './Delegate'
import { Vector } from './Vector'
import { KwnIntro, State } from './KwnIntro'

export interface ExtendedState extends State {
  debugMode: boolean
  isDown: boolean
  mouse: Vector
  movingItem: number | string
  selectedItem: number
}

export class KwnEditor {
  hierarchy: HTMLElement
  intro: KwnIntro
  propsWin: HTMLElement
  state: ExtendedState
  propsUpdate = new Delegate()
  hierarchyUpdate = new Delegate()
  wrap: HTMLElement

  sv = (x: number, y: number) => this.intro.saveVec(new Vector(x, y))

  constructor() {
    const intro = (this.intro = (window as any).kwnIntro as KwnIntro)
    const state = (this.state = intro.state as ExtendedState)

    intro.renderHooks.push(this.render)

    state.debugMode = true
    state.isDown = false
    state.mouse = new Vector(0, 0)
    state.selectedItem = -1

    this.loadStyles()
    this.wrap = this.createWindow(20, 20)
    this.hierarchy = this.createWindow(100, 20)
    this.propsWin = this.createWindow(window.innerWidth - 400, 60)

    this.renderHierarchy()
    this.hierarchyUpdate.subscribe(this.renderHierarchy)
    this.propsUpdate.subscribe(this.renderProps)

    intro.canvas.addEventListener('mousemove', e => {
      state.mouse = new Vector(e.pageX, e.pageY)
    })

    intro.canvas.addEventListener('mousedown', () => {
      state.isDown = true
    })

    intro.canvas.addEventListener('mouseup', () => {
      state.isDown = false
      state.movingItem = -1
      this.propsUpdate.fire()
    })

    const sv = this.sv

    // Text Button
    this.createButton({
      text: 'T',
      onClick: () => {
        const x = window.innerWidth / 2
        const y = window.innerHeight / 2
        state.drawings.push({
          pos: sv(x, y),
          text: 'LOLKEK',
          type: 'text',
          h: 30,
          path: [
            [sv(x, y), sv(x, y + 30)],
            [sv(x + 250, y), sv(x + 250, y + 30)],
            [sv(x + 400, y), sv(x + 400, y + 30)],
          ],
        })
        this.hierarchyUpdate.fire()
      },
    })

    this.createButton({
      text: 'G',
      onClick: () => (state.debugMode = !state.debugMode),
    })
  }

  loadStyles() {
    const style = document.createElement('link')
    style.rel = 'stylesheet'
    style.href = 'css/editor.css'
    document.head.appendChild(style)
  }

  createDrag(el: HTMLElement, x: number, y: number) {
    const dragEl = document.createElement('div')
    dragEl.classList.add('editor-drag')
    el.appendChild(dragEl)

    let isDown = false
    let offset = new Vector(0, 0)

    const drag = (x: number, y: number) => {
      el.style.left = x + 'px'
      el.style.top = y + 'px'
    }

    drag(x, y)

    dragEl.addEventListener('mousedown', e => {
      isDown = !isDown
      dragEl.classList.toggle('active', isDown)
      offset = new Vector(e.pageX - el.offsetLeft, e.pageY - el.offsetTop)
    })

    window.addEventListener('mousemove', e => {
      if (!isDown) return
      drag(e.pageX - offset.x, e.pageY - offset.y)
    })
  }

  createWindow(x: number, y: number) {
    const el = document.createElement('div')
    el.classList.add('editor-window')
    document.body.appendChild(el)
    this.createDrag(el, x, y)
    const content = document.createElement('div')
    content.classList.add('editor-content')
    el.appendChild(content)
    return content
  }

  createButton({ text, onClick }: { text: string; onClick: () => void }) {
    const textButton = document.createElement('div')
    textButton.classList.add('editor-button')
    textButton.textContent = text
    this.wrap.appendChild(textButton)
    textButton.addEventListener('click', onClick)
  }

  renderHierarchy = () => {
    this.hierarchy.innerHTML = ''
    this.state.drawings.forEach((itm, i) => {
      const el = document.createElement('div')
      el.textContent = `${itm.type} ${itm.text}`
      el.classList.add('editor-hierarchy-item')
      el.addEventListener('click', () => {
        this.state.selectedItem = i
        this.propsUpdate.fire()
      })
      this.hierarchy.appendChild(el)
    })
  }

  renderProps = () => {
    this.propsWin.innerHTML = ''
    const { selectedItem: i } = this.state
    if (i === -1) return
    const itm = this.state.drawings[i]
    switch (itm.type) {
      case 'text':
        itm.path.forEach((p, j) => {
          const grp = document.createElement('div')
          grp.classList.add('editor-props-grp')
          const x1 = document.createElement('input')
          const y1 = document.createElement('input')
          const x2 = document.createElement('input')
          const y2 = document.createElement('input')
          x1.value = String(p[0].x)
          y1.value = String(p[0].y)
          x2.value = String(p[1].x)
          y2.value = String(p[1].y)
          x1.type = 'number'
          y1.type = 'number'
          x2.type = 'number'
          y2.type = 'number'
          x1.addEventListener(
            'change',
            e => (p[0].x = Number((e.currentTarget as any).value)),
          )
          y1.addEventListener(
            'change',
            e => (p[0].y = Number((e.currentTarget as any).value)),
          )
          x2.addEventListener(
            'change',
            e => (p[1].x = Number((e.currentTarget as any).value)),
          )
          y2.addEventListener(
            'change',
            e => (p[1].y = Number((e.currentTarget as any).value)),
          )
          grp.appendChild(x1)
          grp.appendChild(y1)
          grp.appendChild(document.createElement('br'))
          grp.appendChild(x2)
          grp.appendChild(y2)

          this.propsWin.appendChild(grp)
          this.propsWin.appendChild(document.createElement('hr'))
        })

        const rm = document.createElement('div')
        rm.textContent = '-'
        rm.classList.add('editor-props-btn')
        this.propsWin.appendChild(rm)
        rm.addEventListener('click', () => {
          itm.path.splice(-1)
          this.propsUpdate.fire()
        })

        this.propsWin.appendChild(document.createElement('hr'))

        const add = document.createElement('div')
        add.textContent = '+'
        add.classList.add('editor-props-btn')
        this.propsWin.appendChild(add)
        add.addEventListener('click', () => {
          const x = this.intro.state.bgW / 2
          const y = this.intro.state.bgH / 2
          itm.path.push([new Vector(x, y), new Vector(x, y + 50)])
          this.propsUpdate.fire()
        })
    }
  }

  render = (time: number) => {
    const ctx = this.intro.ctx
    const state = this.state
    if (!state.debugMode) return

    const sv = this.sv
    const rv = this.intro.restoreVec

    state.drawings.forEach((itm, i) => {
      ctx.save()

      const mx = this.state.mouse.x
      const my = this.state.mouse.y

      switch (itm.type) {
        case 'text':
          // const h = this.intro.restoreH(itm.h)

          itm.path.forEach((p, j) => {
            const { x: x1, y: y1 } = rv(p[0])
            const { x: x2, y: y2 } = rv(p[1])

            if (j < itm.path.length - 1) {
              const { x: nx1, y: ny1 } = rv(itm.path[j + 1][0])
              const { x: nx2, y: ny2 } = rv(itm.path[j + 1][1])

              ctx.strokeStyle = '#fff'

              ctx.beginPath()
              ctx.moveTo(x1, y1)
              ctx.lineTo(nx1, ny1)
              ctx.stroke()

              ctx.beginPath()
              ctx.moveTo(x2, y2)
              ctx.lineTo(nx2, ny2)
              ctx.stroke()
            }

            ctx.beginPath()
            ctx.moveTo(x1, y1)
            ctx.lineTo(x2, y2)
            ctx.stroke()

            if (state.selectedItem === i) {
              ctx.beginPath()
              ctx.rect(x1, y1 - 20, 10, 10)
              ctx.fillStyle = '#fff'
              ctx.fill()

              if (
                state.isDown &&
                mx > x1 &&
                my > y1 - 20 &&
                mx < x1 + 10 &&
                my < y1 - 10
              ) {
                state.movingItem = `${i}-${j}`
              }

              if (state.movingItem === `${i}-${j}`) {
                const dot1 = sv(mx - 5, my + 15)
                const dot2 = sv(mx - 5, my + 15 + y2 - y1)
                state.drawings[i].path[j] = [dot1, dot2]
              }
            }
          })
      }
      ctx.restore()
    })
  }
}
