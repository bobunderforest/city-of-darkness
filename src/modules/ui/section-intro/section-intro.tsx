import { useEffect, useRef } from 'react'
import { Intro } from './Intro'

export const SectionIntro = () => {
  const introEl = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ;(window as any).kwcIntro = new Intro()
  }, [])

  return (
    <>
      <div ref={introEl} className="kwc-intro"></div>
      <div className="kwc-intro__description">
        <div className="kwc-intro__description-inner">
          This city was so densely populated that daylight didn't reach it. It
          was formed on territory not controlled by any state within the
          boundaries of Hong Kong. Having become a real lair of anarchy, its
          very appearance inspired horror.
        </div>
      </div>
    </>
  )
}
