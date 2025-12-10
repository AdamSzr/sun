import composeClassName from "@/utils/composeClassName"

type LabelProps = {
  htmlFor?: string
  children?: string
  className?: string
};

export default function Label({ className, ...props }:LabelProps) {
  return (
    <label {...props} className={composeClassName( `text-sm font-medium text-black`, className )} />
  )
}
