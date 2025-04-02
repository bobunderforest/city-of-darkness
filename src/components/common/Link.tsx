type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  isExternal?: boolean
  elRef?: React.RefObject<HTMLAnchorElement>
}

export const Link = ({ isExternal, elRef, href, ...props }: Props) => {
  if (isExternal) {
    return (
      <a
        ref={elRef}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      />
    )
  }
  return <a href={href} ref={elRef} {...props} />
}
