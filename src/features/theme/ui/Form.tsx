import { ReactNode } from "react"
import composeClassName from "@/utils/composeClassName"

type FormProps =  {
  action?: string | ((formData:FormData) => void | Promise<void>)
  children?: ReactNode
  className?: string
  variant?: `clean`
};

export default function Form({ className, variant, ...props }:FormProps) {
  const cn = variant === `clean`
    ? composeClassName( ``, className )
    : composeClassName( `w-full max-w-sm mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md flex flex-col gap-4`, className )

  return (
    <form
      {...props}
      className={cn}
    />
  )
}
