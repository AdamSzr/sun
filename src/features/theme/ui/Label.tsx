import React from 'react'
import composeClassName from "@/utils/composeClassName"

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  className?: string
};

export default function Label({ className, ...props }: LabelProps) {
  return (
    <label
      {...props}
      className={composeClassName(`text-sm font-medium text-black`, className)}
    />
  )
}
