import { cns } from 'utils/classnames'

export const ArchitectureSchemas = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="-mx-[10px] mt-[40px] mb-[60px] flex flex-wrap">
      {children}
    </div>
  )
}

export const ArchitectureSchemaItem = ({
  image,
  classNameImage,
  classNameImageWrap,
  children,
}: React.PropsWithChildren & {
  image: string
  classNameImage?: string
  classNameImageWrap?: string
}) => {
  return (
    <div className="w-1/3 p-[10px] leading-[2]">
      <div
        className={cns(
          'flex h-[320px] items-center justify-center',
          classNameImageWrap,
        )}
      >
        <img
          src={image}
          alt=""
          className={cns('relative block w-full', classNameImage)}
        />
      </div>
      <div>{children}</div>
    </div>
  )
}
