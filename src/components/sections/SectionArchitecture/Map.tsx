import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useWindowSize } from 'hooks/useWindowSize'
import { useScrollPosition } from 'hooks/useScrollPosition'
import { useMounted } from 'hooks/useMounted'

import { cns } from 'utils/classnames'
import { vec, type Vector } from 'utils/Vector'
import { clamp } from 'utils/clamp'
import { normalize } from 'utils/normalize'

import MapSVG from 'assets/img/map.svg?react'

const W = 1403
const H = 955
const MIN_ZOOM = 1
const MAX_ZOOM = 3

const texts: { [key: string]: string } = {
  church: 'Tin Hau Temple',
  school: 'Primary school',
  olds: 'Senior center',
  yamen: 'Yamen Temple',
  hospital: 'Clinic',
  well: 'Well',
}

type Props = {}

export const Map = ({}: Props) => {
  const isMounted = useMounted()
  const [w, h] = useWindowSize()
  const scrollPos = useScrollPosition()

  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const mapMoverRef = useRef<HTMLDivElement | null>(null)
  const mapInRef = useRef<HTMLDivElement | null>(null)

  // Calculate “scale”
  const scale = useMemo((): number => {
    const winR = w / h
    const bgR = W / H
    return winR > bgR ? H / h : W / w
  }, [w, h])

  // Zoom controls
  const [zoom, setZoom] = useState<number>(1.1)

  const addZoom = useCallback(
    (z: number) => setZoom((prev) => clamp(prev + z, MIN_ZOOM, MAX_ZOOM)),
    [setZoom],
  )
  const zoomIn = useCallback(() => addZoom(0.4), [addZoom])
  const zoomOut = useCallback(() => addZoom(-0.4), [addZoom])

  const [isBarDown, setIsBarDown] = useState<boolean>(false)
  const handleZoomBarMouseDown = useCallback(() => setIsBarDown(true), [])
  const handleZoomBarMouseUp = useCallback(() => setIsBarDown(false), [])
  const handleZoomBarMouseLeave = useCallback(() => setIsBarDown(false), [])
  const handleZoomBarMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isBarDown) return
      const barRect = e.currentTarget.getBoundingClientRect()
      const yPos = e.pageY - scrollPos - barRect.top
      const normalized = 1 - yPos / barRect.height
      const newZoom = normalized * (MAX_ZOOM - MIN_ZOOM) + MIN_ZOOM
      setZoom(clamp(newZoom, MIN_ZOOM, MAX_ZOOM))
    },
    [isBarDown, scrollPos],
  )

  // Dragging/panning
  const [mouse, setMouse] = useState<Vector>(vec(0, 0))

  const refState = useRef({
    isDown: false,
    downTime: 0,
    downAt: vec(0, 0),
    downOffset: vec(0, 0),
    offset: vec(0.5, 0.5),
  })

  const handleMouseUp = useCallback(() => (refState.current.isDown = false), [])
  const handleMouseLeave = useCallback(
    () => (refState.current.isDown = false),
    [],
  )

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const state = refState.current
      state.isDown = true

      const x = e.pageX
      const topOffset =
        (mapContainerRef.current?.getBoundingClientRect().top ?? 0) + scrollPos
      const y = e.pageY - topOffset

      state.downAt = vec(x, y)
      state.downOffset = vec(state.offset.x, state.offset.y)

      const now = Date.now()
      if (now - state.downTime < 200) {
        if (e.button === 0) {
          zoomIn()
        } else if (e.button === 2) {
          zoomOut()
        }
      }
      state.downTime = now
    },
    [scrollPos, zoomIn, zoomOut],
  )

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const state = refState.current

      const x = e.pageX
      const topOffset =
        (mapContainerRef.current?.getBoundingClientRect().top ?? 0) + scrollPos
      const y = e.pageY - topOffset

      if (state.isDown) {
        const dx = (x - state.downAt.x) / w
        const dy = (y - state.downAt.y) / h
        state.offset = vec(state.downOffset.x - dx, state.downOffset.y - dy)
      }

      setMouse(vec(x, y))
    },
    [w, h, scrollPos],
  )

  // Prevent right-click context menu
  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
  }, [])

  // Tooltips
  const [tooltipId, setTooltipId] = useState('')
  const [wells, setWells] = useState<{ x: string; y: string }[]>([])

  useEffect(() => {
    if (!mapMoverRef.current) return
    const container = mapMoverRef.current
    const hoverEls = container.querySelectorAll<SVGElement>('.kwc-map-hover')

    const enterHandler = (id: string) => () => {
      setTooltipId(id.replace('kwc-map-', ''))
    }
    const leaveHandler = (id: string) => () => setTooltipId('')

    const wells: { x: string; y: string }[] = []

    hoverEls.forEach((el) => {
      const id = el.getAttribute('id') || ''
      el.addEventListener('mouseenter', enterHandler(id))
      el.addEventListener('mouseleave', leaveHandler(id))

      if (id === 'kwc-map-well') {
        const x = Number(el.getAttribute('cx')) / W
        const y = Number(el.getAttribute('cy')) / H
        wells.push({
          x: x * 100 + '%',
          y: y * 100 + '%',
        })
      }
    })

    setWells(wells)

    return () => {
      hoverEls.forEach((el) => {
        const id = el.getAttribute('id') || ''
        el.removeEventListener('mouseenter', enterHandler(id))
        el.removeEventListener('mouseleave', leaveHandler(id))
      })
    }
  }, [isMounted])

  const state = refState.current

  return (
    <div
      ref={mapContainerRef}
      className="relative h-[120vh] w-full bg-[#000] select-none"
    >
      {/* The actual map + SVG */}
      <div
        ref={mapInRef}
        className={cns(
          'relative top-[0] left-[0] h-full w-full cursor-grab overflow-hidden',
          state.isDown && 'cursor-grabbing',
        )}
      >
        {isMounted && (
          <div
            className="absolute top-2/4 left-2/4 origin-center overflow-hidden"
            ref={mapMoverRef}
            style={{
              width: W * (1 / scale),
              height: H * (1 / scale),
              transform: `translate(${-state.offset.x * 100}%, ${-state.offset.y * 100}%) scale(${zoom})`,
            }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            onContextMenu={handleContextMenu}
          >
            <MapSVG className="block h-auto w-full" />

            {/* Wells */}
            <div className="pointer-events-none absolute top-[0] left-[0] h-full w-full">
              {wells.map((item, i) => (
                <div
                  style={{ left: item.x, top: item.y }}
                  key={i}
                  className="relative"
                >
                  {Array.from(Array(4)).map((_, j) => (
                    <div
                      key={j}
                      className="absolute -top-[30px] -left-[30px] h-[60px] w-[60px] origin-center animate-[kwc-map-wave_2s_infinite_linear] rounded-[50%] border-[3px] border-[#fff] [animation-fill-mode:both]"
                      style={{ animationDelay: j / 2 + 's' }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Tooltip */}
      {tooltipId && (
        <div
          style={{
            transform: `translate(${mouse.x + 5}px, ${mouse.y + 15}px)`,
          }}
          className="pointer-events-none absolute top-[0] left-[0] bg-[#000] px-[15px] py-[10px] text-[14px] text-[#fff]"
        >
          {texts[tooltipId]}
        </div>
      )}

      {/* Zoom Controls */}
      <div className="absolute top-2/4 right-[3vw] mt-[calc(-10vh-40px)] opacity-[0.85]">
        <ZoomControl className="kwc-map-zoom-in" onClick={zoomIn}>
          +
        </ZoomControl>
        <div
          className="relative h-[20vh] cursor-pointer overflow-hidden"
          onMouseDown={handleZoomBarMouseDown}
          onMouseUp={handleZoomBarMouseUp}
          onMouseMove={handleZoomBarMouseMove}
          onMouseLeave={handleZoomBarMouseLeave}
        >
          <div className="absolute top-[0] left-2/4 -ml-[2px] h-full w-[4px] bg-[#fff]" />
          <div
            style={{
              top: `${(1 - normalize(zoom, MIN_ZOOM, MAX_ZOOM)) * 100}%`,
            }}
            className="absolute top-[0] left-2/4 -mt-[6px] -ml-[6px] h-[12px] w-[12px] bg-[#fff]"
          />
        </div>
        <ZoomControl className="kwc-map-zoom-out" onClick={zoomOut}>
          -
        </ZoomControl>
      </div>
    </div>
  )
}

const ZoomControl = ({
  className,
  onClick,
  children,
}: React.PropsWithChildren & {
  className: string
  onClick: () => void
}) => (
  <div
    onClick={onClick}
    className={cns(
      'relative flex h-[20px] w-[20px] cursor-pointer items-center justify-center border-[2px] border-[#fff] p-[20px] text-[30px] leading-0 font-medium text-[#fff] uppercase',
      className,
    )}
  >
    {children}
  </div>
)
