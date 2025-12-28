
'use server'

import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { User } from "@prisma/client"
import { registerPayloadValidator } from "@fet/validators/login"
import { userManager } from "@fet/services/UserManager"
import { AUTH_COOKIE_KEY, SESSION_TTL_SECONDS, sessionManager } from "@fet/services/SessionManager"
import { ApiErrorResponse, getErrorObject, getSuccessObject, ValidationResponse } from "@fet/responses"


type UserLoginRequest = Pick<User, `name` | `password`>;
export type LoginResponse = {
  success: boolean | null
  message?: string
  code?: number
};

export async function login( prev:LoginResponse, formData:FormData ): Promise<LoginResponse> {
  const name = formData.get( `name` ) as string
  const password = formData.get( `password` ) as string
  const payload:UserLoginRequest = { name, password }
  const validation = registerPayloadValidator.safeParse( payload )

  if (validation.success === false) {
    return getErrorObject( 400 )
  }
  const loginData = validation.data

  const user = await userManager.findUser( loginData.name, loginData.password )

  if (!user) return getErrorObject( 0 )

  let session = await sessionManager.getSessionByUserId( user.id )

  if (!session)
    session = await sessionManager.createSession( user.id, { user } )

  const c = await cookies()
  c.set({
    name: AUTH_COOKIE_KEY,
    value: session.id,
    httpOnly: true,
    path: `/`,
    secure: false, // TODO: Remember to set 'secure:true'
    maxAge: SESSION_TTL_SECONDS,
  })


  redirect( formData.get( `redirectUrl` ) as string || `/` )
}
