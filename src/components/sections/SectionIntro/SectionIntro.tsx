import { useEffect, useRef } from 'react'
import { Intro } from './Intro'

type Props = {
  onCreate?: (kwcIntro: Intro) => void
}

export const SectionIntro = ({ onCreate }: Props) => {
  const refCanvas = useRef<HTMLCanvasElement | null>(null)
  const refIntroBody = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const kwcIntro = new Intro(refIntroBody.current!, refCanvas.current!, {
      text: 'relative leading-none font-extrabold text-left opacity-80',
      textChineese:
        'relative leading-none font-[TypefaceCustom] text-left font-normal tracking-widest opacity-80',
      textMover:
        'relative animate-infinite animate-ease-linear [animation-name:kwc-text-move]',
      textPerspective:
        'absolute top-[0] left-[0] text-[#fff] overflow-hidden origin-[0_0]',
    })
    onCreate?.(kwcIntro)
  }, [])

  return (
    <div
      className={
        "relative block h-screen w-full max-w-full overflow-hidden bg-[url('/img/photo/intro-background.jpg')] bg-cover bg-center"
      }
    >
      {/* Canvas */}
      <canvas ref={refCanvas} className="absolute top-0 left-0 block" />

      {/* Lights */}
      <div className="absolute top-0 left-0 h-full w-full bg-[url('/img/photo/dark.png')] bg-cover bg-center opacity-100" />

      {/* Body */}
      <div
        ref={refIntroBody}
        className="pointer-events-none h-screen w-full max-w-full"
      />

      {/* Shadow gradient */}
      <div className="pointer-events-none absolute bottom-0 left-0 h-[30vh] w-full bg-[linear-gradient(180deg,_rgba(0,_0,_0,_0)_40%,_#000000_100%)]"></div>
    </div>
  )
}
