"use client"

import { ReactNode } from "react"
import { usePathname } from "next/navigation"

export type NavItem = { label: string; href: string }

export type SideNavProps = {
  logo?: ReactNode
  logoutBtn?: ReactNode
  items: NavItem[]
  className?: string
}

export default function SideNav({ logo, items, logoutBtn }: SideNavProps) {
  const pathname = usePathname()

  return (
    <header
      className="
        fixed top-0 inset-x-0 z-50
        flex items-center justify-between
        px-5 h-14
        bg-gray-900/80 backdrop-blur-md
        border-b border-white/[0.06]
        shadow-[0_1px_0_0_rgba(255,255,255,0.04)]
      "
    >
      {/* Logo */}
      <div className="flex items-center gap-3 shrink-0">
        {logo && (
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-black-600 to-black-200 shadow-md shadow-orange-900/40">
            {logo}
          </span>
        )}
      </div>

      {/* Nav links */}
      <nav className="flex items-center gap-1">
        {items.map(({ href, label }) => {
          const isActive = pathname === href || pathname.startsWith(href + `/`)
          return (
            <a
              key={label}
              href={href}
              className={`
                relative px-4 py-2 rounded-lg text-sm font-medium
                transition-all duration-200
                ${isActive
                  ? `text-white bg-white/10`
                  : `text-gray-400 hover:text-gray-100 hover:bg-white/[0.06]`
                }
              `}
            >
              {label}
              {isActive && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-orange-400" />
              )}
            </a>
          )
        })}
      </nav>

      {/* Right side: logout */}
      <div className="flex items-center shrink-0">
        <div className="[&_button]:px-3 [&_button]:py-1.5 [&_button]:rounded-lg [&_button]:text-sm [&_button]:font-medium [&_button]:text-gray-400 [&_button]:hover:text-gray-100 [&_button]:hover:bg-white/[0.06] [&_button]:transition-all [&_button]:duration-200 [&_button]:cursor-pointer">
          {logoutBtn}
        </div>
      </div>
    </header>
  )
}
