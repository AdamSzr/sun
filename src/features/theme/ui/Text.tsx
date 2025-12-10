import { ReactNode } from "react"
import composeClassName from "@/utils/composeClassName"

export const textStyles:Record<`h1` | `h2` | `h3` | `h4` | `h5` | `h6` | `p` | `span` | `strong`,  string> = {
  h1: `text-4xl font-bold leading-tight`,
  h2: `text-3xl font-semibold leading-snug`,
  h3: `text-2xl font-semibold leading-snug`,
  h4: `text-xl font-medium leading-normal`,
  h5: `text-lg font-medium leading-normal`,
  h6: `text-base font-medium leading-normal`,
  p: `text-base leading-relaxed`,
  span: `text-base`,
  strong: `font-semibold`,
}

type TextProps = {
  children?: ReactNode
  as: `h1` | `h2` | `h3` | `h4` | `h5` | `h6` | `p` | `span` | `strong`
  className?: string
}

export default function Text({ as:As = `p`, children, className }:TextProps) {
  return (
    <As className={composeClassName( textStyles[ As ], className )}>
      {children}
    </As>
  )
}
