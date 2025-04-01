import { cns } from 'utils/classnames'

export const Row = ({
  className,
  children,
}: React.PropsWithChildren & { className?: string }) => (
  <div className={cns('flex w-full flex-row', className)}>{children}</div>
)

export const Column = ({
  className,
  children,
}: React.PropsWithChildren & { className?: string }) => (
  <div
    className={cns(
      'flex h-full w-1/6 flex-col p-[1.4vw] text-left text-[1vw] leading-[1.6] [&>p]:[font-size:1vw]',
      className,
    )}
  >
    {children}
  </div>
)

export const Title = ({
  className,
  children,
}: React.PropsWithChildren & { className?: string }) => (
  <h6
    className={cns(
      'mb-[0.5vw] inline-block text-[5vw] leading-none font-medium',
      className,
    )}
  >
    {children}
  </h6>
)

export const Strong = ({
  className,
  children,
}: React.PropsWithChildren & { className?: string }) => (
  <strong className={cns('mb-[0.5vw] text-[1.4vw]', className)}>
    {children}
  </strong>
)
