import { cns } from 'utils/classnames'

type Props = {
  className?: string
}

export const ContentDivider = ({ className }: Props) => (
  <div
    className={cns(
      'mx-[0] my-[100px] h-[3px] w-full bg-[currentColor]',
      className,
    )}
  />
)
