import { redirect } from "next/navigation"
import Image from "next/image"
import { headers } from 'next/headers'
import { NavItem, SideNav } from "@fet/components"
import { authUser } from "@fet/auth"
import LogoutButton from "./LogoutButton"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: `Sun`,
  description: `Personal dashboard`,
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const headersList = await headers()
  const currentPath = headersList.get(`x-invoke-path`)

  const authResult = await authUser()
  if (!authResult) redirect(`/login?redirectUrl=${currentPath}`)
  const { user } = authResult

  return (
    <>
      <SideNav
        logo={<Image alt="Sun" width={16} height={16} src="/logo.svg" />}
        logoutBtn={<LogoutButton />}
        username={user.name}
        isGod={user.role?.name === 'GOD'}
      />
      <div className="pt-14">
        {children}
      </div>
    </>
  )
}
