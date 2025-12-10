import composeClassName from "@/utils/composeClassName";

type HintProps = {
  variant: 'error'| 'success'
  children?: React.ReactNode
  className?: string
};

export default function Hint({className,variant,children}: HintProps) {
  const errorStyles = `text-center text-sm bg-red-300 p-2 rounded-sm`;
  const successStyles = `text-center text-sm bg-green-300 p-2 rounded-sm`;

  const cn = variant=='error' ? errorStyles : successStyles;
  const composedCn = composeClassName(cn, className);

  return <p className={composedCn}>{children}</p>;
}
