import { redirect } from "next/navigation"
import Image from "next/image"
import { headers } from 'next/headers'
import { NavItem, SideNav } from "@fet/components"
import auth from "@fet/auth"
import LogoutButton from "./LogoutButton"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: `Sun`,
  description: `Personal dashboard`,
}

const navItems: NavItem[] = [
  { label: `Dysk`, href: `/drive` },
  { label: `Mapa`, href: `/map` },
]

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const headersList = await headers()
  const currentPath = headersList.get(`x-invoke-path`)

  const isAuth = await auth()
  if (!isAuth) redirect(`/login?redirectUrl=${currentPath}`)

  return (
    <>
      <SideNav
        items={navItems}
        logo={<Image alt="Sun" width={16} height={16} src="logo.svg" />}
        logoutBtn={<LogoutButton />}
      />
      <div className="pt-14">
        {children}
      </div>
    </>
  )
}
