import { useEffect, useRef, useState, createContext, useContext } from 'react'
import { useWindowSize } from 'hooks/useWindowSize'
import { useScrollPosition } from 'hooks/useScrollPosition'

import { cns } from 'utils/classnames'
import { measureText } from 'utils/measureText'
import { fontobserver } from 'utils/fontObserver'

const letterWrapperContext = createContext<{
  textW: number
  repeats: number
  text: string
} | null>(null)

export const LetterWrapper = ({
  text,
  className,
  children,
}: React.PropsWithChildren & { text: string; className?: string }) => {
  const [textW, setTextW] = useState(0)
  const [winW] = useWindowSize()

  useEffect(() => {
    const fontObserver = fontobserver
    fontObserver.then(() => {
      const textW = measureText(
        `${text}&nbsp;&nbsp;`,
        'text-[calc(100vw/13)] uppercase',
      )
      setTextW(textW)
    })
  }, [winW])

  const repeats = textW && Math.ceil(winW / textW) * 2

  return (
    <div className={cns('relative mx-[auto] my-0 w-full', className)}>
      <letterWrapperContext.Provider value={{ textW, repeats, text }}>
        {children}
      </letterWrapperContext.Provider>
      <div className="relative w-full pb-[35%]" />
    </div>
  )
}

export const LetterText = ({
  className,
}: React.PropsWithChildren & {
  className?: string
}) => {
  const refWrap = useRef<HTMLDivElement | null>(null)
  const scrollPosition = useScrollPosition()
  const { textW, repeats, text } = useContext(letterWrapperContext)!

  const fullW = textW * repeats
  const pos = (scrollPosition * 0.5) % textW
  const offset = (refWrap.current?.offsetLeft || 0) - pos + fullW / 2
  const transform = `translateX(${-offset}px)`

  return (
    <div
      ref={refWrap}
      className={cns(
        'absolute h-full origin-[0_0] overflow-hidden text-[calc(100vw/13)] leading-none font-bold whitespace-nowrap uppercase',
        className,
      )}
    >
      <div className="relative flex" style={{ transform }}>
        {Array.from(Array(repeats)).map((_, i) => (
          <LetterTextItem key={i}>{text}&nbsp;&nbsp;</LetterTextItem>
        ))}
      </div>
    </div>
  )
}

export const LetterTextItem = ({
  className,
  children,
}: React.PropsWithChildren & { className?: string }) => {
  return (
    <div className={cns('relative w-[fit-content]', className)}>{children}</div>
  )
}

export const LetterImage = ({
  src,
  className,
}: {
  src: string
  className?: string
}) => (
  <img
    src={src}
    className={cns(
      'pointer-events-none absolute top-[0] left-[0] block !w-full',
      className,
    )}
    alt=""
  />
)
