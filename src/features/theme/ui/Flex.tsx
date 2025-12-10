import { ReactNode } from "react"
import composeClassName from "@/utils/composeClassName"

export type FlexProps = {
  children?: ReactNode
  className?: string
};

export default function Flex({ children, className }:FlexProps) {
  return (
    <div className={composeClassName( `flex gap-2`, className )}>
      {children}
    </div>
  )
}
