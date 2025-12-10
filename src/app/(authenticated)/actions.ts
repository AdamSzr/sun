// actions/logout.ts
'use server'

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { AUTH_COOKIE_KEY, sessionManager } from '@/services/SessionManager'

export async function logout() {
  const c = await cookies()
  const session = c.get( AUTH_COOKIE_KEY )

  // usuwamy sesję w bazie
  if (session) await sessionManager.deleteSession( session.value )

  // czyścimy cookie
  c.set({
    name: AUTH_COOKIE_KEY,
    value: ``,
    httpOnly: true,
    path: `/`,
    secure: true,
    maxAge: 0,
  })


  // przekieruj na stronę logowania
  redirect( `/login` )
}
