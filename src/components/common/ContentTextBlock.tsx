import { cns } from 'utils/classnames'
import { ContentText } from './ContentText'

type Props = React.PropsWithChildren & {
  className?: string
}

export const ContentTextBlock = ({ children, className }: Props) => {
  return (
    <ContentText className={cns('relative max-w-[960px]', className)}>
      {children}
    </ContentText>
  )
}
