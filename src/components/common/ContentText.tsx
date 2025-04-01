import { cns } from 'utils/classnames'

type Props = React.PropsWithChildren & {
  className?: string
}

export const ContentText = ({ children, className }: Props) => {
  return (
    <div className={cns('text-[20px] leading-[1.8] font-medium', className)}>
      {children}
    </div>
  )
}
