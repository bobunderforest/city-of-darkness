import useMeasure from 'react-use-measure'
import { useMounted } from 'hooks/useMounted'

import { cns } from 'utils/classnames'
import { clamp } from 'utils/clamp'
import { normalize } from 'utils/normalize'
import { ease } from 'utils/easings'

type Props = {
  src: string
  distance?: number
  className?: string
}

export const ContentPanorama = ({ src, distance = 2500, className }: Props) => {
  const isMounted = useMounted()

  const [refWrap, sizeWrap] = useMeasure({ scroll: true })
  const [refImage, sizeImage] = useMeasure()
  const progNorm = normalize(
    sizeWrap.top * -1,
    0,
    sizeWrap.height - sizeImage.height,
  )
  const progClamped = clamp(progNorm, 0, 1)
  const prog = ease.easeInOutQuad(progClamped)
  const transform = `translateX(-${prog * (sizeImage.width - sizeWrap.width)}px)`

  return (
    <div ref={refWrap} className="relative mb-[100px] min-h-screen w-full">
      <div className="v w-ful sticky top-0 left-0 overflow-hidden">
        <img
          ref={refImage}
          className={cns(
            'block h-screen [max-width:initial!important]',
            className,
          )}
          style={isMounted ? { transform } : {}}
          src={src}
          alt=""
        />
      </div>
      <div style={{ height: distance }}></div>
    </div>
  )
}
