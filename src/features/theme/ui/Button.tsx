import React, { ReactNode } from 'react'
import composeClassName from '@/utils/composeClassName'

type ButtonProps = {
  children?: ReactNode
  type?:  `submit` | `reset` | `button`
  disabled?: boolean
  className?: string
};

export default function Button({ className, ...props }:ButtonProps) {
  return (
    <button
      {...props}
      className={composeClassName( `m-2 p-2 rounded-xl bg-black text-white font-medium hover:bg-gray-800 transition disabled:opacity-50`, className )}
    />
  )
}
