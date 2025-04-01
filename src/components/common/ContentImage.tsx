import { useMounted } from 'hooks/useMounted'
import { useWindowSize } from 'hooks/useWindowSize'
import { ease } from 'utils/easings'
import useMeasure from 'react-use-measure'
import { clamp } from 'utils/clamp'
import { cns } from 'utils/classnames'
import { normalize } from 'utils/normalize'

type Props = {
  src: string
  coeff?: number
  className?: string
}

export const ContentImage = ({ src, coeff = 0.8, className }: Props) => {
  const isMounted = useMounted()
  const [winX, winY] = useWindowSize()
  const [refWrap, sizeWrap] = useMeasure({ scroll: true })
  const [refImage, sizeImage] = useMeasure()

  const progNorm = normalize(
    (sizeWrap.top - winY) * -1,
    0,
    sizeWrap.height + winY,
  )
  const progClamped = clamp(progNorm, 0, 1)
  const prog = ease.easeInOutSine(progClamped)
  const offset = sizeImage.height - sizeImage.height * coeff
  const transform = `translateY(-${prog * offset}px)`

  return (
    <div className="my-[60px]">
      <div
        ref={refWrap}
        className="overflow-hidden"
        style={{
          height: isMounted ? sizeImage.height * coeff : 'auto',
        }}
      >
        <img
          ref={refImage}
          className={cns('block h-auto w-full max-w-full', className)}
          src={src}
          alt=""
          style={isMounted ? { transform } : {}}
        />
      </div>
    </div>
  )
}
