import composeClassName from "@/utils/composeClassName"

export type LinkProps = { href: string, children?: string, className?: string };

export default function Link({ children, href, className }:LinkProps) {
  return (
    <a href={href} className={composeClassName( `text-orange-300 hover:text-orange-600`, className )}>
      {children}
    </a>
  )
}
