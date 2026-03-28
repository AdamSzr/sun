"use client"

import { ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export type NavItem = { label: string; href: string }

export type SideNavProps = {
  logo?: ReactNode
  logoutBtn?: ReactNode
  className?: string
  username?: string
}

export default function SideNav({ logo, logoutBtn, username }: SideNavProps) {
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
          <Link href="/" className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-black-600 to-black-200 shadow-md shadow-orange-900/40 transition-transform hover:scale-105 active:scale-95">
            {logo}
          </Link>
        )}
      </div>

      {/* Right side: username and logout */}
      <div className="flex items-center gap-4 shrink-0">
        {username && (
          <span className="text-sm font-medium text-gray-300">
            {username}
          </span>
        )}
        <div className="[&_button]:px-3 [&_button]:py-1.5 [&_button]:rounded-lg [&_button]:text-sm [&_button]:font-medium [&_button]:text-gray-400 [&_button]:hover:text-gray-100 [&_button]:hover:bg-white/[0.06] [&_button]:transition-all [&_button]:duration-200 [&_button]:cursor-pointer">
          {logoutBtn}
        </div>
      </div>
    </header>
  )
}
