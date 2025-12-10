import { HTMLInputTypeAttribute } from "react"
import composeClassName from "@/utils/composeClassName"

type InputProps = {
  id?: string
  type?: HTMLInputTypeAttribute
  name?: string
  className?: string
  value?: string
};

export default function Input({ className, ...props }:InputProps) {
  return (
    <input
      {...props}
      className={composeClassName( `px-3 py-2 rounded-xl border border-gray-300 focus:ring focus:outline-none text-black`, className )}
    />
  )
}
