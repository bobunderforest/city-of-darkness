import { cns } from 'utils/classnames'

type Props = React.PropsWithChildren & {
  noMargin?: boolean
  fashion?: 'light' | 'dark'
  className?: string
}

export const ContentWrapper = ({
  children,
  noMargin,
  fashion = 'light',
  className,
}: Props) => {
  return (
    <div
      className={cns(
        !noMargin && 'pb-[200px]',
        fashion === 'dark' && 'bg-[#000] text-[#fff]',
        className,
      )}
    >
      <div className="mx-[auto] my-[0] max-w-[1200px] px-[40px] py-[0]">
        {children}
      </div>
    </div>
  )
}
