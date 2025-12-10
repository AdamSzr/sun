import { ReactNode } from "react"
import { Flex, Link } from "@fet/theme/ui"
import composeClassName from "@/utils/composeClassName"

export type NavItem = { label: string, href: string }

export type SideNavProps = {
  logo?: ReactNode
  logoutBtn?: ReactNode
  items: NavItem[]
  className?: string
}

export default function SideNav({ logo, items, className, logoutBtn }:SideNavProps) {
  return (
    <Flex className={composeClassName( `flex-wrap`, !logo ? `justify-end` : `justify-between`, className )}>
      {logo}

      <ul className="flex gap-5">
        {
          items.map( ({ href, label }) => (
            <li key={label}>
              <Link className="px-3 py-2 rounded-md text-gray-200 hover:text-white hover:bg-gray-600 transition-colors duration-200" href={href}>{label}</Link>
            </li>
          ) )
        }
        <li>
          {logoutBtn}
        </li>
      </ul>
    </Flex>
  )
}
