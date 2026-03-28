import { HTMLAttributes, ReactNode } from "react"
import composeClassName from "@/utils/composeClassName"

export type FlexProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode
  className?: string
};

export default function Flex({ children, className, ...props }:FlexProps) {
  return (
    <div {...props} className={composeClassName( `flex gap-2`, className )}>
      {children}
    </div>
  )
}
