import { useMounted } from 'hooks/useMounted'
import { useWindowSize } from 'hooks/useWindowSize'
import { ease } from 'utils/easings'
import { minmax } from 'utils/math'
import useMeasure from 'react-use-measure'
import { clamp } from 'utils/clamp'

type Props = {
  src: string
}

export const ArchitecturePlans = ({ src }: Props) => {
  const isMounted = useMounted()
  const [w, h] = useWindowSize()
  const [refWrap, sizeWrap] = useMeasure()
  const [refImage, sizeImage] = useMeasure({ scroll: true })
  const { bottom, height, width } = sizeImage
  const progClamped = clamp(-(bottom - h - 60) / (h - height - 60), 0, 1)
  const prog = ease.easeInOutSine(progClamped)
  const transform = `translateX(-${prog * (width - sizeWrap.width)}px)`

  return (
    <div ref={refWrap} className="max-w-full bg-[#000] px-[0] py-[80px]">
      <div className="relative mx-[auto] my-[0] w-full">
        <img
          ref={refImage}
          src={src}
          alt=""
          className="relative block !max-w-none"
          style={isMounted ? { transform } : {}}
        />
      </div>
    </div>
  )
}
