import { twMerge } from "tailwind-merge"

export default function composeClassName( ...classes:(string | false | null | undefined)[] ) {
  return twMerge(
    classes
      .filter( (it): it is string => typeof it === `string` )
      .join( ` ` ),
  )
}
