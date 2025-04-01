import { memo } from 'react'
import { usePosition } from 'hooks/usePosition'
import { useScrollPosition } from 'hooks/useScrollPosition'
import { useWindowSize } from 'hooks/useWindowSize'
import { useMounted } from 'hooks/useMounted'

import { cns } from 'utils/classnames'
import { storiesData } from './storiesData'
import { ease } from 'utils/easings'
import { narrow } from 'utils/math'

export const Stories = () => {
  const isMounted = useMounted()
  const scrollPos = useScrollPosition()
  const [refWrap, rect] = usePosition<HTMLDivElement>()
  const [winW, winH] = useWindowSize()

  const top = rect.top - scrollPos
  const oneLength = winH
  const prog = (top - oneLength) / -rect.height
  const onePath = 1 / storiesData.length

  return (
    <div
      ref={refWrap}
      className="relative w-full bg-[#fff]"
      style={{ height: `${storiesData.length * 100}vh` }}
    >
      <div
        className={cns('sticky top-0 left-0 h-screen w-full overflow-hidden')}
      >
        {storiesData.map((story, i) => {
          const nextProg =
            i < storiesData.length - 1
              ? ease.easeOutQuad(
                  narrow((i + 1) * onePath, (i + 2) * onePath, prog),
                )
              : 0
          const oneProg = ease.easeOutQuad(
            narrow(i * onePath, (i + 1) * onePath, prog),
          )
          return (
            <div
              key={i}
              className={cns('absolute top-[0] left-[0] h-screen w-full')}
              style={
                isMounted && i > 0
                  ? { transform: `translateX(${(1 - oneProg) * 100}%)` }
                  : {}
              }
            >
              {i < storiesData.length - 1 && (
                <div
                  className="pointer-events-none absolute top-[0] left-0 h-full w-full bg-[#000] opacity-0"
                  style={isMounted ? { opacity: nextProg * 0.6 } : {}}
                ></div>
              )}
              <Story story={story} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

const Story = memo(({ story }: { story: (typeof storiesData)[0] }) => {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[#fff] text-left">
      <div className="flex max-w-[1040px] p-[40px]">
        <div className="mr-[40px] w-[240px]">
          <img
            src={story.portrait}
            className="mb-[40px] block h-[240px] w-[240px] rounded-[50%]"
            alt=""
          />
          <div className="mb-[20px] text-[24px] leading-tight font-bold">
            {story.name}
          </div>
          <div className="text-[18px] leading-[1.56]">{story.bio}</div>
        </div>
        <div className="w-[680px]">
          <div className="mb-[2vh] text-[42px] font-bold">{story.title}</div>
          <div className="relative pl-[35px] text-[18px] leading-[1.56] font-bold">
            <div className="absolute top-[4px] left-[0] mr-[10px] h-[20px] w-[20px] rounded-[50%] bg-[#000]"></div>
            {story.text}
          </div>
        </div>
      </div>
    </div>
  )
})
