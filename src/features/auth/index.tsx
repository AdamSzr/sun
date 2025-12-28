
import { cookies } from "next/headers"
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies"
import { Session } from "@prisma/client"
import { AUTH_COOKIE_KEY, sessionManager } from "@fet/services/SessionManager"
import { ApiErrorResponse } from "@fet/responses"

type AuthContext = { cookieStore: ReadonlyRequestCookies, session: Session };

export default async function auth() {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get( AUTH_COOKIE_KEY )?.value

  if (!sessionId) {
    console.log( `missing cookie`, sessionId )
    return null
  }
  const session = await sessionManager.getSession( sessionId )

  if (!session) {
    console.log( `Session is not in db` )
    return null
  }

  return { session, cookieStore }
}

type LetFunction = (context:AuthContext) => Response | Promise<Response>;

export async function withAuth( perform:LetFunction | Promise<LetFunction> ) {
  const authResult = await auth()

  if (!authResult) return ApiErrorResponse( 401 )

  if (typeof perform === `function`)
    return perform( authResult )
  else
    return perform.then( v => v( authResult ) )
}

