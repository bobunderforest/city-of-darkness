import { cns } from 'utils/classnames'

type Props = React.PropsWithChildren & {
  className?: string
}

export const ContentTitle = ({ children, className }: Props) => {
  return (
    <div className={cns('mb-[20px] text-[60px] font-extrabold', className)}>
      {children}
    </div>
  )
}
